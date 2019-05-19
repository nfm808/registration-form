import React, { Component } from 'react'
import './App.css'
import RegistrationFormControlled from './RegistrationForm/RegistrationFormControlled';

class App extends Component {
  render() {
    return (
      <section className='App'>
        <RegistrationFormControlled />
      </section>
    )
  }
}

export default App

