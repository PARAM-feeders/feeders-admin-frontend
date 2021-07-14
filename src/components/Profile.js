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
      <h2>{userMetadata?.name}</h2>
        <p>{userMetadata?.email}</p>
        {/* <img src={user.picture} alt={user.name}  class="rounded-circle mb-4"/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}

      </div>
    )
  );
};

export default Profile;
