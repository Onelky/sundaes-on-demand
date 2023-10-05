import React from 'react'
import useOrderDetails from '../../contexts/OrderDetails'
import { formatCurrency } from '../../utils'

const GrandTotal = () => {
  const { totals } = useOrderDetails()
  const grandTotal = Object.values(totals).reduce((prev, acc) => prev + acc, 0)
  return (
    <div>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
    </div>
  )
}

export default GrandTotal
