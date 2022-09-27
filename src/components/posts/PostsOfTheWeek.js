import PostItem from './PostItem'

const PostsOfTheWeek = ({ posts, getUserId, setPost, setPostResponse }) => {
    const postsOfTheWeek = posts.map(post => {
        post.isPostOfTheWeek = true
        return post
    })

    return (
        <div className='posts-of-the-week-wrap'>
            {postsOfTheWeek?.length > 0 && (
                <ul className='posts-list'>
                    {postsOfTheWeek?.map((post, index) => (
                        <PostItem
                            post={post}
                            key={index}
                            userId={getUserId}
                            setPost={setPost}
                            setPostResponse={setPostResponse}
                        />
                    ))}
                </ul>
            )
            }
        </div>)

}

export default PostsOfTheWeek