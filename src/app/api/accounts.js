import { useAuth } from "./auth";

export async function getCurrentUser() {
  const url = "http://localhost:8000/api/users/current";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return useAuth(url, options);
}

export async function createUser(data) {
  const url = "http://localhost:8000/api/users";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options);
}
