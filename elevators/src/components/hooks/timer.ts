import { useState, useRef } from 'react';

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 0.1)
    }, 100)
  }

  const handlePause = () => {
    if (countRef.current) {
      clearInterval(countRef.current)
      setIsPaused(false)
    }
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    if (countRef.current) {
      clearInterval(countRef.current)
      setIsActive(false)
      setIsPaused(false)
      setTimer(0)
    }
  }

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset }
}

export default useTimer