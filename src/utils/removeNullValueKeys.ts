/**
 * @description value가 null 또는 undefined인 key 제거
 */
export default function removeNullValueKeys(obj: { [key: string]: any }) {
  const result = {} as { [key: string]: any };

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
