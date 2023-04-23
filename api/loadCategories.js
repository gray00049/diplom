export default async function loadCategories() {
  const url = import.meta.env.VITE_REQUEST_URL;

  const response = await fetch(`${url}/api/categories`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json()
}