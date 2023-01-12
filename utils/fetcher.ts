export async function fetcher(input: RequestInfo, init?: RequestInit) {
  const resp = await fetch(input, init);
  return resp.json();
}
