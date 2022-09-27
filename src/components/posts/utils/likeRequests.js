import client from '../../../utils/client';

export function createLike(setPostResponse, postId) {
  client
    .post(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch(e => console.error);
}

export function deleteLike(setPostResponse, postId) {
  client
    .delete(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch(e => console.error);
}

export function createCommentLike(
  setPostResponse,
  postId,
  commentId,
  setLikesCount
) {
  client
    .post(`/post/${postId}/comment/${commentId}/like`)
    .then(res => {
      console.log(res);
      setLikesCount(res.data.data.like.commentLikes);
    })
    .catch(e => console.error);
}

export function deleteCommentLike(
  setPostResponse,
  postId,
  commentId,
  setLikesCount
) {
  client
    .delete(`/post/${postId}/comment/${commentId}/like`)
    .then(res => {
      setPostResponse(res.data);
    })
    .catch(e => console.error);
}
