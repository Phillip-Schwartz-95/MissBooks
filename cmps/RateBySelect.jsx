export function RateBySelect({ val, onSelect }) {
  return (
    <select value={val} onChange={(ev) => onSelect(+ev.target.value)}>
      {[1, 2, 3, 4, 5].map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
  )
}
