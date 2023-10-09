import { OrderDetailProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'
import { useState } from 'react'
import { stages } from './constants'
import OrderSummary from './pages/summary/OrderSummary'

function App() {
  const [stage, setStage] = useState(stages.orderEntry)
  const [orderNumber, setOrderNumber] = useState(null)

  const updateStage = (stage) => {
    setStage(stage)
  }

  const submitOrder = (data) => {
    setOrderNumber(data.orderNumber)
    setStage(stages.orderConfirmation)
  }

  const stageComponent =
    stage === stages.orderSummary ? (
      <OrderSummary submitOrder={submitOrder} />
    ) : stages.orderConfirmation ? (
      <p>Order confirmation</p>
    ) : (
      <OrderEntry updateStage={updateStage} />
    )

  return <OrderDetailProvider>{stageComponent}</OrderDetailProvider>
}

export default App
