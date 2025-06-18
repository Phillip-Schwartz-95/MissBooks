export function RateByStars({ val, onSelect }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map(num => (
        <span
          key={num}
          onClick={() => onSelect(num)}
          style={{ cursor: 'pointer', color: num <= val ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}
