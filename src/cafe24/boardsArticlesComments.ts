import makeQueryString from '../utils/makeQueryString';
import makeFetcher from '../utils/makeFetcher';

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

/**
 * @description 게시물 댓글 조회
 */
export const getBoardsArticlesComments = async ({
  mallId,
  shopNo = 1,
  token,
  boardNo,
  articleNo,
  offset = 0,
  limit = 10,
}: GetBoardsArticlesCommentsParams) => {
  const apiPath = `/admin/boards/${boardNo}/articles/${articleNo}/comments`;
  const queryString = makeQueryString({ shopNo, offset, limit });

  const { comments, error } = (await makeFetcher({
    mallId,
    token,
    apiUrl: `${apiPath}?${queryString}`,
  })) as GetBoardsArticlesCommentsResponse;

  if (error) {
    return error;
  }

  return comments;
};
