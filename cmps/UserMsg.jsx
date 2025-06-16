const { useState, useEffect } = React
import { eventBusService } from '../services/eventbus-service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const currMsg = eventBusService.getMsg()
      if (currMsg) setMsg(currMsg)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  if (!msg) return null

  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.txt}
    </section>
  )
}
