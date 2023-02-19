export default async (request, context) => {
  await request.headers.set('X-User-Timezone', context.geo.timezone)
}
