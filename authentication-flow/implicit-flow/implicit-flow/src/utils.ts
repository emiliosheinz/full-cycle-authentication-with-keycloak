import Cookies from "js-cookie";
import { decodeJwt } from "jose";

export function makeLoginUrl() {
  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);

  Cookies.set("nonce", nonce);
  Cookies.set("state", state);

  const loginUrlParams = new URLSearchParams({
    client_id: "fullcycle-client",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "token id_token",
    nonce: nonce,
    state: state,
  });

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export function login(accessToken: string, idToken: string, state: string) {
  const stateCookie = Cookies.get("state");

  if (stateCookie !== state) {
    throw new Error("Invalid state");
  }

  try {
    const decodedAccessToken = decodeJwt(accessToken);
    const decodedIdToken = decodeJwt(idToken);

    if (decodedAccessToken?.nonce !== Cookies.get("nonce")) {
      throw new Error("Invalid nonce");
    }

    if (decodedIdToken?.nonce !== Cookies.get("nonce")) {
      throw new Error("Invalid nonce");
    }

    Cookies.set("access_token", accessToken);
    Cookies.set("id_token", idToken);

    return decodedAccessToken;
  } catch (e) {
    throw new Error("Invalid token");
  }
}

export function getAuth() {
  const token = Cookies.get("access_token");

  if (!token) {
    return null;
  }

  try {
    return decodeJwt(token);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function makeLogoutUrl() {
  if (!Cookies.get("id_token")) {
    return '';
  }

  const logoutParams = new URLSearchParams({
    client_id: "fullcycle-client",
    id_token_hint: Cookies.get("id_token") as string,
    post_logout_redirect_uri: "http://localhost:3000/login",
  });

  Cookies.remove("access_token");
  Cookies.remove("id_token");
  Cookies.remove("nonce");
  Cookies.remove("state");

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`;
}
