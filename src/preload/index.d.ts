import { ElectronAPI } from '@electron-toolkit/preload'
import type { Entry, NewEntry } from '../shared/types'

interface Api {
  addEntry: (entry: NewEntry) => Promise<Entry>
  listEntries: () => Promise<Entry[]>
  updateEntry: (entry: Entry) => Promise<void>
  deleteEntry: (id: number) => Promise<void>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
