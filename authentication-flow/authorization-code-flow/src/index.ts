import express from 'express';

const app = express();

app.get('/login', (_, res) => {
  const loginParams = new URLSearchParams({
    client_id: 'fullcycle-client',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'code',
    scope: 'openid'
  })

  const url = `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginParams.toString()}`;

  res.redirect(url)
}); 

app.get('/callback',  async (req, res) => {
  const params = new URLSearchParams({
    client_id: 'fullcycle-client',
    grant_type: 'authorization_code',
    code: req.query.code as string,
    redirect_uri: 'http://localhost:3000/callback'
  })

  const url = "http://keycloak:8080/realms/fullcycle-realm/protocol/openid-connect/token"

 const  response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  })
  const result = await response.json()
  res.status(200).send(result)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
