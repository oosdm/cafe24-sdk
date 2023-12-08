import { URLSearchParams } from 'url';
import removeNullValueKeys from './removeNullValueKeys';
import toSnakeCase from './toSnakeCase';

/**
 * @description query string 생성하며 camelCase로 넘어온 key를 snake_case로 변환
 */
export default function makeQueryString(obj: { [key: string]: any }) {
  // value가 null 또는 undefined인 key 제거
  const nullRemovedObj = removeNullValueKeys(obj);

  const result: { [key: string]: any } = {};
  let errMsg;

  Object.keys(nullRemovedObj).forEach((key) => {
    // value가 object인 경우 에러 발생
    if (typeof nullRemovedObj[key] === 'object') {
      return (errMsg = 'makeQueryString: object type is not allowed');
    }

    // key를 snake_case로 변환
    result[toSnakeCase(key)] = nullRemovedObj[key];
  });

  if (errMsg) throw new Error(errMsg);

  const queryString = new URLSearchParams(result);

  return queryString;
}
