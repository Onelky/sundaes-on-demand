import { OrderDetailProvider } from './contexts/OrderDetails'
import OrderEntry from './pages/entry/OrderEntry'

function App() {
  return (
    <OrderDetailProvider>
      <OrderEntry />
    </OrderDetailProvider>
  )
}

export default App
