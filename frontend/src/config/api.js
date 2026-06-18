const apiUrl = import.meta.env.VITE_API_URL

if (!apiUrl) {
  throw new Error('Missing VITE_API_URL. Set it to your backend /api URL.')
}

export const API_URL = apiUrl.replace(/\/$/, '')
