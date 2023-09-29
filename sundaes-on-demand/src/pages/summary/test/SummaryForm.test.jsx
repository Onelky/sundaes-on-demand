import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

describe('Summary Form', () => {
  test('Initial State: Checkbox Unchecked and Button Disabled', () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: 'Confirm order' })
    expect(button).toBeDisabled()

    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })
    expect(checkbox).not.toBeChecked()
  })
  test('Checkbox enables submit button when checked, and disables it when unchecked', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)

    const button = screen.getByRole('button', { name: 'Confirm order' })
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })

    await user.click(checkbox)
    expect(button).toBeEnabled()

    await user.click(checkbox)
    expect(button).toBeDisabled()
  })

  test('Popup is shown when "terms and conditions" are hovered and dissappears when unhover', async () => {
    const user = userEvent.setup()
    const popoverText = /nothing will be delivered/i
    render(<SummaryForm />)

    const termsAndConditions = screen.getByText(/terms and conditions/i)
    expect(termsAndConditions).toHaveStyle({ color: 'blue' })

    // popover is not initially shown
    expect(screen.queryByText(popoverText)).not.toBeInTheDocument()

    // popover appears on hover
    await user.hover(termsAndConditions)
    const popover = screen.getByText(popoverText)
    expect(popover).toBeInTheDocument()

    // popover disappears on mouse leave
    await user.unhover(termsAndConditions)
    expect(popover).not.toBeInTheDocument()
  })
})
