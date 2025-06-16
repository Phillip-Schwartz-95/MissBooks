const { useState } = React

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })

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
        onAddReview(review)
        setReview({ fullname: '', rating: 1, readAt: '' })
    }

    return (
        <form onSubmit={onSubmit} className="add-review">
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
                Rating:
                <select name="rating" value={review.rating} onChange={handleChange}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{'★'.repeat(n)}</option>
                    ))}
                </select>
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
