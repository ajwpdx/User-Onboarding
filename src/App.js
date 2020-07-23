import React, { useState, useEffect } from 'react';
import Users from './Users'
import Form from './Form'
import formSchema from './validation/formSchema'
import './App.css';
import axios from 'axios';
import * as yup from 'yup'

const userList = []

//setting up default form values so that fields are empty
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

//REMOVE THIS//
const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: userList })
}
const fakeAxiosPost = (url, { name, email, role }) => {
  const newMember = { name, email, role }
  return Promise.resolve({ status: 200, success: true, data: newMember })
}


function App() {
  const [team, setTeam] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  useEffect(() => {
    axios.get('https://reqres.in/api/users')
    .then(res => {
      console.log(res.data.data)
      })
    .catch(err => {
      console.log('error')
    })
  }, [])

  useEffect(() => {
    axios.post('https://reqres.in/api/users')
    .then(res => {
      console.log(res.data)
      setTeam(res.data)
      console.log(team)
    })
    .catch(err => {
      console.log('error')
    })
  }, [])


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
        setTeam([res.data, ...team])
        setFormValues(initialFormValues)
      })

  }

  useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setTeam(res.data))
  }, [])



  //JSX
  return (
    <div className="App">
      <Form
        values={formValues}
        updateForm={updateForm}
        submitForm={submitForm}
        // {...team.map(member => {
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
