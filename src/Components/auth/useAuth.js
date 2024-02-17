// /src/hooks/useAuth.tsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { getSessionCookie, setSessionCookie, dropCookie } from "./sessions";
import domainName from "../../domain";

// Create the context
const AuthContext = createContext(null);
const domain = domainName;
export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  // Store new value to indicate the call has not finished. Default to true

  // Runs once when the component first mounts
  useEffect(() => {
    fetch(`${domain}/@me`, {
      method: "GET",
      headers: {
        "x-access-token": getSessionCookie().token,
        "ngrok-skip-browser-warning": "skip",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else return false;
      })
      .then((activeUser) => {
        if (activeUser) {
          setAuthed(true);
          return true;
        } else {
          setAuthed(false);
          return false;
        }
      });
  }, []);

  const login = async (email, password) => {
    return fetch(`${domain}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          throw new Error(`error - ${data.error}`);
        } else {
          console.log("logged in");
          setSessionCookie(JSON.stringify(data));
          setAuthed(true);
          return Promise.resolve();
        }
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };

  const logout = () => {
    dropCookie();
    console.log("The User has logged out");
    setAuthed(false);
  };

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider value={{ authed, setAuthed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext);
