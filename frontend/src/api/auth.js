import api from '@/utils/axios'

export async function login(email, password) {
    const response = await api.post('/login', {
        email,
        password
    })
    return response.data
}

export async function logout(token) {
    return api.delete('/logout', {
        token
    })
}