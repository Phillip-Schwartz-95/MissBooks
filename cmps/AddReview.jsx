import { BookRating } from './BookRating.jsx'
const { useState } = React

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState({
        fullname: '',
        readAt: ''
    })
    const [rateType, setRateType] = useState('stars')
    const [rating, setRating] = useState(1)

    function handleChange(ev) {
        const { name, value } = ev.target
        setReview(prev => ({ ...prev, [name]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (!review.fullname || !review.readAt) {
            alert('Please fill all fields')
            return
        }
        onAddReview({ ...review, rating })
        setReview({ fullname: '', readAt: '' })
        setRating(1)
        setRateType('stars')
    }

    return (
        <form onSubmit={onSubmit} className="add-review">
            <BookRating
                rateType={rateType}
                setRateType={setRateType}
                rating={rating}
                setRating={setRating}
            />

            <label>
                Full Name:
                <input
                    type="text"
                    name="fullname"
                    value={review.fullname}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Read At:
                <input
                    type="date"
                    name="readAt"
                    value={review.readAt}
                    onChange={handleChange}
                    required
                />
            </label>

            <button>Add Review</button>
        </form>
    )
}
