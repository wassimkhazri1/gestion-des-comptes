import React, { useState, useRef } from "react";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './login.css';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth/auth.service";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function SignUp() {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtenez le fichier sélectionné
    setPhoto(file); // Stockez le fichier
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, photo).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Sign up</h3>
            <Form onSubmit={handleRegister} ref={form} encType="multipart/form-data">
              {!successful && (
                <div>
                  <div className="form-group">
                    <MDBInput
                      wrapperClass='mb-4 mx-5 w-100'
                      label='User name'
                      id='formControlLg'
                      size="lg"
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      wrapperClass='mb-4 mx-5 w-100'
                      label='Email'
                      id='formControlLg'
                      size="lg"
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>
                  <div className="form-group">
                    <MDBInput
                      wrapperClass='mb-4 mx-5 w-100'
                      label='Password'
                      id='formControlLg'
                      size="lg"
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                    <MDBInput
                      wrapperClass='mb-4 mx-5 w-100'
                      label='Photo'
                      id='formControlLg'
                      size="lg"
                      type="file"
                      className="form-control"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="form-group">
                    <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Sign Up</MDBBtn>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>
        </MDBCol>
        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" alt="Login portrait" className="w-100" style={{ height: '65%', objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;
