import { OrderDetailProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'
import { useState } from 'react'
import { stages } from './constants'
import OrderSummary from './pages/summary/OrderSummary'
import OrderConfirmation from './pages/confirmation/OrderConfirmation'

function App() {
  const [stage, setStage] = useState(stages.orderEntry)
  const [orderNumber, setOrderNumber] = useState(null)

  const updateStage = (stage) => setStage(stage)

  const submitOrder = (data) => {
    setOrderNumber(data.orderNumber)
    updateStage(stages.orderConfirmation)
  }

  const stageComponent =
    stage === stages.orderSummary ? (
      <OrderSummary submitOrder={submitOrder} />
    ) : stage === stages.orderConfirmation ? (
      <OrderConfirmation orderNumber={orderNumber} updateStage={updateStage} />
    ) : (
      <OrderEntry updateStage={updateStage} />
    )

  return <OrderDetailProvider>{stageComponent}</OrderDetailProvider>
}

export default App
