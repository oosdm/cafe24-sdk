import makeQueryString from '../utils/makeQueryString';
import fetcher from '../utils/fetcher';

type GetListOfOrders = {
  mallId: string;
  token: string;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  startDate?: string; // 시작일 (default: 2023-01-01)
  endDate?: string; // 종료일 (default: 2023-01-01)
  orderId: string; // 주문번호 (, 로 여러건 검색 가능)
  orderStatus?: string; // 주문상태 (링크 참조)
  paymentStatus?: string; // 결제상태 (링크 참조)
  memberType?: string; // 회원여부 (링크 참조)
  memberId?: string; // 회원아이디
  productNo?: number; // 상품번호
  productCode?: string; // 상품코드
  dateType?: string; // 검색날짜 유형 (링크 참조)
  offset?: number; // 페이지 번호 (default: 0, max: 15000)
  limit?: number; // 페이지 번호 (default: 10, min: 1, max: 1000)
};

type GetListOfOrdersResponse = {
  orders?: {
    shop_no: number;
    currency: string;
    order_id: string;
    market_id: string;
    market_order_no: null | number;
    member_id: string;
    member_email: string;
    member_authentication: string;
    initial_order_amount: {
      order_price_amount: string;
      shipping_fee: string;
      points_spent_amount: string;
      credits_spent_amount: string;
      coupon_discount_price: string;
      coupon_shipping_fee_amount: string;
      membership_discount_amount: string;
      shipping_fee_discount_amount: string;
      set_product_discount_amount: string;
      app_discount_amount: string;
      point_incentive_amount: string;
      total_amount_due: string;
      payment_amount: string;
      market_other_discount_amount: string;
      tax: string;
    };
    actual_order_amount: {
      order_price_amount: string;
      shipping_fee: string;
      points_spent_amount: string;
      credits_spent_amount: string;
      coupon_discount_price: string;
      coupon_shipping_fee_amount: string;
      membership_discount_amount: string;
      shipping_fee_discount_amount: string;
      set_product_discount_amount: string;
      app_discount_amount: string;
      point_incentive_amount: string;
      total_amount_due: string;
      payment_amount: string;
      market_other_discount_amount: string;
      tax: string;
    };
    billing_name: string;
    bank_code: string;
    bank_code_name: string;
    payment_method: string[];
    payment_method_name: string[];
    payment_gateway_names: null | string;
    sub_payment_method_name: string;
    sub_payment_method_code: string;
    transaction_ids: null | string;
    paid: string;
    canceled: string;
    order_date: string;
    first_order: string;
    payment_date: string;
    order_from_mobile: string;
    use_escrow: string;
    bank_account_no: string;
    bank_account_owner_name: string;
    market_seller_id: null | string;
    payment_amount: string;
    cancel_date: null | string;
    order_place_name: string;
    order_place_id: string;
    payment_confirmation: null | string;
    commission: string;
    postpay: string;
    admin_additional_amount: string;
    additional_shipping_fee: string;
    international_shipping_insurance: string;
    additional_handling_fee: string;
    shipping_type: string;
    shipping_type_text: string;
    shipping_status: string;
    shipping_fee_detail: [
      {
        shipping_group_code: number;
        supplier_code: string;
        shipping_fee: string;
        cancel_shipping_fee: string;
        additional_shipping_fee: string;
        refunded_shipping_fee: string;
        return_shpping_fee: string;
        items: string[];
      },
    ];
    regional_surcharge_detail: [
      {
        shipping_group_code: number;
        supplier_code: string;
        regional_surcharge_amount: string;
        cancel_shipping_fee: string;
        additional_shipping_fee: string;
        refunded_shipping_fee: string;
        return_shpping_fee: string;
        items: string[];
      },
    ];
    wished_delivery_date: string;
    wished_delivery_time: null | string;
    wished_carrier_id: null | string;
    wished_carrier_name: null | string;
    return_confirmed_date: null | string;
    total_supply_price: string;
    naver_point: number;
    additional_order_info_list: [
      {
        id: number;
        name: string;
        value: string;
        input_type: string;
        product_type: string;
        applied_product_list: string[];
      },
    ];
    store_pickup: string;
    easypay_name: string;
    loan_status: null | string;
    subscription: string;
    multiple_addresses: string;
    exchange_rate: string;
    first_payment_methods: string[];
    naverpay_payment_information: string;
    market_discount_info: null | string;
    include_tax: string;
    tax_detail: [
      {
        name: string;
        amount: string;
        price_before_tax: string;
        price_before_tax_type: string;
        order_item_code: string[];
        country_tax_rate: string;
        region_tax: {
          rate: string;
          taxation_method: string;
        };
        product_tax_override: {
          rate: string;
          taxation_method: string;
        };
        shipping_tax_override: {
          rate: null;
          taxation_method: null;
        };
      },
    ];
    service_type: string;
    service_data: [
      {
        key: string;
        value: string;
        title: string;
      },
      {
        key: string;
        value: string;
        title: string;
      },
    ];
    show_shipping_address: string;
    social_member_code: null | string;
    social_name: null | string;
  }[];
  links: {
    rel: string;
    href: string;
  }[];
  error?: { code: number; message: string };
};

/**
 * @description 주문 목록 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#retrieve-a-list-of-orders
 */
export const getListOfOrders = async ({ mallId, token, ...params }: GetListOfOrders) => {
  const { orders, error } = (await fetcher({
    mallId,
    token,
    apiPath: `/admin/orders?${makeQueryString(params)}`,
  })) as GetListOfOrdersResponse;

  if (error) {
    return error;
  }

  return orders;
};
