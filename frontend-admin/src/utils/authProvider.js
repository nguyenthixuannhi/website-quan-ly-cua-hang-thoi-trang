const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const authProvider = {
  login: async ({ username, password }) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, mat_khau: password }),
    })
    if (!res.ok) throw new Error('Login failed')
    const json = await res.json()
    localStorage.setItem('token', json.token)
    localStorage.setItem('user', JSON.stringify(json.user))
    return { success: true }
  },
  logout: async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return { success: true }
  },
  checkAuth: async () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject()
  },
  getPermissions: async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    return user ? user.vai_tro : null
  },
}

export default authProvider
