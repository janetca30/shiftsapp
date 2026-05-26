const BASE_URL = import.meta.env.VITE_API_URL

const request = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Something went wrong')

    return data
}

export const authService = {
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request('/auth/me'),
}

export const stylistService = {
    getAll: () => request('/stylists'),
    getOne: (id) => request(`/stylists/${id}`),
    create: (body) => request('/stylists', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/stylists/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (id) => request(`/stylists/${id}`, { method: 'DELETE' }),
}

export const shiftService = {
    getAll: () => request('/shifts'),
    getMy: () => request('/shifts/my'),
    create: (body) => request('/shifts', { method: 'POST', body: JSON.stringify(body) }),
    createGuest: (body) => request('/shifts/guest', { method: 'POST', body: JSON.stringify(body) }),
    updateStatus: (id, status) => request(`/shifts/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    cancel: (id) => request(`/shifts/${id}/cancel`, { method: 'PUT' }),
}