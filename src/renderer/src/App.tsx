import { useEffect, useState } from 'react'
import EntryForm from './components/EntryForm'
import EntryTable from './components/EntryTable'
import type { Entry, NewEntry } from '../../shared/types'

function App(): React.JSX.Element {
  const [entries, setEntries] = useState<Entry[]>([])
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null)

  async function refresh(): Promise<void> {
    setEntries(await window.api.listEntries())
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial load on mount
    refresh()
  }, [])

  async function handleSubmit(entry: NewEntry): Promise<void> {
    if (editingEntry) {
      await window.api.updateEntry({ ...entry, id: editingEntry.id })
      setEditingEntry(null)
    } else {
      await window.api.addEntry(entry)
    }
    await refresh()
  }

  async function handleDelete(id: number): Promise<void> {
    await window.api.deleteEntry(id)
    if (editingEntry?.id === id) setEditingEntry(null)
    await refresh()
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Job Applications Tracker</h1>

      <EntryForm
        editingEntry={editingEntry}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingEntry(null)}
      />

      <EntryTable entries={entries} onEdit={setEditingEntry} onDelete={handleDelete} />
    </div>
  )
}

export default App
