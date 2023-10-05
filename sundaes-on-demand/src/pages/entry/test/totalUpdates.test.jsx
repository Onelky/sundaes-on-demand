import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { render, screen } from '../../../test/testingLibraryUtils'

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

    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' })
    await user.click(hotFudgeCheckbox)

    expect(toppingsSubtotal).toHaveTextContent('3')

    // Remove Hot Fudge topping and check that subtotal is reduced
    await user.click(hotFudgeCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.5')
  })
})
