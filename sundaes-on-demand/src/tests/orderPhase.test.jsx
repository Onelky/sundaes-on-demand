import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Happy path
// Create order.
// Accept terms and submit
// Order Confirmation is shown.

test('Order phases for happy path', async () => {
  const user = userEvent.setup()

  const { unmount } = render(<App />)
  // add ice cream scoops and toppings

  const scoop = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await user.clear(scoop)
  await user.type(scoop, '1')

  const topping = await screen.findByRole('checkbox', { name: 'Hot fudge' })
  await user.click(topping)

  // find and click order button

  const orderButton = screen.getByRole('button', { name: 'Order' })
  await user.click(orderButton)

  // check that summary information is correct based on the order details

  const summaryHeader = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeader).toBeInTheDocument()

  // check summary items
  expect(screen.getByRole('heading', { name: /Scoops: \d/ })).toHaveTextContent('2')
  expect(screen.getByRole('heading', { name: /Toppings: \d/ })).toHaveTextContent('1.5')
  expect(screen.getByRole('heading', { name: /Total: \d/ })).toHaveTextContent('3.5')

  // accept terms and conditions and click confirm order button

  const termsCheckbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })
  await user.click(termsCheckbox)

  const confirmOrderButton = screen.getByRole('button', { name: 'Confirm order' })
  await user.click(confirmOrderButton)

  // confirm order number on confirmation page

  const orderNumber = await screen.findByRole('heading', {
    name: /Your order number is 100/,
  })
  expect(orderNumber).toBeInTheDocument()

  // click "new order" button and check that subtotals are reset

  const createNewOrderButton = screen.getByRole('button', { name: 'Create new order' })
  await user.click(createNewOrderButton)

  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0')

  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('0')

  const grandTotal = screen.getByRole('heading', { name: /^Grand total: \$\d/ })
  expect(grandTotal).toHaveTextContent('0')

  unmount()
})
