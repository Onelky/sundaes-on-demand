import { rest } from 'msw'

const BASE_URL = 'http://localhost:3030/'
export const handlers = [
  rest.get(BASE_URL + 'toppings', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
      ])
    )
  }),
  rest.get(BASE_URL + 'scoops', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Mint chip',
          imagePath: '/images/mint-chip.png',
        },
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
      ])
    )
  }),
]
