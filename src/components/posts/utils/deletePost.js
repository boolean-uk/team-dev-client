import client from '../../../utils/client';

export function deletePost(setPostResponse, postId) {
  client
    .delete(`/post/${postId}`)
    .then(res => {
      setPostResponse(res.data);
    })
    .catch(err => console.error('Unable to delete post', err.response));
}
