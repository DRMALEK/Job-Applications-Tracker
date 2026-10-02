import { DatabaseSync } from 'node:sqlite'
import { app } from 'electron'
import { join } from 'path'
import type { Entry, NewEntry } from '../shared/types'

const dbPath = join(app.getPath('userData'), 'applications.db')
const db = new DatabaseSync(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    country TEXT NOT NULL,
    count INTEGER NOT NULL,
    note TEXT NOT NULL DEFAULT ''
  )
`)

export function addEntry(entry: NewEntry): Entry {
  const stmt = db.prepare(
    'INSERT INTO entries (date, type, country, count, note) VALUES ($date, $type, $country, $count, $note)'
  )
  const result = stmt.run({
    $date: entry.date,
    $type: entry.type,
    $country: entry.country,
    $count: entry.count,
    $note: entry.note
  })
  return { id: Number(result.lastInsertRowid), ...entry }
}

export function listEntries(): Entry[] {
  return db.prepare('SELECT * FROM entries ORDER BY date DESC, id DESC').all() as unknown as Entry[]
}

export function updateEntry(entry: Entry): void {
  db.prepare(
    'UPDATE entries SET date = $date, type = $type, country = $country, count = $count, note = $note WHERE id = $id'
  ).run({
    $id: entry.id,
    $date: entry.date,
    $type: entry.type,
    $country: entry.country,
    $count: entry.count,
    $note: entry.note
  })
}

export function deleteEntry(id: number): void {
  db.prepare('DELETE FROM entries WHERE id = $id').run({ $id: id })
}
