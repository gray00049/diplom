export default async function loadTopSales() {
  const url = import.meta.env.VITE_REQUEST_URL;

  const response = await fetch(`${url}/api/top-sales`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json()
}