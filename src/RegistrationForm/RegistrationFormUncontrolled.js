import React, { Component } from 'react'


// This is an example of an uncontrolled component
// form.  The state is held inside of the DOM and
// not within React.  This limits the ability to 
// do real time validation as well as conditionally
// block the submit button until the form is in a 
// valid state.
class RegistrationFormUncontrolled extends Component {
  constructor(props) {
    super(props);
    // creates an instance of reference in React
    // using one for each input in conjunction with
    // the ref={} tag allows react to keep track of 
    // inputs
    this.nameInput = React.createRef();
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    console.log('Name: ', name);
  }
  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Register</h2>
        <div className="registration__hint">* required field</div>  
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input type="text" className="registration__control"
            // the ref={} will refer to the assigned variable to allow the
            // input to be bound and assigned to a variable
            // to display a default value in React on a form
            // use the defaultValue={} tag
            name="name" id="name" ref={this.nameInput} defaultValue="Frank"/>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input type="password" className="registration__control"
            name="password" id="password"/>
            <div className="registration__hint">6 to 72 characters, must include a number</div>
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password *</label>
          <input type="password" className="registration__control"
            name="repeatPassword" id="repeatPassword"/>
        </div>

        <div className="registration__button__group">
          <button type="reset" className="registration__button">
              Cancel
          </button>
          <button type="submit" className="registration__button">
              Save
          </button>
        </div>
      </form> 
    )
  }
}

export default RegistrationFormUncontrolled
