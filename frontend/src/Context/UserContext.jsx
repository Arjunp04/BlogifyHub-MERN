import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url.js";

export const UserContext = createContext( {} )

export function UserContextProvider ( { children } ) {
  const [ user, setUser ] = useState( null )

  useEffect( () => {
    getUser()

  }, [] )

  const getUser = async () => {
    try
    {
      const res = await axios.get( URL + "/api/auth/refetch", { withCredentials: true } )
      // console.log(res.data)
      setUser( res.data )

    }
    catch ( err )
    {
      if ( err.response && err.response.status === 404 )
      {
        // Handle 404 error (resource not found)
        console.log( "Resource not found:", err.response.data );
      } else if ( err.response && err.response.status === 401 )
      {
        // Handle 401 error (unauthorized)
        console.log( "Unauthorized:", err.response.data );
      } else
      {
        // Handle other errors
        console.log( "Error fetching user:", err.message );
      }
    }
  }

  return ( <UserContext.Provider value={ { user, setUser } }>
    { children }
  </UserContext.Provider> )
}