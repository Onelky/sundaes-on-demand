import React from 'react'
import useOrderDetails from '../../contexts/OrderDetails'
import { SCOOPS, TOPPINGS } from '../../constants'
import SummaryForm from './SummaryForm'
import axios from 'axios'
import { BACKEND_BASE_URL } from '../../mocks/handlers'
import PropTypes from 'prop-types'

const OrderSummary = ({ submitOrder }) => {
  const { totals } = useOrderDetails()

  const onConfirmClick = async () => {
    axios.post(BACKEND_BASE_URL + 'order').then(({ data }) => submitOrder(data))
  }
  return (
    <div>
      <h1>Order Summary</h1>
      <h3>Scoops: {totals[SCOOPS]}</h3>
      <h3>Toppings: {totals[TOPPINGS]}</h3>
      <h2>Total: {totals[SCOOPS] + totals[TOPPINGS]}</h2>
      <SummaryForm onConfirmClick={onConfirmClick} />
    </div>
  )
}

OrderSummary.propTypes = {
  submitOrder: PropTypes.func,
}

export default OrderSummary
