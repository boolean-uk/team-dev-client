import client from '../../../utils/client';

export const createComment = (setPostResponse, postId, content) => {
  client
    .post(`/post/${postId}/comment`, { content })
    .then(res => {
      setPostResponse(res.data);
    })
    .catch(err => console.error(err.response));
};
