// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    const { email, password } = req.body;
    const isValid = email === 'cecilia@gmail.com' && password === '123456';

    if (isValid) {
      return res(
        ctx.delay(1500),
        ctx.status(200),
        ctx.json({
          id: 'abc123',
          email: 'cecilia@gmail.com',
          firstName: 'Cecília',
          lastName: 'Fonseca',
          avatar: ''
        }),
      )
    }

    return res(
      ctx.delay(1500),
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    )
  }),
]