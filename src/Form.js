import React from 'react';


export default function Form(props) {

  const { 
    values,
    submitForm,
    inputChange,
    checkboxChange,
    disabled,
    formErrors
  } = props

  //prevents the default action (re-render) and invokes the submitForm callback function (in App)
  const onSubmit = evt => {
    evt.preventDefault()
    submitForm()
  }

  // invokes the inputChange callback function (in App) taking inputs as arguments
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    inputChange(name, value)
  }

  // invokes the checkboxChange callback function (in App) taking input as arguments
  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
  }

  //JSX 
  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <div className='form-inputs'>
        <label htmlFor='nameInput'>Name:&nbsp;
                <input
            id='nameInput'
            name='name'
            type='text'
            placeholder='Enter name'
            value={values.name}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor='emailInput'>Email:&nbsp;
                <input
            id='emailInput'
            name='email'
            type='text'
            placeholder='Enter email'
            value={values.email}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor='passwordInput'>Password:&nbsp;
                <input
            id='passwordInput'
            name='password'
            type='password'
            placeholder='Enter password'
            value={values.password}
            onChange={onInputChange}
          />
        </label>
        <label>
          <input
            type='checkbox'
            name='terms'
            checked={values.terms === true}
           onChange={onCheckboxChange}
          />Terms of Service
        </label>
      </div>
      <button className='submit-btn' disabled={disabled}>Submit</button>

{/* validation errors */}
      <div className='errors'>
          <div>{formErrors.name}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.form}</div>
        </div>
    </form>
  )

}