import React from 'react'
import useOrderDetails from '../../contexts/OrderDetails'
import { SCOOPS, TOPPINGS } from '../../constants'
import SummaryForm from './SummaryForm'

const OrderSummary = () => {
  const { totals } = useOrderDetails()
  return (
    <div>
      <h2>Total: {totals[SCOOPS] + totals[TOPPINGS]}</h2>
      <SummaryForm />
    </div>
  )
}

export default OrderSummary
