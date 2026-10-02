export const APPLICATION_TYPES = ['Job', 'PhD', 'Freelance work'] as const

export type ApplicationType = (typeof APPLICATION_TYPES)[number]

export interface Entry {
  id: number
  date: string // ISO date string, e.g. "2026-10-03"
  type: ApplicationType
  country: string
  count: number
  note: string
}

export type NewEntry = Omit<Entry, 'id'>
