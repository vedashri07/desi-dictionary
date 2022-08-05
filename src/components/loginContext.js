import React, { useState ,useContext ,useEffect  } from 'react';
export const UserContext = React.createContext('');
const LoginContext = ({ subPages }) => {

    const [user, setUser] = useState('');

    useEffect(() => {
        if(localStorage.getItem('user')) {
            var userdata = JSON.parse(localStorage.getItem('user'));   
            console.log(userdata)    
               setUser(userdata);
        }
      },[]);
      
  
    return (
        <UserContext.Provider value={[user, setUser]}>
            {subPages}
        </UserContext.Provider>
    )
}
export default LoginContext;