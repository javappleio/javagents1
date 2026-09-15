import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

const TIME_ZONE = 'America/Mexico_City'

export const todayTool = createTool({
  id: 'get-today',
  description: "Get today's weekday and calendar date in Mexico City time.",
  inputSchema: z.object({}),
  outputSchema: z.object({
    timeZone: z.string(),
    dayOfWeek: z.string(),
    date: z.string(),
    isoDate: z.string(),
  }),
  execute: async () => {
    const now = new Date()
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).formatToParts(now)

    const isoParts = new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(now)

    const values = Object.fromEntries(
      parts
        .filter(({ type }) => type !== 'literal')
        .map(({ type, value }) => [type, value]),
    )

    const isoValues = Object.fromEntries(
      isoParts
        .filter(({ type }) => type !== 'literal')
        .map(({ type, value }) => [type, value]),
    )

    return {
      timeZone: TIME_ZONE,
      dayOfWeek: values.weekday,
      date: `${values.month} ${values.day}, ${values.year}`,
      isoDate: `${isoValues.year}-${isoValues.month}-${isoValues.day}`,
    }
  },
})
