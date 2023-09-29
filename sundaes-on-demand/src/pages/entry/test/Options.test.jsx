import { render, screen } from '@testing-library/react'
import Options from '../Options'

describe('Options Component', () => {
  test('Initial State: Total is zero', () => {
    // render(<Options />)
  })
  test('Displays image for each scoop option from the server', async () => {
    render(<Options optionType={'scoops'} />)
    const images = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(images).toHaveLength(2)

    const altTexts = images.map((image) => image.alt)
    // toEqual is used with arrays or objects
    expect(altTexts).toEqual(['Mint chip scoop', 'Vanilla scoop'])
  })
  test('Displays image for each topping option from the server', async () => {
    render(<Options optionType={'toppings'} />)
    const images = await screen.findAllByRole('img', { name: /topping$/i })
    expect(images).toHaveLength(2)

    const altTexts = images.map((image) => image.alt)
    expect(altTexts).toEqual(['M&Ms topping', 'Hot fudge topping'])
  })
  test('Option amount increases when + button is clicked', () => {
    // render(<Options />)
  })
  test('Option amount is reduced when - button is clicked', () => {
    // render(<Options />)
  })
})
