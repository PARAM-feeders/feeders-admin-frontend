import React, { useEffect, useState } from "react";
import AuthService from "../utils/AuthService";

const Profile = () => {


  const [userMetadata, setUserMetadata] = useState(null);
  const auth = new AuthService();
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
      const user = await auth.getUserDetails();
      console.log( user)
      setUserMetadata(user);
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetadata();
  }, []);



  // console.log(user);
  return (
    userMetadata && (
      <div id="profile" className="d-flex flex-column justify-content-center align-items-center">
        <img src={userMetadata?.picture} alt={userMetadata.name}  class="rounded-circle mb-4"/>
        <h2>{userMetadata?.name}</h2>
        <p>{userMetadata?.email}</p>
     
      </div>
    )
  );
};

export default Profile;
