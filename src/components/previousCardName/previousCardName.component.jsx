import * as React from 'react'

import { CardNameCacheContext } from '../../context/cardNameCache.context'


function useCardNameCache(){
    const context = React.useContext(CardNameCacheContext)
    if(!context) {
      throw new Error('useCardNameCache must be used in a CardNameCacheContext')
    }
    return context
  }

const  PreviousCardName = ({ onSelect, cardName}) => {

    const [cache, dispatch] = useCardNameCache()

    // console.log(cache)
    React.useEffect(() => {
      if (Object.keys(cardName).length === 0) {
        return
      } else  {
        dispatch({type: 'ADD_CardName', cardName})
      }
    }, [dispatch, cardName,])

        return (

          <section className="previousCard">
                <div>
                    <h6 className="previousCard__title">Previous Selection</h6> 
                    <ul className="previousCard__uoList">
                    {
                    Object.keys(cache).map(cardName => (
                    
                        <li className="previousCard__uoList--Item" key={cardName} style={{margin: '4px auto'}}>
                            <button
                            className="previousCard__btn btn"
                            style={{width: '100%'}}
                            onClick={() => onSelect(cardName)}
                        >
                            {cardName}
                            </button>
                        </li>
                    )) }
                    </ul>
                </div>
            </section>

      )  
}

export default PreviousCardName;