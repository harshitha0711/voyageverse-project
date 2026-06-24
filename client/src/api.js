const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('voyageverse_token');
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('voyageverse_token', token);
  } else {
    localStorage.removeItem('voyageverse_token');
  }
};

export const apiFetch = async (path, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Error');
  }

  // Handle empty responses
  if (response.status === 204) return null;
  return response.json();
};
