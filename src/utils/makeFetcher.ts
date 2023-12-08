import { CAFE24_API_BASE_URL, CAFE24_API_VERSION } from '../env';

/**
 * @description Cafe24 API를 호출하는 함수
 */
export default async function makeFetcher({
  method = 'GET',
  mallId,
  token,
  apiUrl,
  body,
}: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  mallId: string;
  token: string;
  apiUrl: string;
  body?: any;
}) {
  return fetch(`${CAFE24_API_BASE_URL.replace('{mallid}', mallId)}${apiUrl}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Cafe24-Api-Version': CAFE24_API_VERSION,
    },
    body: !!body ? JSON.stringify(body) : null,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}
