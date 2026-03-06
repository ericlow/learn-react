import 'dotenv/config'
import { pool } from './client'
import { readFileSync } from 'fs'
import { join } from 'path'

async function reset() {
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8').trim()
  const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8').trim()

  if (schema && !schema.startsWith('--')) {
    await pool.query(schema)
    console.log('Schema applied.')
  } else {
    console.log('No schema to apply (file is empty or comment-only).')
  }

  if (seed && !seed.startsWith('--')) {
    await pool.query(seed)
    console.log('Seed data applied.')
  } else {
    console.log('No seed data to apply (file is empty or comment-only).')
  }

  console.log('Database reset complete.')
  await pool.end()
}

reset().catch((err) => {
  console.error('Reset failed:', err)
  process.exit(1)
})
