import React, { useState }  from "react";
// import {Panel, Col} from 'react-bootstrap'
import jwtDecode from 'jwt-decode'
import AuthService from "../../../utils/AuthService";


const Profile = () => {

  const auth = new AuthService();
  const [profile, setProfile] = useState(jwtDecode(auth.getToken()));
  const [payload, setPayload] = useState(jwtDecode(auth.getToken()));

  
  return (<div>
    <h2>Profile</h2>
    {/* <Panel>
      <Col sm={3}>
        <img src={profile.gravatar} alt="Avatar" />
      </Col>
      <Col sm={9}>
        <h2>{profile.username}</h2>
        <hr />
        <p><i className="glyphicon glyphicon-envelope"></i> {profile.email}</p>
        <h4>Payload</h4>
        <pre>{JSON.stringify(payload, null, 2)}</pre>
      </Col>
    </Panel> */}
  </div>);
};

export default Profile;
