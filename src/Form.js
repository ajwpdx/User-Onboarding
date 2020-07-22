import React from 'react';


export default function Form(props) {
    
    const { values, updateForm, submitForm } = props

    const onChange = evt => { 
    const name = evt.target.name
    const value = evt.target.value
    updateForm(name, value)
  }

    const onSubmit = evt => {
       evt.preventDefault()
       submitForm()
      }

    return(
        <form onSubmit={onSubmit}>
            <h2>Sign Up</h2>
            <div className='form-inputs'>
            <label htmlFor='nameInput'>Name:&nbsp;
                <input
                id = 'nameInput'
                name = 'name'
                type = 'text'
                placeholder= 'Enter name'
                value=''
                onChange='{onChange}'
                />
            </label>
            <label htmlFor='emailInput'>Email:&nbsp;
                <input
                id = 'emailInput'
                name = 'email'
                type = 'text'
                placeholder= 'Enter email'
                value=''
                onChange='{onChange}'
                />
            </label>
            <label htmlFor='passwordInput'>Password:&nbsp;
                <input
                id = 'passwordInput'
                name = 'password'
                type = 'text'
                placeholder= 'Enter password'
                value=''
                onChange='{onChange}'
                />
            </label>
            <label>
          <input
            type='checkbox'
            name='terms'
            // checked={values.hobbies.hiking === true}
            // onChange={onCheckboxChange}
          />Terms of Service
        </label>
            </div>
            <button>Submit</button>    

        </form>
    )
    
}