import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { Entry, NewEntry } from '../shared/types'

// Custom APIs for renderer
const api = {
  addEntry: (entry: NewEntry): Promise<Entry> => ipcRenderer.invoke('entries:add', entry),
  listEntries: (): Promise<Entry[]> => ipcRenderer.invoke('entries:list'),
  updateEntry: (entry: Entry): Promise<void> => ipcRenderer.invoke('entries:update', entry),
  deleteEntry: (id: number): Promise<void> => ipcRenderer.invoke('entries:delete', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
