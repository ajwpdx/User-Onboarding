import React from 'react';


export default function Form(props) {
    
    const { values, update, submit } = props

    const onChange = evt => { 
    const name = evt.target.name
    const value = evt.target.value
    update(name, value)
  }

    const onSubmit = evt => {
       evt.preventDefault()
       submit()
      }

    return(
        <form onSubmit={onSubmit}>
            <h2>Add a Team Member</h2>
            <div className='form-inputs'>
            <label htmlFor='nameInput'>Name:&nbsp;
                <input
                id = 'nameInput'
                name = 'name'
                type = 'text'
                placeholder= 'Enter name'
                value='{values.name}'
                onChange='{onChange}'
                />
            </label>
            <label htmlFor='emailInput'>Email:&nbsp;
                <input
                id = 'emailInput'
                name = 'email'
                type = 'text'
                placeholder= 'Enter email'
                value='{values.email}'
                onChange='{onChange}'
                />
            </label>
            <label>Role:&nbsp;
            <select name='role' value='{values.role}' onChange='{onChange}'>
              <option value=''>Select a role</option>
              <option value='Skateboarder'>Skateboarder</option>
              <option value='Surfer'>Surfer</option>
              <option value='Snowboarder'>Snowboarder</option>
            </select>
        </label>
            </div>
            <button>Submit</button>    

        </form>
    )
    
}