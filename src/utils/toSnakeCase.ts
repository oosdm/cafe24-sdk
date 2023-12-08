/**
 * @description camelCase를 snake_case로 변환 (예: camelCase -> camel_case)
 *              query string 또는 request body를 만들 때 사용
 */
export default function toSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}
