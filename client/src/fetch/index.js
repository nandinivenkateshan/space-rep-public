export async function fetchPost (url, value) {
  try {
    const response = await window.fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch {
    return { err: 'error' }
  }
}

export async function fetchGet (url) {
  try {
    const response = await window.fetch(url)
    return response
  } catch {
    return { err: 'error' }
  }
}
