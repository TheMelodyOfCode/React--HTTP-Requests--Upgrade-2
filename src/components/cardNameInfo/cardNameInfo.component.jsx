import * as React from 'react'

import CardItem from '../cardItem/cardItem.component'
import CardItemFallback from '../cardItemFallback/cardItemFallback.component';

import { getSingleDocfromDB} from '../../utils/firebase.utils'

/** generic useAsync hook for handling any asynchronous logic for our app */
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

  function useAsync(initialState) {

      const [state, dispatch] = React.useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
      })

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
    }, [])
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