import tzabbrmap from 'tzabbrmap'
import type { TimeZone } from './timezones'

const timezones = tzabbrmap as Record<string, TimeZone[]>

export function useTimezoneSearch () {
  const searchQuery = ref('')
  const filteredTimezones = computed(() => {
    if (!searchQuery.value) {
      return timezones
    }

    const query = searchQuery.value.toLowerCase()
    const result: Record<string, TimeZone[]> = {}

    for (const key in timezones) {
      if (key.toLowerCase().includes(query)) {
        result[key] = timezones[key]
      } else {
        const filteredItems = timezones[key].filter(item =>
          Object.values(item).some((value) => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(query)
            } else if (Array.isArray(value)) {
              return value.some(v => v && v.toLowerCase().includes(query))
            }
            return false
          })
        )
        if (filteredItems.length) {
          result[key] = filteredItems
        }
      }
    }

    return result
  })

  return {
    searchQuery,
    filteredTimezones
  }
}
