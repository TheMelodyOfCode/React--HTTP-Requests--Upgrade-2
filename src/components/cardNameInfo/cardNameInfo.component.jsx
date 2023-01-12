import * as React from 'react'

import CardItem from '../cardItem/cardItem.component'
import CardItemFallback from '../cardItemFallback/cardItemFallback.component';

import { getSingleDocfromDB} from '../../utils/firebase.utils'

/** generic asyncReducer function for handling any asynchronous logic*/
function asyncReducer(state, action) {

      switch (action.type) {
        case 'pending': {
          return {status: 'pending', data: null, error: null}
        }
        case 'resolved': {
          return {status: 'resolved', data: action.data, error: null}
        }
        case 'rejected': {
          return {status: 'rejected', data: null, error: action.error}
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    }
/**
 * useSafeDispatch is memoizing the dispatch function
 * It won't call it if we have unmounted by keeping track of our mounting status with mounted ref.
 * @param {function} dispatch 
 * @returns  cleanup function that sets that mounted current value to false 
 * @returns  useCallback when mounted and forwards arguments to dispatch*/

  function useSafeDispatch(dispatch) {
/** to know if the component is mounted or unmounted */
      const mountedRef = React.useRef(false)
/**useLayoutEffect is going to be called as soon as we're mounted without waiting for the browser to paint the screen, 
 * and it will also ensure that this cleanup is called as soon as we're unmounted without waiting for anything either*/
      React.useLayoutEffect(()=>{
        mountedRef.current = true
        //cleaneup by unmount
        return () => {
          mountedRef.current = false
        }
/** empty dependency list to make sure it's only called on mount or unmount */
      }, [])
      
      return React.useCallback((...args)=>{
/** if mounted call dispatch from useReducer  */
        if (mountedRef.current) {
          dispatch(...args)
        }
      }, [dispatch])
    }

  function useAsync(initialState) {

      const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
      })


    const dispatch = useSafeDispatch(unsafeDispatch)

    const run = React.useCallback(promise => {

      dispatch({type: 'pending'})
      
      promise.then(
        data => {
          dispatch({type: 'resolved', data})
        },
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    }, [dispatch])
      return {...state, run}
  }
  

  const CardNameInfo = ({cardName}) => {

    const {data: cardItem, status, error, run} = useAsync({
      status: cardName ? 'pending' : 'idle',
    }) 
    React.useEffect(()=>{
      if (!cardName) {
        return
      }
      return run(getSingleDocfromDB(cardName))
    }, [cardName, run])


      switch (status) {
        case 'idle':
          return <span>Submit a cardName</span>
        case 'pending':
          return <CardItemFallback cardName={cardItem} />
        case 'rejected':
          throw error
        case 'resolved':
          return <CardItem cardItem={cardItem} />
        default:
          throw new Error('This should be impossible')
      }
    }

    export default CardNameInfo;