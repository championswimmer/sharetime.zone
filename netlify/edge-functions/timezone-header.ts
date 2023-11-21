import { Context } from 'https://edge.netlify.com'

export default async (request: Request, context: Context) => {
  request.headers.set('x-user-timezone', context.geo.timezone ?? '')
  return await context.next()
}
