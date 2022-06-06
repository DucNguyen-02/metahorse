import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface CountDownTimeProps {
  time?: string
}

function CountDownTime({ time }: CountDownTimeProps) {
  const [firstTime, setFirstTime] = useState(0)

  // get time when access first room horse
  useEffect(() => {
    if (time && parseInt(time) > 0) {
      const start_at = parseInt(time)
      setFirstTime(start_at)
    }
  }, [time])

  // time waiting
  const timer = () => setFirstTime(firstTime - 1000)
  useEffect(() => {
    if (firstTime <= 0) {
      return
    }
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [firstTime])

  return <div>{dayjs(firstTime).format('HH:mm:ss')}</div>
}

export default CountDownTime
