import React from 'react'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function Callback() {
  const { hash } = useLocation();
  const { login, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/login");
      return;
    }

    const searchParams = new URLSearchParams(hash.replace("#", ""));
    const accessToken = searchParams.get("access_token") as string;
    const idToken = searchParams.get("id_token") as string;
    const state = searchParams.get("state") as string;

    if (!accessToken || !idToken || !state) {
      navigate("/login");
      return
    }

    login(accessToken, idToken, state);
  }, [hash, login, auth, navigate]);

  return <div>Loading...</div>;
}
