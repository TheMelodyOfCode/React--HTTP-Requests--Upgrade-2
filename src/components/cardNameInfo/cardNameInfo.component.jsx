import * as React from 'react'

import CardItem from '../cardItem/cardItem.component'
import CardItemFallback from '../cardItemFallback/cardItemFallback.component';

import { getSingleDocfromDB} from '../../utils/firebase.utils'
import { useAsync } from '../../utils/helperFunctions.utils';


const CardNameInfo = ({cardName}) => {

    const {data: cardItem, status, error, run} = useAsync({
      status: cardName ? 'pending' : 'idle',
    }) 
    
// If there's no cardName, then don't call the run function
    React.useEffect(()=>{
      if (!cardName) {
        return
      }
/** if theres a CardName call the run function.The run function will handle the promise
 *  and keep our status and error and our data up-to-date based on the status of the promise
 * if the function recieved by run is no Promise-Object it won't work! */ 
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