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

//REMOVE THIS//
const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: inititalUserList })
}
const fakeAxiosPost = (url, { name, email, role }) => {
  const newMember = { name, email, role }
  return Promise.resolve({ status: 200, success: true, data: newMember })
}

function App() {

  /////////////  STATES  ////////////////
  const [users, setUsers] = useState(inititalUserList)
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

  //function that will POST a user when a user is submitted in the form.
  const postUsers = newUser => {
      axios.post('https://reqres.in/api/users')
      .then(res => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
        console.log(users)
      })
      .catch(err => {
        console.log('error')
      })
  }

  //Setting up form validation with Yup
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

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      hobbies: {
        ...formValues.hobbies,
        [name]: isChecked,
      }
    })
  }

  const updateForm = (inputName, inputValue) => {
    const updatedFormValues = { ...formValues, [inputName]: inputValue }
    setFormValues(updatedFormValues)
  }

  const submitForm = () => {
    const newTeamMember = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    }
    if (!newTeamMember.name || !newTeamMember.email || !newTeamMember.role) return

   

    fakeAxiosPost('fakeapi.com', newTeamMember)
      .then(res => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
      })

  }

  useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setUsers(res.data))
  }, [])
 



  //JSX
  return (
    <div className="App">
      <Form
        values={formValues}
        updateForm={updateForm}
        submitForm={submitForm}
        // {...users.map(member => {
        //   return (
        //     <Users key={member.email} details={member} />
        //   )
        // })
        // }
      />
    </div>
  );
}



export default App;
