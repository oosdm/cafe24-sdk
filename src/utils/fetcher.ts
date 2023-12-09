import { CAFE24_API_BASE_URL, CAFE24_API_VERSION } from '../env';

/**
 * @description cafe24 api fetcher 생성
 */
export default async function fetcher({
  method = 'GET',
  mallId,
  token,
  apiPath,
  body,
}: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  mallId: string;
  token: string;
  apiPath: string;
  body?: any;
}) {
  return fetch(`${CAFE24_API_BASE_URL.replace('{mallid}', mallId)}${apiPath}`, {
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
