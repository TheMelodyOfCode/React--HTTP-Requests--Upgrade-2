import * as React from 'react'

const Form = (  
    {
    cardName: externalCardName,
    initialCardName = externalCardName || '',
    onSubmit,
    }
    )=>{

    const [cardName, setCardName] = React.useState(initialCardName)

    // this is generally not a great idea. We're synchronizing state when it is
    // normally better to derive it https://kentcdodds.com/blog/dont-sync-state-derive-it
    // however, we're doing things this way to make it easier for the exercises
    // to not have to worry about the logic for this PokemonForm component.
  React.useEffect(() => {
    // note that because it's a string value, if the externalPokemonName
    // is the same as the one we're managing, this will not trigger a re-render
    if (typeof externalCardName === 'string') {
      setCardName(externalCardName)
    }
  }, [externalCardName])

  function handleChange(e) {
    setCardName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(cardName)
  }

  function handleSelect(newCardName) {
    setCardName(newCardName)
    onSubmit(newCardName)
  }

    return (
        <section  className="cardNames">
        <form onSubmit={handleSubmit} className="cardNames__form">
            <div className="cardNames__form__box">
            <input 
                type="text" 
                className="cardNames__form__box__input" 
                placeholder="type: rick" 
                name="nameByInputField" 
                value={cardName}
                onChange={handleChange}
                />
                <button className="cardNames__form__box__btn btn" type="submit" disabled={!cardName.length} >Submit</button>
            </div>
            <div className="cardNames__container">
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('rick')}
                >Rick</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('morty')}
                >Morty</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('snuggles')}
                >Snuggles</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('lucius')}
                >Lucius</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('squanchy')}
                >Squanchy</button>
                {' '}
                <button
                className="cardNames__container__btn"
                type="button"
                onClick={() => handleSelect('jerry')}
                >Jerry</button>
                {' '}
            </div>
        </form>
    </section>

    )


}

export default Form;