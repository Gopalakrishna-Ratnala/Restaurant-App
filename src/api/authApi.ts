// src/api/authApi.ts
const API_URL = 'https://apis.ccbp.in'

interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  jwt_token: string
}

interface ErrorResponse {
  error_msg: string
}

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',

    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error((data as ErrorResponse).error_msg || 'Login failed')
  }

  return data as LoginResponse
}
