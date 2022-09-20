import client from '../../../utils/client';

export function createLike (setPostResponse, postId) {
  client
    .post(`posts/${postId}/like`)
    .then(res => console.log(res.data))
    .then(res => setPostResponse(res.data))
    .catch(() => console.log('Unable to like post'))
}

export function deleteLike (setPostResponse, postId) {
  client
    .delete(`posts/${postId}/like`)
    .then(res => console.log(res.data))
    .then(res => setPostResponse(res.data))
    .catch(() => console.log('Unable to delete like'))
}