import React from 'react'
import Options from './Options'
import GrandTotal from './GrandTotal'

const OrderEntry = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Options optionType={'scoops'} />
      <Options optionType={'toppings'} />
      <GrandTotal />
    </div>
  )
}

export default OrderEntry
