const API_BASE = 'https://fakestoreapi.com';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/products`);
  return handleResponse(response);
}

export async function fetchProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);
  return handleResponse(response);
}
