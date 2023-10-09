import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { render, screen, waitFor } from '../../../test/testingLibraryUtils'
import OrderEntry from '../OrderEntry'

describe('Subtotal Functionality', () => {
  test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup()
    render(<Options optionType={'scoops'} />)
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent('0')

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2')

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Mint chip' })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6')
  })

  test('update toppings subtotal when topping is selected or deselected', async () => {
    const user = userEvent.setup()
    render(<Options optionType={'toppings'} />)
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingsSubtotal).toHaveTextContent('0')

    const mCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' })
    await user.click(mCheckbox)

    const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' })
    await user.click(hotFudgeCheckbox)

    expect(toppingsSubtotal).toHaveTextContent('3')

    // Remove Hot Fudge and check subtotal
    await user.click(hotFudgeCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.5')
  })
})

describe('grand total', () => {
  const totalName = /^Grand total: \$\d/

  test('grand total starts at 0', async () => {
    render(<OrderEntry />)
    // checks initial value is 0
    const grandTotal = screen.getByRole('heading', { name: totalName })

    await waitFor(async () => {
      expect(grandTotal).toHaveTextContent('0')
    })
  })

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup()
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /^Grand total: \$\d/ })

    await waitFor(async () => {
      // Add scoop
      const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
      await user.clear(vanillaInput)
      await user.type(vanillaInput, '1')

      // Add topping
      const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' })
      await user.click(hotFudgeCheckbox)

      // check grand total is correct
      expect(grandTotal).toHaveTextContent('3.5')
    })
  })
  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup()
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /^Grand total: \$\d/ })

    await waitFor(async () => {
      // Add topping
      const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' })
      await user.click(hotFudgeCheckbox)

      // Add scoop
      const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
      await user.clear(vanillaInput)
      await user.type(vanillaInput, '1')

      // check grand total is correct
      expect(grandTotal).toHaveTextContent('3.5')
    })
  })
  test('grand total is updated when an item is removed', async () => {
    const user = userEvent.setup()
    render(<OrderEntry />)
    const grandTotal = screen.getByRole('heading', { name: /^Grand total: \$\d/ })

    await waitFor(async () => {
      const hotFudgeCheckbox = screen.getByRole('checkbox', { name: 'Hot fudge' })
      const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
      await user.click(hotFudgeCheckbox)
      await user.clear(vanillaInput)
      await user.type(vanillaInput, '1')

      // Remove Hot Fudge and check grand total
      await user.click(hotFudgeCheckbox)
      expect(grandTotal).toHaveTextContent('2')
    })
  })
})
