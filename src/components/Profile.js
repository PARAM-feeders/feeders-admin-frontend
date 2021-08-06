import React, { useEffect, useState } from "react";
import AuthService from "../utils/AuthService";
import { CSpinner } from "@coreui/react";
const Profile = () => {

  const [loading, setLoading] = useState(true);
  const [userMetadata, setUserMetadata] = useState(null);
  const auth = new AuthService();
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
      const user = await auth.getUserDetails();
      // console.log( user)
      setLoading(false);
      setUserMetadata(user);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };

    getUserMetadata();
  }, []);



  // console.log(user);
  return (
    loading ? <div className="text-center w-100 h50 d-flex align-items-center justify-content-center"><CSpinner /> </div>:
      
    userMetadata && (
      <div id="profile" className="d-flex flex-column justify-content-center align-items-center">
        <img src={userMetadata?.picture} alt={userMetadata.name}  className="rounded-circle mb-4"/>
        <h2>{userMetadata?.name}</h2>
        <p>{userMetadata?.email}</p>
     
      </div>
    )
  );
};

export default Profile;
