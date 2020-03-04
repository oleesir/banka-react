import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';



const Profile = () => {
  const authContext = useContext(AuthContext);
 
  useEffect(()=> {
    authContext.loadUser();
        // eslint-disable-next-line
  },[]);

  return (
    <h1>PROFILE PAGE</h1>
  )
}
export default Profile;