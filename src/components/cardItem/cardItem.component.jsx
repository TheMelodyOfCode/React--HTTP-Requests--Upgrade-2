
import * as React from 'react'

const CardItem = ({cardItem}  )=>{

    const { quote, name ,imageUrl, } = cardItem;

    return (
        <section className="cardItem">
            <div className="cardItem__card">
                <img className="cardItem__card__img" src={`${imageUrl} `}  alt={name} /> 
                <h5 className="cardItem__card__title">{name}</h5>
                <p className="cardItem__card__text">
                    {quote}
                </p>
            </div>
        </section>
        )
    } 

export default CardItem;