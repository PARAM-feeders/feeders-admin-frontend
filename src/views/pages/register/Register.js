import AuthService from "../../../utils/AuthService";
import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showError, setShowError] = useState(false);
  // ToDo: Show error message in toast message
  const [registerError, setRegisterError] = useState([]);

  const auth = new AuthService();

  const onSignupSubmit = (event) => {
    event.preventDefault();
    const name = userName;
    const email = userEmail;
    const password = userPassword;
    if (name && email && password) {
      auth.signup(name, email, password).then((result) => {
        if (!result.token) {
          console.log(result)
          setShowError(true)
          setRegisterError(result.errors);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
          return;
        }
        auth.finishAuthentication(result.token);
        history.push("/home");
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      // ToDo: Match both passwords before submitting
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup> */}
                  <CButton color="primary" block onClick={onSignupSubmit} className="create-acc-btn">
                    Create Account
                  </CButton>
                  <Link to="/login">
                    <p className="mt-2 text-center">
                      Already have an account!
                    </p>
                  </Link>
                </CForm>
              </CCardBody>

            </CCard>
            <CToaster
              position={"top-right"}
            >
              <CToast
                color="danger"
                show={showError}
                autohide={4000}
                fade={true}
              >
                <CToastHeader closeButton={true}>
                  Oops!!
                </CToastHeader>
                <CToastBody>
                  {registerError && registerError.map(e => { return (<div>{e.msg}<br /></div>) })}
                </CToastBody>
              </CToast>
            </CToaster>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
