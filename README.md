# Job Applications Tracker

A small Windows desktop app for logging how many job/PhD/freelance applications
you send each day, broken down by country. Built as a learning project with
Electron, React, TypeScript, and SQLite.

## Features

- Log an entry: date, type (Job / PhD / Freelance work), country, count, and an
  optional note.
- Edit or delete any past entry.
- All data is stored locally in a SQLite file — nothing leaves your machine.

## Tech stack

- [Electron](https://electronjs.org/) + [electron-vite](https://electron-vite.org/)
- React + TypeScript
- [`node:sqlite`](https://nodejs.org/api/sqlite.html) (Node's built-in SQLite module) for local storage
- Bootstrap for styling

## Development

```bash
npm install
npm run dev
```

## Build a Windows installer

```bash
npm run build:win
```

The installer (`.exe`) is written to `dist/`.
