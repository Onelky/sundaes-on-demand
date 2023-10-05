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

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateInput)
    await user.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')
  })
})
