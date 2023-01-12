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

  function useAsync(asyncCallback, initialState, dependencies) {

      const [state, dispatch] = React.useReducer(asyncReducer, {
        status: 'idle',
        data: null,
        error: null,
        ...initialState,
      })


      React.useEffect(() => {

        const promise = asyncCallback()
        if (!promise) {
          return
        }
        dispatch({type: 'pending'})
        
        promise.then(
          data => {
            dispatch({type: 'resolved', data})
          },
          error => {
            dispatch({type: 'rejected', error})
          },
        )

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, dependencies )
      return state
  }
  

  const CardNameInfo = ({cardName}) => {
  
    const state = useAsync(()=>{
      if (!cardName){
        return
      }

      return getSingleDocfromDB(cardName)

    }, { status: cardName ? 'pending' : 'idle'}, [cardName])

      const {data: cardItem, status, error} = state

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