import React from 'react'
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export function Logout() {
  const { makeLogoutUrl } = useAuth();

  useEffect(() => {
    const logoutUrl = makeLogoutUrl();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  }, [makeLogoutUrl]);

  return <div>Loading...</div>;
}
