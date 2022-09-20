import client from '../../../utils/client';

export function createLike (setPostResponse, postId) {
  client
    .post(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch((e) => console.log('Unable to like post', e))
}

export function deleteLike (setPostResponse, postId) {
  client
    .delete(`/post/${postId}/like`)
    .then(res => setPostResponse(res.data))
    .catch((e) => console.log('Unable to delete like', e))
}