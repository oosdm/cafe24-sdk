import makeQueryString from '../utils/makeQueryString';
import fetcher from '../utils/fetcher';

type GetListOfProductsParams = {
  mallId: string;
  token: string;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  productNo?: number; // 상품번호
  display?: string; // 진열상태
  selling?: string; // 판매상태
  category?: number; // 분류번호
  offset?: number; // 페이지 번호 (default: 0, max: 5000)
  limit?: number; // 페이지 번호 (default: 10, min: 1, max: 100)
};

type GetListOfProductsResponse = {
  products?: {
    shop_no: number;
    product_no: number;
    product_code: string;
    custom_product_code: string;
    product_name: string;
    eng_product_name: string;
    supply_product_name: string;
    internal_product_name: string;
    model_name: string;
    price_excluding_tax: string;
    price: string;
    retail_price: string;
    supply_price: string;
    display: string;
    selling: string;
    product_condition: string;
    product_used_month: number;
    summary_description: string;
    margin_rate: string;
    tax_calculation: string;
    tax_type: string;
    tax_rate: number;
    price_content: null | string;
    buy_limit_by_product: string;
    buy_limit_type: string;
    buy_group_list: number[];
    buy_member_id_list: string[];
    repurchase_restriction: string;
    single_purchase_restriction: string;
    buy_unit_type: string;
    buy_unit: number;
    order_quantity_limit_type: string;
    minimum_quantity: number;
    maximum_quantity: number;
    points_by_product: string;
    points_setting_by_payment: string;
    points_amount: {
      payment_method: string;
      points_rate: string;
    }[];
    except_member_points: string;
    product_volume: {
      use_product_volume: string;
      product_width: string;
      product_height: string;
      product_length: string;
    };
    adult_certification: string;
    detail_image: string;
    list_image: string;
    tiny_image: string;
    small_image: string;
    use_naverpay: string;
    naverpay_type: string;
    use_kakaopay: string;
    manufacturer_code: string;
    trend_code: string;
    brand_code: string;
    supplier_code: string;
    made_date: string;
    release_date: string;
    expiration_date: {
      start_date: string;
      end_date: string;
    };
    origin_classification: string;
    origin_place_no: number;
    origin_place_value: string;
    made_in_code: string;
    icon_show_period: {
      start_date: string;
      end_date: string;
    };
    icon: string[];
    hscode: string;
    product_weight: string;
    product_material: string;
    created_date: string;
    updated_date: string;
    english_product_material: null | string;
    cloth_fabric: null | string;
    list_icon: {
      soldout_icon: boolean;
      recommend_icon: boolean;
      new_icon: boolean;
    };
    approve_status: string;
    classification_code: string;
    sold_out: string;
    additional_price: string;
    clearance_category_eng: string;
    clearance_category_kor: string;
    clearance_category_code: string;
    exposure_limit_type: string;
    exposure_group_list: number[];
    set_product_type: null | string;
    shipping_fee_by_product: string;
    shipping_fee_type: string;
    main: number[];
    market_sync: string;
  }[];
  error?: { code: number; message: string };
};

/**
 * @description 상품 목록 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#retrieve-a-list-of-products
 */
export const getListOfProducts = async ({ mallId, token, ...params }: GetListOfProductsParams) => {
  const { products, error } = (await fetcher({
    mallId,
    token,
    apiPath: `/admin/products?${makeQueryString(params)}`,
  })) as GetListOfProductsResponse;

  if (error) {
    return error;
  }

  return products;
};
