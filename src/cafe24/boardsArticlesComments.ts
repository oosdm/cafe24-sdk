import makeQueryString from '../utils/makeQueryString';
import fetcher from '../utils/fetcher';
import getKSTDateString from '../utils/getKSTDateString';
import makeRequestBody from '../utils/makeRequestBody';

type GetBoardsArticlesCommentsParams = {
  mallId: string;
  token: string;
  boardNo: number;
  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  articleNo: number;
  offset?: number; // 페이지 번호 (default: 0, max: 8000)
  limit?: number; // 페이지 번호 (default: 0, max: 8000)
};

type GetBoardsArticlesCommentsResponse = {
  comments?: {
    shop_no: number;
    board_no: number;
    article_no: number;
    comment_no: number;
    content: string;
    writer: string;
    member_id: string;
    created_date: string;
    client_ip: string;
    rating: number;
    secret: string;
    parent_comment_no: number | null;
    input_channel: string;
    attach_file_urls: {
      no: number;
      name: string;
      url: string;
    }[];
  }[];
  error?: { code: number; message: string };
};

type CreateBoardsArticlesCommentsParams = {
  mallId: string;
  token: string;
  boardNo: number;
  articleNo: number;

  shopNo?: number; // 쇼핑몰 번호 (default: 1)
  content: string;
  writer: string;
  password?: string;
  memberId?: string;
  rating?: number;
  secret?: string;
  parentCommentNo?: number;
  inputChannel?: string;
  createdDate?: string;
  attachFileUrls?: {
    no: number;
    name: string;
    url: string;
  }[];
};

/**
 * @description 게시물 댓글 조회
 * @link https://developers.cafe24.com/docs/ko/api/admin/#retrieve-a-list-of-comments-for-a-board-post
 */
export const getBoardsArticlesComments = async ({
  mallId,
  token,
  boardNo,
  articleNo,
  ...params
}: GetBoardsArticlesCommentsParams) => {
  const { comments, error } = (await fetcher({
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles/${articleNo}/comments?${makeQueryString(params)}`,
  })) as GetBoardsArticlesCommentsResponse;

  if (error) {
    return error;
  }

  return comments;
};

/**
 * @description 게시글 댓글 작성
 * @link https://developers.cafe24.com/docs/ko/api/admin/#create-a-comment-for-a-board-post
 */
export const createBoardsArticlesComments = async ({
  mallId,
  token,
  boardNo,
  articleNo,

  shopNo = 1,
  createdDate = getKSTDateString(),
  password = process.env.PASSWORD,
  ...params
}: CreateBoardsArticlesCommentsParams) => {
  const { comment, error } = (await fetcher({
    method: 'POST',
    mallId,
    token,
    apiPath: `/admin/boards/${boardNo}/articles/${articleNo}/comments`,
    body: makeRequestBody({
      shopNo,
      request: { createdDate, password, ...params },
    }),
  })) as { comment?: any; error?: any };

  if (error) {
    return error;
  }

  return comment;
};
