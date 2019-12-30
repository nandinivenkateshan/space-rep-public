
const pool = require('../dbLog')

async function getDeckNames (sid) {
  let result1, result2
  try {
    result1 = await pool.query('SELECT email, active FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Unable to fetch from authentication'
  }

  if (result1.rows.length === 0) {
    return 'Empty result'
  }

  try {
    result2 = await pool.query('SELECT DISTINCT ON(deck) deck, id FROM cards WHERE email=$1',
      [result1.rows[0].email])
    return result2.rows
  } catch {
    return 'Unable to fetch decknames'
  }
}

async function updateTimeStamp ({ id, timeStamp, easy, good, again, status, sid }) {
  let result
  try {
    result = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Unable to fetch email from authentication'
  }
  if (result.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    await pool.query('UPDATE cards SET timestamp=$1, status=$3,easy=$5, good=$6, again=$7 WHERE id=$2 and email=$4',
      [timeStamp, id, status, result.rows[0].email, easy, good, again])
    return 'Updated timestamp successfully'
  } catch {
    return 'Unable to update timestamp'
  }
}

async function updateDeckClickTime ({ deck, deckClickTime, sid }) {
  let result
  try {
    result = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Error while fetching email from authentication'
  }
  if (result.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    await pool.query('UPDATE cards SET deckclicktime=$2 WHERE deck=$1 and email=$3',
      [deck, deckClickTime, result.rows[0].email])
    return 'Updated deckclicktime successfully'
  } catch {
    return 'Error in updating deck click time'
  }
}

async function modifyDeckName ({ reName, deckName, sid }) {
  let result
  try {
    result = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Fail to fetch email from authentication'
  }
  if (result.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    await pool.query('UPDATE cards SET deck=$1 WHERE deck=$2 and email=$3', [reName, deckName, result.rows[0].email])
    return 'Updated deckname successfully'
  } catch {
    return 'Error while modifying deckname'
  }
}

async function deleteDeck ({ deckName, sid }) {
  let result
  try {
    result = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Fail to fetch email from authentication'
  }
  if (result.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    await pool.query('DELETE FROM cards WHERE deck=$1 and email=$2', [deckName, result.rows[0].email])
    return 'Deleted deck successfully'
  } catch {
    return 'Error in deleting deck'
  }
}

module.exports = {
  getDeckNames,
  updateTimeStamp,
  updateDeckClickTime,
  modifyDeckName,
  deleteDeck
}
