import * as React from 'react'

import CardItem from '../cardItem/cardItem.component'
import CardItemFallback from '../cardItemFallback/cardItemFallback.component';

import { getSingleDocfromDB} from '../../utils/firebase.utils'

function cardNameInfoReducer(state, action) {
    // console.log(action)
    // console.log(action.cardItem)
      switch (action.type) {
        case 'pending': {
          return {status: 'pending', data: null, error: null}
        }
        case 'resolved': {
          return {status: 'resolved', data: action.cardItem, error: null}
        }
        case 'rejected': {
          return {status: 'rejected', data: null, error: action.error}
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    }
  
  const CardNameInfo = ({cardName}) => {
  
      const [state, dispatch] = React.useReducer(cardNameInfoReducer, {
        status: cardName ? 'pending' : 'idle',
        data: null,
        error: null,
      })
      // console.log(state)
      React.useEffect(() => {
  
        if (!cardName) {
          return
        }
        dispatch({type: 'pending'})
        
        const getCardByInput = async ()=> {
          if (typeof cardName === 'string') {
              const cardItem = await getSingleDocfromDB(cardName)
              if (cardItem.error === 'error') {
                  dispatch({type: 'rejected', error})   
              } else {
                  dispatch({type: 'resolved', cardItem})
              }
  
            }
      };
      getCardByInput()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cardName, ])
      // --------------------------- end ---------------------------
  
      const {data, status, error} = state
  
      switch (status) {
        case 'idle':
          return <span>Submit a cardName</span>
        case 'pending':
          return <CardItemFallback cardName={cardName} />
        case 'rejected':
          throw error
        case 'resolved':
          return <CardItem cardItem={data} />
        default:
          throw new Error('This should be impossible')
      }
    }

    export default CardNameInfo;