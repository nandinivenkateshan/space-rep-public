import { useState } from 'react'

function useForm (callback) {
  const [values, setValues] = useState({})

  const handleSubmit = e => {
    if (e) e.preventDefault()
    callback()
  }

  const handleChange = (event) => {
    event.persist()
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm
