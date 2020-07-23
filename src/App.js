import React, { useState, useEffect } from 'react';
import Users from './Users'
import Form from './Form'
import formSchema from './validation/formSchema'
import './App.css';
import axios from 'axios';
import * as yup from 'yup'

/////SETUP/////

//REMOVE THIS
const inititalUserList = [
  {
    name: 'Alex Williams',
    email: 'alexjwilliams1@gmail.com',
    password: 'password',
    terms: true
  }
]

//setting up default form values so that fields are empty
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}
//setting up default error values so that no errors appear
const intitialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

//initializes that submit button as disabled
const intitialDisabled = true

function App() {

  ///// 4 SLICES OF STATE /////
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(intitialFormErrors)
  const [disabled, setDisabled] = useState(intitialDisabled)


  ///// GET User Data from API /////
  useEffect(() => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      setUsers(res.data.data)
      })
    .catch(err => {
      console.log('error')
    })
  }, [])
  
  console.log(users)

  ///// POST a user (when a user is submitted in the form) /////
  const postUsers = newUser => {
      axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
        console.log(users)
      })
      .catch(err => {
        console.log('error')
      })
  }

  //CB function: validates with yup formSchema when there is a change in inputs
  const inputChange = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  //CB function: when happens when the checkbox is changed.
  const checkboxChange = (name, isChecked) => {
    yup
    .reach(formSchema, name)
    .validate(isChecked)
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: true,
      })
    })
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })
  setFormValues({
    ...formValues,
    [name]: isChecked 
  })
  }

  //CB function: what happens with the "Submit button is pushed"
  const submitForm = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      terms: formValues.terms
    }

    postUsers(newUser)
  }

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])

  //JSX
  return (
    <div className="App">
      <Form
        values={formValues}
        submitForm={submitForm}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        disabled={disabled}
        formErrors={formErrors}

      />

    {users.map(usr => {
          return (
            <Users 
            key={usr.email} 
            details={usr} />
          )
        })
        }    
    </div>
  );
}



export default App;
