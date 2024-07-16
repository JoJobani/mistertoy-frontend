import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadUsers } from '../store/actions/user.actions'
import { reviewService } from '../services/review.service'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export function ReviewExplore() {
  const users = useSelector((storeState) => storeState.userModule.users)
  const loggedInUser = useSelector((storeState) => storeState.userModule.loggedinUser)
  const [reviews, setReviews] = useState([])
  const [filterBy, setFilterBy] = useState({ aboutToyId: '', byUserId: '' })

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    loadReviews()
  }, [filterBy])

  async function loadReviews() {
    try {
      const reviews = await reviewService.query(filterBy)
      setReviews(reviews)
    } catch (err) {
      console.log('err loading the reviews:', err)
    }
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setFilterBy((prevFilter) => ({ ...prevFilter, [name]: value }))
  }

  async function onRemove(reviewId) {
    try {
      await reviewService.remove(reviewId)
      setReviews(prev => prev.filter(r => r._id !== reviewId))
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    if (!loggedInUser) return false
    return review.byUser._id === loggedInUser._id || loggedInUser.isAdmin
  }

  return (
    <div className='review-explore'>
      <h1>Reviews index</h1>

      {users && loggedInUser && (
        <form >
          <select
            onChange={handleChange}
            value={filterBy.byUserId}
            name='byUserId'>
            <option value=''>Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </form>
      )}
      {!!reviews.length && (
        <ul className='review-list'>
          {reviews.map((review) => (
            <li key={review._id}>
              <p>{review.txt}</p>
              <p>Toy:
                <Link to={`/toy/${review.aboutToy._id}`}>
                  {review.aboutToy.name}
                </Link></p>
              <p>{review.byUser.fullname}</p>
              {canRemove(review) &&
                <IconButton
                  size="small"
                  onClick={() => onRemove(review._id)}>
                  <DeleteIcon />
                </IconButton>}
            </li>
          ))}
        </ul>
      )}
      {!reviews.length && <section>no reviews to show</section>}
      <hr />
    </div>
  )
}
