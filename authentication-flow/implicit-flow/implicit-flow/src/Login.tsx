import React from 'react'
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { makeLoginUrl } from "./utils";
import { useAuth } from "./AuthProvider";

export function Login() {
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) {
      window.location.href = makeLoginUrl();
    }
  }, [auth]);

  return auth ? <Navigate to="/admin" /> : <div>Loading...</div>;
}
