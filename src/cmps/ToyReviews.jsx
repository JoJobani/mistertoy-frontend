import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"
import { reviewService } from "../services/review.service.js"

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export function ToyReviews({ toy }) {
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadReviews()
    }, [])

    async function loadReviews() {
        try {
            const reviews = await reviewService.query({ aboutToyId: toy._id })
            setReviews(reviews)
        } catch (err) {
            console.log('Had issues loading reviews', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: toy._id })
            setReviews(prevReviews => [savedReview, ...prevReviews]);
            setReview(utilService.getEmptyReview())
            showSuccessMsg('Review saved!')
        } catch (err) {
            console.log('error saving the review :', err)
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prev => prev.filter(review => review._id !== reviewId))
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    return (
        <section className="toy-texts">
            <h2>Reviews:</h2>
            {user &&
                <form onSubmit={onSaveReview}>
                    <input
                        type="text"
                        onChange={handleReviewChange}
                        name="txt"
                        value={review.txt}
                        placeholder="Type review..."
                        required
                    />
                </form>
            }
            <ul>
                {!!reviews.length && reviews.map((review) => (
                    <li key={review._id}>
                        {review.byUser.fullname} - {review.txt}
                        {user &&
                            (user.isAdmin || user._id === review.byUser._id) &&
                            <IconButton
                                size="small"
                                onClick={() => onRemoveReview(msg.id)}>
                                <DeleteIcon />
                            </IconButton>}
                    </li>
                ))}
            </ul>
        </section>
    )

}