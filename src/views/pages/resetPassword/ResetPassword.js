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
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  // ToDo: Show error message in toast message
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [showSuccessToast, setSuccessToast] = useState(false);
  // ToDo: Show error message in toast message
  const [showSuccessMessage, setSuccessMessage] = useState("");
  const auth = new AuthService();

  const onSubmit = (event) => {
    event.preventDefault();
    const password = userPassword;
    const confirmPassword = userConfirmPassword;

    if (password) {
      auth.resetPassword(password, confirmPassword, id).then((result) => {
        console.log("result", result);
        if (!result.success) {
        //   console.log("result", result);
          if(result.msg != undefined)
         { setForgotPasswordError(result.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);}
          else{
            setForgotPasswordError(result.errors[0].msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
          }
          return;
        }
   
        history.push({  
          pathname: '/login',
          state: true
          })
        
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
                    <h1>Reset Password</h1>
                    <p className="text-muted">Enter your new password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        value={userConfirmPassword}
                        onChange={(e) => setUserConfirmPassword(e.target.value)}
                        placeholder="confirm password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          onClick={onSubmit}
                          color="primary"
                          className="px-4"
                        >
                          Submit
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
                    {forgotPasswordError}
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
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
