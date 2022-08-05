import { TimeZone, timezones } from '@/assets/timezones'
import { ROUTES } from '@/router'
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export function useTimezone () {
  const route = useRoute()
  const displayTZ = ref('Asia/Kolkata')
  const displayTime = ref(DateTime.fromJSDate(new Date(), { zone: 'Asia/Kolkata' }))

  const showAmbiguous = ref(false)
  const showError = ref(false)
  const showTime = computed(() => !(showAmbiguous.value || showError.value))

  if (route.name === ROUTES.ABBR_NOW || route.name === ROUTES.ABBR_TIME) {
    const result = getDisplayTZ(route.params.tz as string)
    if (typeof result === 'string') {
      displayTZ.value = result
    }
    if (result === null) {
      showError.value = true
      displayTZ.value = route.params.tz as string
    }
    if (Array.isArray(result)) {
      showAmbiguous.value = true
      displayTZ.value = route.params.tz as string
    }
  }

  if (route.name === ROUTES.IANA_NOW || route.name === ROUTES.IANA_TIME) {
    displayTZ.value = `${route.params.continent}/${route.params.city}`
  }

  return ({
    displayTZ,
    showAmbiguous,
    showError,
    showTime
  })
}

function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones.filter(tz => tz.abbr === tzAbbr)
  if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else if (possibleTZs.length === 0) {
    return null
  } else {
    return possibleTZs
  }
}
