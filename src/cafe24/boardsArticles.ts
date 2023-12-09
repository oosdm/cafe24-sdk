import getKSTDateString from '../utils/getKSTDateString';
import makeQueryString from '../utils/makeQueryString';
import makeRequestBody from '../utils/makeRequestBody';
import fetcher from '../utils/fetcher';

type GetBoardsArticlesParams = {
  mallId: string;
  token: string;
  boardNo: number;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  startDate?: string; // 조회 시작일, ex) 2023-11-30
  endDate?: string; // 조회 종료일, ex) 2023-11-30
  offset?: number; // 페이지 번호 (default: 0, max: 8000)
  limit?: number; // 페이지당 게시물 수 (default: 10, min: 1, max: 100)
};

type GetBoardsArticlesResponse = {
  articles?: {
    shop_no: number;
    article_no: number;
    parent_article_no: number;
    board_no: number;
    product_no: number;
    category_no: number;
    board_category_no: number;
    reply_sequence: number;
    reply_depth: number;
    created_date: string;
    writer: string;
    writer_email: string;
    member_id: string;
    title: string;
    content: string;
    supplier_id: string;
    client_ip: string;
    nick_name: string;
    rating: number;
    reply_mail: string;
    display: string;
    secret: string;
    notice: string;
    fixed: string;
    deleted: string;
    input_channel: string;
    order_id: string;
    attach_file_urls: {
      no: number;
      name: string;
      url: string;
    }[];
    hit: number;
    reply: string;
    reply_user_id: string;
    reply_status: string;
    naverpay_review_id: string;
    display_time: string;
    display_time_start_hour: number;
    display_time_end_hour: number;
  }[];
  error?: { code: number; message: string };
};

type CreateBoardsArticlesParams = {
  mallId: string;
  token: string;
  boardNo: number;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  writer: string; // 작성자
  title: string; // 제목
  content: string; // 내용
  clientIp: string; // 작성자 IP
  replyArticleNo?: number; // 답변 게시글 번호(게시물에 답변을 추가하고자 할 경우 게시물의 번호를 입력한다)
  createdDate?: string; // 생성일, ex) 2018-11-30T12:43:00+09:00
  writerEmail?: string; // 작성자 이메일
  memberId?: string; // 회원 아이디 (미입력 시 대표 운영자 계정으로 작성됨)
  notice?: string; // 공지 여부 (T/F, default: F)
  fixed?: string; // 고정글 여부 (T/F, default: F)
  deleted?: string; // 삭제 구분 (T/F, default: F)
  reply?: string; // 1:1 게시판 문의내용에 대한 답변 여부 (T/F, default: F)
  rating?: number; // 평점, (1~5)
  salesChannel?: string; // 매체사(최대 20자)
  secret?: string; // 비밀글 여부 (T/F, default: F)
  password?: string; // 비밀번호
  replyMail?: string; // 1:1 게시판 문의내용에 대한 답변 메일 여부 (Y/N, default: N)
  boardCategoryNo?: number; // 게시판 카테고리 번호
  nickName?: string; // 별명
  inputChannel?: string; // 게시물 작성 경로(P: PC, M: Mobile, default: P)
  replyUserId?: string; // 처리중 또는 답변완료한 운영자 아이디
  replyStatus?: string; // 답변 처리 상태 (N: 답변전, P: 처리중, C: 처리완료)
  productNo?: number; // 상품번호
  categoryNo?: number; // 분류 번호
  orderId?: string; // 주문번호
  naverpayReviewId?: string; // 네이버페이 리뷰 아이디
  attachFileUrls?: {
    // 첨부파일 URL
    name: string;
    url: string;
  }[];
};

type CreateBoardsArticlesResponse = {
  articles?: {
    shop_no: number;
    article_no: number;
    parent_article_no: number;
    board_no: number;
    product_no: number;
    category_no: number;
    board_category_no: number;
    reply_sequence: number;
    reply_depth: number;
    created_date: string;
    writer: string;
    writer_email: string;
    member_id: string;
    title: string;
    content: string;
    supplier_id: string;
    client_ip: string;
    nick_name: string;
    rating: number;
    reply_mail: string;
    display: string;
    secret: string;
    notice: string;
    fixed: string;
    deleted: string;
    input_channel: string;
    order_id: string;
    attach_file_urls: {
      no: number;
      name: string;
      url: string;
    }[];
    hit: number;
    reply: string;
    reply_user_id: string;
    reply_status: string;
    naverpay_review_id: string;
    display_time: string;
    display_time_start_hour: number;
    display_time_end_hour: number;
  }[];
  links?: {
    rel: string;
    href: string;
  }[];
  error?: { code: number; message: string };
};

type UpdateBoardsArticlesParams = {
  mallId: string;
  token: string;
  boardNo: number;

  shopNo?: number;
  articleNo: number; // 게시글 번호
  title?: string; // 제목(최대 256자)
  content?: string; // 내용
  rating?: number; // 평점(1 ~ 5)
  salesChannel?: string; // 매체사(최대 20자)
  boardCategoryNo?: number; // 게시판 카테고리 번호
  display?: string; // 게시 여부(T: 게시 F: 게시안함)
  notice?: string; // 공지 여부(T: 사용함 F: 사용안함)
  fixed?: string; // 고정글 여부(T: 사용함 F : 사용안함)
  displayTimeStartHour?: number; // 노출시간 시작 시각
  displayTimeEndHour?: number; // 노출시간 종료 시각
  attachFileUrl1?: string; // 파일 URL 1
  attachFileUrl2?: string; // 파일 URL 2
  attachFileUrl3?: string; // 파일 URL 3
  attachFileUrl4?: string; // 파일 URL 4
  attachFileUrl5?: string; // 파일 URL 5
};

type UpdateBoardsArticlesResponse = {
  article?: {
    shop_no: number;
    article_no: number;
    parent_article_no: number;
    board_no: number;
    product_no: number;
    category_no: number;
    board_category_no: number;
    reply_sequence: number;
    reply_depth: number;
    created_date: string;
    writer: string;
    writer_email: string;
    member_id: string;
    title: string;
    content: string;
    client_ip: string;
    nick_name: string;
    rating: number;
    reply_mail: string;
    display: string;
    secret: string;
    notice: string;
    fixed: string;
    deleted: string;
    input_channel: string;
    order_id: string;
    attached_file_urls: {
      no: number;
      name: string;
      url: string;
    }[];
    hit: number;
    reply: string;
    reply_user_id: string;
    reply_status: string;
    naverpay_review_id: string;
    display_time: string;
    display_time_start_hour: string;
    display_time_end_hour: string;
  };
  error?: { code: number; message: string };
};

type DeleteBoardsArticlesParams = {
  mallId: string;
  token: string;
  boardNo: number;
  articleNo: number;
};

type DeleteBoardsArticlesResponse = {
  article?: {
    shop_no: number;
    board_no: number;
    article_no: number;
  };
  error?: { code: number; message: string };
};

/**
 * @description 게시물 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#retrieve-a-list-of-posts-for-a-board
 */
export const getBoardsArticles = async ({
  mallId,
  token,
  boardNo,
  ...params
}: GetBoardsArticlesParams) => {
  const { articles, error } = (await fetcher({
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles?${makeQueryString(params)}`,
  })) as GetBoardsArticlesResponse;

  if (error) {
    return error;
  }

  return articles;
};

/**
 * @description 게시물 생성
 * @link https://developers.cafe24.com/docs/ko/api/admin/#create-a-board-post
 */
export const createBoardsArticles = async ({
  mallId,
  token,
  boardNo,
  shopNo = 1,
  createdDate = getKSTDateString(),
  ...params
}: CreateBoardsArticlesParams) => {
  const { articles, error } = (await fetcher({
    method: 'POST',
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles`,
    body: makeRequestBody({
      shopNo,
      requests: [{ createdDate, ...params }],
    }),
  })) as CreateBoardsArticlesResponse;

  if (error) {
    return error;
  }

  return articles;
};

/**
 * @description 게시물 수정
 * @link https://developers.cafe24.com/docs/ko/api/admin/#update-a-board-post
 */
export const updateBoardsArticles = async ({
  mallId,
  token,
  boardNo,
  shopNo,
  articleNo,
  ...params
}: UpdateBoardsArticlesParams) => {
  const { article, error } = (await fetcher({
    method: 'PUT',
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles/${articleNo}`,
    body: makeRequestBody({
      shopNo,
      request: params,
    }),
  })) as UpdateBoardsArticlesResponse;

  if (error) {
    return error;
  }

  return article;
};

/**
 * @description 게시물 삭제
 * @link https://developers.cafe24.com/docs/ko/api/admin/#delete-a-board-post
 */
export const deleteBoardsArticles = async ({
  mallId,
  token,
  boardNo,
  articleNo,
}: DeleteBoardsArticlesParams) => {
  const { error } = (await fetcher({
    method: 'DELETE',
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles/${articleNo}`,
  })) as DeleteBoardsArticlesResponse;

  if (error) {
    return error;
  }

  return { ok: true };
};
