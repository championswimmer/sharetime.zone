import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import tzabbrmap from 'tzabbrmap'
import { ROUTES } from './routes'

export type TimeZone = {
  value: string,
  text: string,
  utc: string[],
}

const timezones = tzabbrmap as Record<string, TimeZone[]>

export function useTimezone () {
  const route = useRoute()
  const displayTZ = ref('Asia/Kolkata')
  const displayTZAbbr = ref('IST')
  const possibleTZs = ref<TimeZone[]>([])

  const showAmbiguous = ref(false)
  const showTZError = ref(false)
  const showTime = computed(() => !(showAmbiguous.value || showTZError.value))

  if (route.name === ROUTES.ABBR_NOW || route.name === ROUTES.ABBR_TIME) {
    const result = getDisplayTZ(route.params.tz as string)
    if (typeof result === 'string') {
      displayTZ.value = result
      displayTZAbbr.value = route.params.tz as string
    }
    if (result === null) {
      showTZError.value = true
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
      showTZError.value = true
      displayTZAbbr.value = 'NA'
    } else {
      displayTZAbbr.value = validTZ
    }
  }

  return {
    displayTZ,
    displayTZAbbr,
    showAmbiguous,
    showTZError,
    showTime,
    possibleTZs
  }
}

export function getDisplayTZ (tzAbbr: string): string | TimeZone[] | null {
  const possibleTZs = timezones[tzAbbr]
  if (possibleTZs === undefined) {
    return null
  } else if (possibleTZs.length === 1) {
    return possibleTZs[0].utc[0]
  } else {
    return possibleTZs
  }
}

export function checkValidTZ (tz: string): string | undefined {
  try {
    const fmt = Intl.DateTimeFormat(undefined, { timeZone: tz })
    return tz
  } catch (e) {
    console.error(`Invalid timezone ${tz}`)
  }
}
