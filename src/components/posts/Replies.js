import React, { useEffect, useState } from 'react'
import CommentReplyItem from './CommentReplyItem'
import FilterMenu from './utils/filterMenu'

const Replies = ({ post, showingAll, setShowingAll, comment }) => {
  const [sortType, setSortType] = useState('Most Recent')
  const [comments, setComments] = useState(comment.replies)

  console.log('comment', comment)


  useEffect(() => {
    setComments(comment.replies)
    handleSorting()
    // eslint-disable-next-line
  }, [sortType, post])

  const handleSorting = () => {
    if (sortType === 'Most Recent') {
      setComments([...comment.replies].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }));
    }
    if (sortType === 'Oldest') {
      setComments([...comment.replies].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }));
    }
  }

  const handleShowAll = () => {
    setShowingAll(!showingAll)
  }

  return (
    <div className="comments-section">
      {
        showingAll &&
        <div className='comment-filter'>
          <FilterMenu setSortType={setSortType} />
        </div>
      }
      <ul className='comments-list'>
        {
          !showingAll
            ?
            (comments.length >= 1 && <CommentReplyItem comment={comments[0]} />)
            :
            (
              comments.length > 0 &&
              (comments.map((comment, index) => (
                <CommentReplyItem
                  comment={comment}
                  key={index}
                />
              )))
            )
        }
      </ul>
      {
        comments.length > 1 &&
        <p className='comments-show-all' onClick={handleShowAll}>
          {
            !showingAll
              ?
              `Show All Comments (${comments.length})`
              :
              'Hide Comments'
          }
        </p>
      }
    </div>
  )
}

export default Replies