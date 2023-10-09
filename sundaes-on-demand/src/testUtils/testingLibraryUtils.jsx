import { OrderDetailProvider } from '../contexts/OrderDetails'
import { render } from '@testing-library/react'

// Overrides default render in order to wrap all the components inside Providers
const customRender = (ui, options) => render(ui, { wrapper: OrderDetailProvider, ...options })

export * from '@testing-library/react'

export { customRender as render }
