# Authentication with Keycloak 

Keycloak is an open source identity and access management for modern applications and services based on the OpenID Connect and OAuth 2.0 protocols.

## OAuth 2.0

OAuth 2.0 is an industry-standard protocol for authorization that enables secure delegated access to resources without sharing user credentials. It works by allowing a resource owner (user) to grant a third-party application limited access to their resources on a server, using an access token instead of credentials like a username and password. The process involves four key roles: the **resource owner** (user), **resource server** (API), **client** (application requesting access), and **authorization server** (issues tokens). OAuth 2.0 uses different flows (e.g., authorization code, client credentials) to cater to various use cases, such as web, mobile, and server-to-server communication, ensuring flexibility and enhanced security. Companies like Google, Facebook, and GitHub use OAuth 2.0 in their APIs, for example.

Below is a simple sequence diagram illustrating the OAuth 2.0 flow:

![OAuth 2.0 Flow](./docs/images/oauth2.svg)
