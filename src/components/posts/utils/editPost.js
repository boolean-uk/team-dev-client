import client from "../../../utils/client"

export const editPost = (setResponse, postId, content) => {
  client.patch(`/post/${postId}`, {content})
        .then (res => {
        setResponse(res.data)
})
}