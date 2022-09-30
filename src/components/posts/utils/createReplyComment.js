import client from '../../../utils/client';

export const createReplyComment = (
  setPostResponse,
  postId,
  content,
  parentId
) => {
  client
    .post(`/post/${postId}/comment`, { content, parentId })
    .then(res => {
      setPostResponse(res.data);
    })
    .catch(err => console.error(err.response));
};
