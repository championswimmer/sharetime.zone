import { TimeZone, timezones } from '@/assets/timezones'
import { ROUTES } from '@/router'
import { DateTime } from 'luxon'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export function useTimezone () {
  const route = useRoute()
  const displayTZ = ref('Asia/Kolkata')
  const displayTZAbbr = ref('IST')
  const possibleTZs = ref<TimeZone[]>([])

  const showAmbiguous = ref(false)
  const showError = ref(false)
  const showTime = computed(() => !(showAmbiguous.value || showError.value))

  if (route.name === ROUTES.ABBR_NOW || route.name === ROUTES.ABBR_TIME) {
    const result = getDisplayTZ(route.params.tz as string)
    if (typeof result === 'string') {
      displayTZ.value = result
      displayTZAbbr.value = route.params.tz as string
    }
    if (result === null) {
      showError.value = true
      displayTZ.value = route.params.tz as string
    }
    if (Array.isArray(result)) {
      showAmbiguous.value = true
      displayTZ.value = route.params.tz as string
      possibleTZs.value = result
    }
  }

  if (route.name === ROUTES.IANA_NOW || route.name === ROUTES.IANA_TIME) {
    displayTZ.value = `${route.params.continent}/${route.params.city}`
    const validTZ = checkValidTZ(displayTZ.value)
    if (validTZ === undefined) {
      showError.value = true
      displayTZAbbr.value = 'NA'
    } else {
      displayTZAbbr.value = validTZ
    }
  }

  return {
    displayTZ,
    displayTZAbbr,
    showAmbiguous,
    showError,
    showTime,
    possibleTZs
  }
}

function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones.filter((tz) => tz.abbr === tzAbbr)
  if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else if (possibleTZs.length === 0) {
    return null
  } else {
    return possibleTZs
  }
}

function checkValidTZ (tz: string): string | undefined {
  return timezones.filter((t) => t.utc.includes(tz))[0]?.abbr
}
