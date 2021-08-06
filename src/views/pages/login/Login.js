import AuthService from "../../../utils/AuthService";
import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect}  from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const loc = useLocation();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showError, setShowError] = useState(false);
  // ToDo: Show error message in toast message
  const [loginError, setLoginError] = useState("");
  const [showSuccessToast, setSuccessToast] = useState(false);
  // ToDo: Show error message in toast message
  const [showSuccessMessage, setSuccessMessage] = useState("");
  const auth = new AuthService();

  useEffect(() => {
    if(loc.state != undefined){
      setSuccessMessage("Password Successfully changed");
     setSuccessToast(true);
     setTimeout(() => {
       setSuccessToast(false);
     }, 3000);
    }
  }, []);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    const email = userName;
    const password = userPassword;
    

    if (email && password) {
      auth.login(email, password).then((result) => {
        if (!result.token) {
          console.log("result", result);
          if(result.msg != undefined)
         { setLoginError(result.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);}
          else{
            setLoginError(result.errors[0].msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
          }
          return;
        }
      
        auth.finishAuthentication(result.token);
        auth.isAdmin() ? history.push("/dashboard") : history.push("/");
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                    <CInputGroup className="mb-4">
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
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={onLoginSubmit}
                          color="primary"
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                      <Link to="/forgot">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CToaster
                position={"top-right"}
              >
                <CToast
                  color="danger"
                  show={showError}
                  autohide={2000}
                  fade={true}
                >
                  <CToastHeader closeButton={true}>
                    Oops!!
                  </CToastHeader>
                  <CToastBody>
                    {loginError}
                  </CToastBody>
                </CToast>
                <CToast
                  color="success"
                  show={showSuccessToast}
                  autohide={2000}
                  fade={true}
                >
                  <CToastHeader closeButton={true}>
                    Yay!!
                  </CToastHeader>
                  <CToastBody>
                    {showSuccessMessage}
                  </CToastBody>
                </CToast>
              </CToaster>
              
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Join Us in spreading love and care. Become a Donor, Donor Recepient or a Volunteer today by signing up here. It won't take more than a minute or two!
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
