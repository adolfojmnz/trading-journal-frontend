export async function APILoginRequest(username, password) {
  const response = await fetch('http://localhost:8000/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return response;
}


export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken")

  const response = await fetch('http://localhost:8000/api/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
  }

  return response;
}


export async function useAuth(url, options) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  const response = await fetch(url, options)

  if (response.status === 401) {
    const refreshResponse = await refreshToken();
    if (refreshResponse.ok) {
      return useAuth(url, options);
    }
  }

  return response;
}