import client from '../../../utils/client';

export function createLike (setPostResponse, postId) {
  client
    .post(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch((e) => console.error)
}

export function deleteLike (setPostResponse, postId) {
  client
    .delete(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch((e) => console.error)
}
