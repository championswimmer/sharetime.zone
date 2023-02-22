
import { Context } from 'https://edge.netlify.com'

export default async (request: Request, context: Context) => {
  await request.headers.set('x-user-timezone', context.geo.timezone ?? '')
}
