import React, { useReducer, createContext } from 'react'
import { reducer } from './reducer'
import { initialState } from './state'


export const Context = createContext()


const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default Store;