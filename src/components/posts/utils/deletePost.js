import client from '../../../utils/client';

export function deletePost(setPostResponse, postId) {
    client.delete(`/post/${postId}`)
    .then((res) => {
        setPostResponse(res.data)
    })
    .catch(() => console.log('Unable to delete post'))
}