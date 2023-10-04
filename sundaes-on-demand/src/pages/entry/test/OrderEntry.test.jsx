import { render, screen, waitFor } from '@testing-library/react'
import OrderEntry from '../OrderEntry'
import { server } from '../../../mocks/server.js'
import { rest } from 'msw'
import { BACKEND_BASE_URL } from '../../../mocks/handlers'

describe('OrderEntry Component', () => {
  test('handles errors for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get(BACKEND_BASE_URL + 'scoops', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Something went wrong' }))
      }),
      rest.get(BACKEND_BASE_URL + 'toppings', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Something went wrong' }))
      })
    )
    render(<OrderEntry />)

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert')
      expect(alerts).toHaveLength(2)
    })
  })
})
