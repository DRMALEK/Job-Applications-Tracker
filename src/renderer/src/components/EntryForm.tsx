import { useEffect, useState } from 'react'
import {
  APPLICATION_TYPES,
  type ApplicationType,
  type Entry,
  type NewEntry
} from '../../../shared/types'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const emptyForm: NewEntry = {
  date: todayIso(),
  type: 'Job',
  country: '',
  count: 1,
  note: ''
}

interface EntryFormProps {
  editingEntry: Entry | null
  onSubmit: (entry: NewEntry) => void
  onCancelEdit: () => void
}

function EntryForm({ editingEntry, onSubmit, onCancelEdit }: EntryFormProps): React.JSX.Element {
  const [form, setForm] = useState<NewEntry>(emptyForm)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync form with the entry being edited
    setForm(
      editingEntry
        ? {
            date: editingEntry.date,
            type: editingEntry.type,
            country: editingEntry.country,
            count: editingEntry.count,
            note: editingEntry.note
          }
        : emptyForm
    )
  }, [editingEntry])

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault()
    if (!form.country.trim() || form.count < 1) return
    onSubmit(form)
    if (!editingEntry) setForm(emptyForm)
  }

  return (
    <form className="row g-3 align-items-end mb-4" onSubmit={handleSubmit}>
      <div className="col-md-2">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className="col-md-2">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as ApplicationType })}
        >
          {APPLICATION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-3">
        <label className="form-label">Country</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Germany"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          required
        />
      </div>

      <div className="col-md-1">
        <label className="form-label">Count</label>
        <input
          type="number"
          min={1}
          className="form-control"
          value={form.count}
          onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
          required
        />
      </div>

      <div className="col-md-3">
        <label className="form-label">Note</label>
        <input
          type="text"
          className="form-control"
          placeholder="optional"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
      </div>

      <div className="col-md-1 d-flex gap-2">
        <button type="submit" className="btn btn-primary w-100">
          {editingEntry ? 'Save' : 'Add'}
        </button>
      </div>

      {editingEntry && (
        <div className="col-12">
          <button type="button" className="btn btn-link p-0" onClick={onCancelEdit}>
            Cancel edit
          </button>
        </div>
      )}
    </form>
  )
}

export default EntryForm
