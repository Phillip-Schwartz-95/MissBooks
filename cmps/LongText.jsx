const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    if (!txt) return null

    const displayedTxt = isExpanded ? txt : txt.slice(0, length)

    return (
        <p>
            {displayedTxt}
            {txt.length > length && (
                <span>
                    {isExpanded ? '... ' : '... '}
                    <button onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                </span>
            )}
        </p>
    )
}
