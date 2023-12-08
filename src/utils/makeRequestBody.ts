import removeNullValueKeys from './removeNullValueKeys';
import toSnakeCase from './toSnakeCase';

/**
 * @description request body 생성하며 camelCase로 넘어온 key를 snake_case로 변환
 */
export default function makeRequestBody(obj: { [key: string]: any }) {
  const nullRemovedObj = removeNullValueKeys(obj);

  const result: { [key: string]: any } = {};

  Object.keys(nullRemovedObj).forEach((key) => {
    // value가 Array인 경우
    if (Array.isArray(nullRemovedObj[key])) {
      result[toSnakeCase(key)] = nullRemovedObj[key].map((item: any) => {
        if (typeof item === 'object') {
          return makeRequestBody(item);
        }
        return item;
      });
      return;
    }

    // value가 object인 경우
    if (typeof nullRemovedObj[key] === 'object' && !Array.isArray(nullRemovedObj[key])) {
      result[toSnakeCase(key)] = makeRequestBody(nullRemovedObj[key]);
      return;
    }

    // key를 snake_case로 변환
    result[toSnakeCase(key)] = nullRemovedObj[key];
  });

  return result;
}
