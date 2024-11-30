# Authentication with Keycloak 

Keycloak is an open-source identity and access management solution that supports both OAuth 2.0 and OpenID Connect protocols, providing a secure and centralized way to manage user identities, roles, and permissions across applications and services. Keycloak acts as an authorization server, handling user authentication, authorization, and token issuance, ensuring secure access to resources. It offers various features like user federation, social login, multi-factor authentication, and fine-grained access control, making it a popular choice for securing modern applications and microservices. Keycloak can be easily integrated with existing systems and applications, supporting various client types (e.g., web, mobile, service accounts) and deployment options (e.g., standalone, clustered, cloud).

It's important to mention that, even though Keycloak is a powerful and feature-rich solution, there are other alternatives available in the market, such as Auth0, Okta, and AWS Cognito, each with its own strengths and use cases. 

## OAuth 2.0

OAuth 2.0 is an industry-standard protocol for authorization that enables secure delegated access to resources without sharing user credentials. It works by allowing a resource owner (user) to grant a third-party application limited access to their resources on a server, using an access token instead of credentials like a username and password. The process involves four key roles: the **resource owner** (user), **resource server** (API), **client** (application requesting access), and **authorization server** (issues tokens). OAuth 2.0 uses different flows (e.g., authorization code, client credentials) to cater to various use cases, such as web, mobile, and server-to-server communication, ensuring flexibility and enhanced security. Companies like Google, Facebook, and GitHub use OAuth 2.0 in their APIs, for example.

Below is a simple sequence diagram illustrating the OAuth 2.0 flow:

![OAuth 2.0 Flow](./docs/images/oauth2.svg)

## OpenID Connect

OpenID Connect (OIDC) is an identity layer built on top of the OAuth 2.0 protocol, designed to enable authentication and provide user identity information in a secure and standardized way. It allows clients (applications) to verify the identity of end-users based on the authentication performed by an authorization server and to obtain basic profile information via standardized claims. OIDC adds an **ID token**, a JSON Web Token (JWT), to OAuth 2.0 flows, which contains user information and is digitally signed for integrity. It is widely used for single sign-on (SSO) scenarios, ensuring seamless user authentication across multiple applications while maintaining security and simplicity.

