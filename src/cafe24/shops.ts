import fetcher from '../utils/fetcher';

type GetListOfShopsParams = {
  mallId: string;
  token: string;
};

type GetListOfShopsResponse = {
  shops?: {
    shop_no: number;
    default: string;
    shop_name: string;
    business_country_code: string;
    language_code: string;
    language_name: string;
    currency_code: string;
    currency_name: string;
    reference_currency_code: string;
    reference_currency_name: null;
    pc_skin_no: number;
    mobile_skin_no: number;
    base_domain: string;
    primary_domain: string;
    slave_domain: string[];
    active: string;
    timezone: string;
    timezone_name: string;
    date_format: string;
    time_format: string;
    use_reference_currency: string;
  }[];
  error?: { code: number; message: string };
};

/**
 * @description 쇼핑몰 목록 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#retrieve-a-list-of-shops
 */
export const getListOfShops = async ({ mallId, token }: GetListOfShopsParams) => {
  const { shops, error } = (await fetcher({
    mallId,
    token,
    apiPath: '/admin/shops',
  })) as GetListOfShopsResponse;

  if (error) {
    return error;
  }

  return shops;
};
