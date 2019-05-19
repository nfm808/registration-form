import React, { Component } from 'react'
import ValidationError from '../ValidationError/ValidationError'

// This is an example of a controlled component where
// the input values are in React state so we can access
// these values to perform validation etc
// Follows following process:
// 1. User types in the input
// 2. onChange event triggered
// 3. onChange listener takes the value 
//    (event.target.value) and updates state
//    (this.setState({value: event.target.value}))
// 4. Re-render is triggered by the state update,
//    component is rendered with the value from the 
//    state
class RegistrationFormControlled extends Component {
  constructor(props) {
    super(props);

    // setting up places in state to store input 
    // values as well as store values for form
    // validation logic and validation messages
    this.state = {
      name: '',
      password: '',
      repeatPassword: '',
      nameValid: false,
      passwordValid: false,
      passwordMatch: false,
      formValid: false,
      validationMessages: {
        name: '',
        password: '',
        repeatPassword: ''
      }
    }
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const { name, password, repeatPassword } = this.state;
    console.log('Name: ', name);
    console.log('Password: ', password);
    console.log('repeatPassword: ', repeatPassword);
  }
  // These set the state based onChange listener
  // also calss the validate method after setting
  // the state
  updateName(name) {
    this.setState({ name }, () => {this.validateName(name)});
  }

  updatePassword(password) {
    this.setState({ password }, () => {this.validatePassword(password)});
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword }, () => {this.validatePasswordMatch(repeatPassword)});
  }

  // compares the various validation statuss of the 
  // fields to make a decision about the form as a 
  // whole
  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.passwordValid && this.state.passwordMatch
    });
  }

  // This method will update the state with details
  // of the name such as validation messages if any
  // validation rule is broken.
  validateName(fieldValue) {

    // starts by getting the existing values 
    // from the state
    const fieldErrors = {...this.state.validationMessages}
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
      
      // after running through the test functions we
      // set the state to the fieldErrors set and 
      // then call the formValid()
      this.setState({
        validationMessages: fieldErrors,
        nameValid: !hasError
      }, this.formValid );
    }
  }

  validatePassword(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.password = 'Password is required';
      hasError = true;
    } else {
      if (fieldValue.length < 6 || fieldValue.length > 72) {
        fieldErrors.password = 'Password must be between 6 and 72 characters long';
        hasError = true;
      } else {
        if(!fieldValue.match(new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))) {
          fieldErrors.password = 'Password must contain at least one number and one letter';
          hasError = true;
        } else {
          fieldErrors.password = '';
          hasError = false;
        }
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      passwordValid: !hasError
    }, this.formValid );

  }

  validatePasswordMatch(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false; 

    fieldValue = fieldValue.trim();
    if (fieldValue !== this.state.password) {
      fieldErrors.repeatPassword = 'Passwords do not match';
      hasError = true;
    } else {
      fieldErrors.repeatPassword = '';
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      passwordMatch: !hasError
    }, this.formValid);
  }

  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Register</h2>
        <div className="registration__hint">* required field</div>  
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" className="registration__control"
            name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
          <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input type="password" className="registration__control"
            name="password" id="password" onChange={e => this.updatePassword(e.target.value)}/>
            <ValidationError hasError={!this.state.passwordValid} message={this.state.validationMessages.password} />
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password *</label>
          <input type="password" className="registration__control"
            name="repeatPassword" id="repeatPassword" onChange={e => this.updateRepeatPassword(e.target.value)}/>
          <ValidationError hasError={!this.state.repeatPasswordValid} message={this.state.validationMessages.repeatPassword} />
        </div>
        <div className="registration__hint">6 to 72 characters, must include a number</div>
        <div className="registration__button__group">
          <button type="reset" className="registration__button">
              Cancel
          </button>
          
          {/* can have the save/ submit button disabled based on the 
          validate form function */}

          <button type="submit" className="registration__button" disabled={!this.state.formValid}>
              Save
          </button>
        </div>
      </form> 
    )
  }
}

export default RegistrationFormControlled
