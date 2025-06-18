export function RateByTextbox({ val, onSelect }) {
  return (
    <input
      type="number"
      min="1"
      max="5"
      value={val}
      onChange={(ev) => onSelect(+ev.target.value)}
    />
  )
}
