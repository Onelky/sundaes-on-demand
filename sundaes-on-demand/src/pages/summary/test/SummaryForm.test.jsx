import { render, screen, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

describe('Summary Form', () => {
  test('Initial State: Checkbox Unchecked and Button Disabled', () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: 'Confirm order' })
    expect(button).toBeDisabled()

    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })
    expect(checkbox).not.toBeChecked()
  })
  test('Checkbox enables submit button when checked, and disables it when unchecked', () => {
    render(<SummaryForm />)
    const button = screen.getByRole('button', { name: 'Confirm order' })
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' })

    fireEvent.click(checkbox)
    expect(button).toBeEnabled()

    fireEvent.click(checkbox)
    expect(button).toBeDisabled()
  })
})
