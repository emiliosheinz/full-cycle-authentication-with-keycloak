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
    response_type: "token id_token code",
    nonce: nonce,
    state: state,
  });

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: "fullcycle-client",
    grant_type: "authorization_code",
    code: code,
    redirect_uri: "http://localhost:3000/callback",
    nonce: Cookies.get("nonce") as string,
  });

  return fetch(
    "http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenUrlParams.toString(),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return login(res.access_token, res.id_token, res.refresh_token);
    });
}

export function login(accessToken: string, idToken?: string, refreshToken?: string, state?: string) {
  const stateCookie = Cookies.get("state");

  if (state && stateCookie !== state) {
    throw new Error("Invalid state");
  }

  try {
    const decodedAccessToken = decodeJwt(accessToken);
    const decodedIdToken = idToken ? decodeJwt(idToken) : null;
    const decodedRefreshToken = refreshToken ? decodeJwt(refreshToken) : null

    if (decodedAccessToken?.nonce !== Cookies.get("nonce")) {
      throw new Error("Invalid nonce");
    }

    if (idToken && decodedIdToken?.nonce !== Cookies.get("nonce")) {
      throw new Error("Invalid nonce");
    }

    if(refreshToken && decodedRefreshToken?.nonce !== Cookies.get("nonce")) {
      throw new Error("Invalid nonce")
    }

    Cookies.set("access_token", accessToken);

    if(idToken) {
      Cookies.set("id_token", idToken);
    }

    if(refreshToken) {
      Cookies.set("refresh_token", refreshToken);
    }

    return decodedAccessToken;
  } catch (e) {
    console.log(e)
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
  Cookies.remove("refresh_token")

  return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`;
}
