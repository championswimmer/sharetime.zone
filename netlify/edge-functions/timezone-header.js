export default async (request, context) => {
  await request.headers.set('x-user-timezone', context.geo.timezone)
}
