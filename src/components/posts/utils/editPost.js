import client from '../../../utils/client';

export const editPost = async (setResponse, postId, content) => {
  try {
    const { data } = await client.patch(`/post/${postId}`, { content });
    setResponse(data);
    return;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};
