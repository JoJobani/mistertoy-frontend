import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"

export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        loadReviews()
    }, [user])

    async function loadReviews() {
        try {
            const reviews = await reviewService.query({ byUserId: user._id })
            setUserReviews(reviews)
        } catch (err) {
            console.log('cannot get reviews :', err)
        }
    }

    return (
        <section className="user-details">
            <h1>hello {user.fullname}</h1>
            {!!userReviews.length && (
                userReviews.map(review => (
                    <li className="review-card" key={review._id}>
                        {`your review:"${review.txt}", was posted in regards to "${review.aboutToy.name}"`}
                    </li>
                ))
            )}

            {!userReviews.length && <span>you havent posted any reviews yet</span>}
        </section>
    )
}