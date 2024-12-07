import React from 'react'
import { PropsWithChildren } from "react";
import {  useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props: PropsWithChildren) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
