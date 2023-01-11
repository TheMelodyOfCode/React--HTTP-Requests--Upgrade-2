import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import PreviousCardName from '../components/previousCardName/previousCardName.component'
import CardNameInfo from '../components/cardNameInfo/cardNameInfo.component';
import Form from '../form/form.component';

import { CardNameCacheProvider } from '../context/cardNameCache.context';

  const Home = ()=>{

    const [cardName, setCardName] = React.useState('')
  
    function handleSubmit(newCardName) {
      setCardName(newCardName)
    }
  
    function handleReset() {
      setCardName('')
    }

    function handleSelect(newCardName) {
      setCardName(newCardName)
    }


    function ErrorFallback({error, resetErrorBoundary,}) {
      return (
          <section  className="cardItemError">
              <div role="alert" className="cardItemError__card">
                  <img className="cardItemError__card__img" src='img/sadError.png'  alt='error' />
                  <h1 className="cardItemError__card__title">There was an error: {''}</h1>
                  <p className="cardItemError__card__text">
                      {error.message}
                  </p> 
                  <button className="cardItemError__errorBtn" onClick={resetErrorBoundary}>Try again</button> 
              </div>
          </section>
      )
  }

    
  
    return (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[cardName]}>
          <Form cardName={cardName} onSubmit={handleSubmit} />
              <CardNameInfo cardName={cardName} />
            <CardNameCacheProvider>
                <PreviousCardName onSelect={handleSelect} cardName={cardName}  />
            </CardNameCacheProvider>
          </ErrorBoundary>
        </>
    )
  }

  export default Home;

