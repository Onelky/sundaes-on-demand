import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import { stages } from '../../constants'
import useOrderDetails from '../../contexts/OrderDetails'

const OrderConfirmation = ({ orderNumber, updateStage }) => {
  const { resetTotals } = useOrderDetails()
  const handleNewOrderClick = () => {
    resetTotals()
    updateStage(stages.orderEntry)
  }
  return (
    <div>
      <h2>Your order number is {orderNumber}</h2>
      <Button onClick={handleNewOrderClick}>Create new order</Button>
    </div>
  )
}

OrderConfirmation.propTypes = {
  orderNumber: PropTypes.number,
  updateStage: PropTypes.func.isRequired,
}
export default OrderConfirmation
