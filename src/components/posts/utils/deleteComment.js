import client from '../../../utils/client';

export function deleteComment(setPostResponse, postId, commentId) {
  client
    .delete(`/post/${postId}/comment/${commentId}`)
    .then(res => {
      setPostResponse(res.data);
    })
    .catch(() => console.log('Unable to delete comment'));
}
