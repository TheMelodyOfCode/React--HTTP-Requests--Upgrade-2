import * as React from 'react'

const CardNameCacheContext = React.createContext()

export const useCardNameCache =()=>{
  const context = React.useContext(CardNameCacheContext)
  if(!context) {
    throw new Error('useCardNameCache must be used in a CardNameCacheContext')
  }
  return context
}

const cardNameCacheReducer = (state, action) => {

  switch (action.type) {
    case 'ADD_CardName': { 
        return {...state, [action.cardName]: action.cardName} 
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const CardNameCacheProvider = (props) => {
  // with this we can share the state between components by using context
    const [cache, dispatch] = React.useReducer(cardNameCacheReducer, {})
  
    const value = [cache, dispatch]
    return <CardNameCacheContext.Provider value={value} {...props} />
  }