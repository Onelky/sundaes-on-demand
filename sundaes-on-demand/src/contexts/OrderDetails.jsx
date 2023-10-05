import React, { createContext, useContext, useState } from 'react'
import { pricePerItem } from '../constants'

const OrderDetailsContext = createContext({})

const useOrderDetails = () => {
  const orderDetailContext = useContext(OrderDetailsContext)
  if (!orderDetailContext) throw new Error('Wrong!')
  return orderDetailContext
}

export const OrderDetailProvider = (props) => {
  const [optionsCount, setOptionsCount] = useState({ scoops: {}, toppings: {} })

  const calculateTotal = (optionType) => {
    const values = Object.values(optionsCount[optionType])
    return values.reduce((prev, current) => prev + current, 0) * pricePerItem[optionType]
  }
  const updateItemCount = (itemName, newValue, optionType) => {
    setOptionsCount({
      ...optionsCount,
      [optionType]: { ...optionsCount[optionType], [itemName]: newValue },
    })
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('toppings'),
  }

  return (
    <OrderDetailsContext.Provider
      value={{ optionsCount, totals, updateItemCount, calculateTotal }}
      {...props}
    />
  )
}

export default useOrderDetails
