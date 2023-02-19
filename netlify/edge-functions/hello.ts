import type { Context } from '@netlify/edge-functions'

export default async (request: Request, context: Context) => {
  return await Response.json({
    geo: context.geo,
    header: request.headers.get('x-nf-geo')
  })
}
