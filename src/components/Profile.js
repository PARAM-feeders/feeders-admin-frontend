import { useAuth0 } from "@auth0/auth0-react";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();

  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const accessTokenUserApi = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        // isAdmin() {
        console.log("accessTokenUserApi", user, jwtDecode(accessTokenUserApi));
        //   return jwtDecode(this.getToken()).role === "admin";
        // }

        // const accessTokenAppProtectedApi = await getAccessTokenSilently({
        //   audience: "node-api",
        // });

        // eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhpZ1RBMEdxSEd6dUp5M3Zib3JRUSJ9.eyJpc3MiOiJodHRwczovL3JhLW5vZGUtYXBpLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MGMyOGQxMzYxMmQ4MjAwNzBhNTllNDQiLCJhdWQiOlsibm9kZS1hcGkiLCJodHRwczovL3JhLW5vZGUtYXBpLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MjM0MDg2NzMsImV4cCI6MTYyMzQ5NTA3MywiYXpwIjoiS1I5UmlVc1ZUdkFad0kzSDVwVGdiTURSRUNqQ3RHejEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIGFwaTphZG1pbiIsInBlcm1pc3Npb25zIjpbImFwaTphZG1pbiJdfQ.uriKDJBPfnvbqmJNtDZ_QC6udV2kyunc28tvdgSaBLAM5xvOlgs-f_qzV-_HYJn9VV24qNe4cYNLyjAi4oc0zqc6mqZXlfDrzIys0qsBG9bzaZmULzbjqT2N1uvmA1LVb0I-HT4_rW41rOp-gtIii3BHVf646fP28qe90B_XjzTnp6v9rETvKFSeGE1zruJT9qanZMAixX7JMt4aV1ZT1oOJGFx4DoTYmmiRL6MOpZkXFu4iBzknQ0kHmG3Z499Lg_xl2RZLaOaRKKJyVXY1HZT4s_L0G-qUSm82ptfnKcYvpzPGLHL_dsuLAtqUBCOmllbTj6aUuDZhJK4CkLmJlA
        // console.log("accessTokenAppProtectedApi",jwtDecode(accessTokenAppProtectedApi));
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        // const apiProtectedUrl = `${apiUrl}/protected`;
        // const apiMoreProtectedUrl = `${apiUrl}/moreprotected`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessTokenUserApi}`,
          },
        });

        // const apiProtectedResponse = await fetch(apiProtectedUrl, {
        //   headers: {
        //     Authorization: `Bearer ${accessTokenAppProtectedApi}`,
        //   },
        // });

        // const apiMoreProtectedResponse = await fetch(apiMoreProtectedUrl, {
        //   headers: {
        //     Authorization: `Bearer ${accessTokenAppProtectedApi}`,
        //   },
        // });

        const { user_metadata } = await metadataResponse.json();
        // const protectedApi = await apiProtectedResponse.json();
        // const moreProtectedApi = await apiMoreProtectedResponse.json();

        console.log("user_metadata: ", user_metadata);
        // console.log("protectedApi: ", protectedApi);
        // console.log("moreProtectedApi", moreProtectedApi);
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}

      </div>
    )
  );
};

export default Profile;
