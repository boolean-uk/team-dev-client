

const Comments = ({createComment,handleComment,post}) => {
  
  return (
    <div className='comments-section'>
  <form onSubmit={createComment}>
    <input
      id={post.id}
      type='text'
      className='post__comment'
      onChange={handleComment}
      name='comment'
      label='New Comment'
      variant='outlined'
    />
    <button className='comment-button'>Comment</button>
  </form>
  <ul className='comments-list'>
    {post.postComments.map((comment) => (
      <li key={comment.id} className='comment-item'>
        {comment.content}
      </li>
    ))}
  </ul>
</div>
  )
}
export default Comments