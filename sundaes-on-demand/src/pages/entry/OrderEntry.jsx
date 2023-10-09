import React from 'react'
import Options from './Options'
import GrandTotal from './GrandTotal'
import Button from 'react-bootstrap/Button'
import { stages } from '../../constants'
import PropTypes from 'prop-types'

const OrderEntry = ({ updateStage }) => {
  const handleOrderClick = () => updateStage(stages.orderSummary)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      <GrandTotal />
      <Button onClick={handleOrderClick}>Order</Button>
    </div>
  )
}

OrderEntry.propTypes = {
  updateStage: PropTypes.func,
}
export default OrderEntry
