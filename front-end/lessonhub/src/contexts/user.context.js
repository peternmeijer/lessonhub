/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import { createContext, useState } from "react";
import axios from 'axios';

 
// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 
 // Function to log in user into our app using their username & password
 const emailPasswordLogin = async (username, password) => {

  //create payload for backend
   let payload = {
    username: username,
    password: password
   }

   //send request to backend
   let res = await axios.post("http://www.lessonhub.tk:5002/api/user/login", payload, { withCredentials: true })
   
   const user = res.data.user
   
   localStorage.setItem('user', JSON.stringify(user))
   setUser(user)

   return user;
 };
 

 // Function to fetch the user (if the user is already logged in) from local storage
 const fetchUser = async () => {
   const loggedInUser = localStorage.getItem('user')
   
   if (!loggedInUser)
   {
      return false
   }
   else
   {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      return user
   }
   
 }

 
 
 // Function to logout user from our App Services app
 const logOutUser = async () => {
   
   try {
    let payload = {
     }
  
     let res = await axios.post("http://www.lessonhub.tk:5002/api/user/logout", payload)

     console.log(res)
     //remove user frmo local storage
     localStorage.removeItem('user');
     // Setting the user to null once loggedOut.
     setUser(null);

     return true;
   } catch (error) {
     throw error
   }
 }
 
 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, logOutUser }}>
   {children}
 </UserContext.Provider>;
}