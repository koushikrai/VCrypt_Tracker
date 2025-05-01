// src/components/Auth/api.js

const API_URL = 'http://localhost:5000/api/auth';

// Signup API Call
export async function signup(username, password) {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.text();
  return data;
}

// Login API Call
export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.text();
  return data;
}
