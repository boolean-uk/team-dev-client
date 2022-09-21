import React, { useEffect, useState } from 'react'
import CommentItem from './CommentItem'
import FilterMenu from './utils/filterMenu'

const Comments = ({ post }) => {
  const [sortType, setSortType] = useState('Most Recent')
  const [comments, setComments] = useState(post.comments)
  const [showingAll, setShowingAll] = useState(false);

  useEffect(() => {
    setComments(post.comments)
    handleSorting()
  }, [sortType, post])

  const handleSorting = () => {
    if (sortType === 'Most Recent') {
      const sortedComments = [...post.comments]
      setComments(sortedComments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }));
    }
    if (sortType === 'Oldest') {
      const sortedComments = [...post.comments]
      setComments(sortedComments.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }));
    }
  }

  const handleShowAll = () => {
    if (showingAll) {
      setShowingAll(false)
    }
    if (!showingAll) {
      setShowingAll(true)
    }
  }

  return (
    <div className="comments-section">
        {
        showingAll &&
        <div className='comment-filter'>
            <FilterMenu setSortType={setSortType} />
        </div>
        }
        <ul>
            {
            !showingAll 
                ?
            (comments.length >= 1 && <CommentItem comment={comments[0]} />)
                :
            ( 
                comments.length > 0 &&
                (comments.map((comment, index) => (
                    <CommentItem
                        comment={comment}
                        key={index}
                    />
                )))
            )
            }
        </ul>
        {
        comments.length > 1 &&
        <p onClick={handleShowAll}>
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

export default Comments