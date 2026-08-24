const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function authHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const dataProvider = {
  getList: async ({ resource, pagination = {} }) => {
    const page = pagination.current || 1
    const perPage = pagination.pageSize || 25
    const res = await fetch(`${API_URL}/api/admin/${resource}?page=${page}&limit=${perPage}`, {
      headers: { ...authHeaders() },
    })
    const json = await res.json()
    return {
      data: json.rows || [],
      total: json.count || (json.length || 0),
    }
  },
  getOne: async ({ resource, id }) => {
    const res = await fetch(`${API_URL}/api/admin/${resource}/${id}`, { headers: { ...authHeaders() } })
    const json = await res.json()
    return { data: json }
  },
  create: async ({ resource, variables }) => {
    const form = new FormData()
    Object.keys(variables || {}).forEach(k => {
      if (variables[k] !== undefined && variables[k] !== null) form.append(k, variables[k])
    })
    const res = await fetch(`${API_URL}/api/admin/${resource}`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: form,
    })
    const json = await res.json()
    return { data: json }
  },
  update: async ({ resource, id, variables }) => {
    const form = new FormData()
    Object.keys(variables || {}).forEach(k => {
      if (variables[k] !== undefined && variables[k] !== null) form.append(k, variables[k])
    })
    const res = await fetch(`${API_URL}/api/admin/${resource}/${id}`, {
      method: 'PUT',
      headers: { ...authHeaders() },
      body: form,
    })
    const json = await res.json()
    return { data: json }
  },
  deleteOne: async ({ resource, id }) => {
    await fetch(`${API_URL}/api/admin/${resource}/${id}`, { method: 'DELETE', headers: { ...authHeaders() } })
    return { data: { id } }
  },
}

export default dataProvider
