import React, { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { colors } from '../../styles/theme'

export const Loader = () => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return <ClipLoader size={100} color={colors.pink} loading={loading} />
}
