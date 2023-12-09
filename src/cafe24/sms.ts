import fetcher from '../utils/fetcher';
import makeRequestBody from '../utils/makeRequestBody';

type GetSmsSettingParams = {
  mallId: string;
  token: string;
};

type GetSmsSettingResponse = {
  sms?: {
    shop_no: number;
    use_sms: string;
    exclude_unsubscriber: string;
    default_sender: string;
    unsubscribe_phone: string;
    send_method: string;
  };
  error?: { code: number; message: string };
};

type SendSmsParams = {
  mallId: string;
  token: string;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  senderNo: string; // 발신자 아이디
  content: string; // 메시지 내용
  recipients: string[]; // 수신자 번호 (max 100)
  memberId: string[]; // 수신자 회원 아이디 (max 100)
  excludeUnsubscriber: string; // 수신거부 회원 제외 여부 (default: T, T/F)
  type: string; // 메시지 타입 (default: SMS, SMS(단문)/LMS(장문))
  title: string; // 메시지 제목
};

type SendSmsResponse = {
  sms?: {
    queue_code: string;
  };
  error?: { code: number; message: string };
};

type GetSmsBalance = {
  mallId: string;
  token: string;
};

type GetSmsBalanceResponse = {
  sms?: {
    balance: string;
    sms_count: number;
    lms_count: number;
  };
  error?: { code: number; message: string };
};

type GetListOfSmsSenders = {
  mallId: string;
  token: string;
  offset?: number; // 조회결과 시작위치 (default: 0, max: 8000)
  limit?: number; // 조회결과 최대건수 (default: 10, min: 1, max: 100)
};

type GetListOfSmsSendersResponse = {
  senders: {
    sender_no: number;
    sender: string;
    auth_status: string;
  }[];
  error?: { code: number; message: string };
};

/**
 * @description SMS 설정 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#sms-setting-properties
 */
export const getSmsSetting = async ({ mallId, token }: GetSmsSettingParams) => {
  const { sms, error } = (await fetcher({
    mallId,
    token,
    apiPath: '/admin/sms/setting',
  })) as GetSmsSettingResponse;

  if (error) {
    return error;
  }

  return sms;
};

/**
 * @description SMS 설정 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#send-a-sms
 */
export const sendSms = async ({ mallId, token, shopNo, ...params }: SendSmsParams) => {
  const { sms, error } = (await fetcher({
    method: 'POST',
    mallId,
    token,
    apiPath: '/admin/sms',
    body: makeRequestBody({
      shopNo,
      request: params,
    }),
  })) as SendSmsResponse;

  if (error) {
    return error;
  }

  return sms;
};

/**
 * @description SMS 잔액 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#sms-balance
 */
export const getSmsBalance = async ({ mallId, token }: GetSmsBalance) => {
  const { sms, error } = (await fetcher({
    mallId,
    token,
    apiPath: '/admin/sms/balance',
  })) as GetSmsBalanceResponse;

  if (error) {
    return error;
  }

  return sms;
};

/**
 * @description SMS 발신자 목록 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#sms-senders-properties
 */
export const getListOfSmsSenders = async ({ mallId, token }: GetListOfSmsSenders) => {
  const { senders, error } = (await fetcher({
    mallId,
    token,
    apiPath: '/admin/sms/senders',
  })) as GetListOfSmsSendersResponse;

  if (error) {
    return error;
  }

  return senders;
};
