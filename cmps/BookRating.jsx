import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

const cmpMap = {
  select: RateBySelect,
  textbox: RateByTextbox,
  stars: RateByStars,
}

export function BookRating() {
  const [rateType, setRateType] = React.useState('stars')
  const [rating, setRating] = React.useState(0)

  const DynamicCmp = cmpMap[rateType]

  return (
    <section className="book-rating">
      <h4>Rate this book</h4>

      <div>
        <label>
          <input
            type="radio"
            value="select"
            checked={rateType === 'select'}
            onChange={() => setRateType('select')}
          /> Select
        </label>
        <label>
          <input
            type="radio"
            value="textbox"
            checked={rateType === 'textbox'}
            onChange={() => setRateType('textbox')}
          /> Textbox
        </label>
        <label>
          <input
            type="radio"
            value="stars"
            checked={rateType === 'stars'}
            onChange={() => setRateType('stars')}
          /> Stars
        </label>
      </div>

      <DynamicCmp val={rating} onSelect={setRating} />
    </section>
  )
}
