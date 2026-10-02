import type { Entry } from '../../../shared/types'

interface EntryTableProps {
  entries: Entry[]
  onEdit: (entry: Entry) => void
  onDelete: (id: number) => void
}

function EntryTable({ entries, onEdit, onDelete }: EntryTableProps): React.JSX.Element {
  if (entries.length === 0) {
    return <p className="text-muted">No entries yet. Log your first application above.</p>
  }

  return (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Country</th>
          <th>Count</th>
          <th>Note</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.date}</td>
            <td>{entry.type}</td>
            <td>{entry.country}</td>
            <td>{entry.count}</td>
            <td>{entry.note}</td>
            <td className="text-end">
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => onEdit(entry)}
              >
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(entry.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default EntryTable
