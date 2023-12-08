import moment from 'moment-timezone';

/**
 * @description KST 기준의 날짜를 반환
 */
export default function getKSTDateString() {
  return moment().tz('Asia/Seoul').format();
}
