import express from "express";
import session from "express-session";

const app = express();
app.use(express.urlencoded({ extended: true }));

const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: memoryStore,
  })
);

const middlewareIsAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //@ts-expect-error - type mismatch
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

app.get("/login", (req, res) => {
  //@ts-expect-error - type mismatch
  if (req.session.user) {
    return res.redirect("/admin");
  }
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const response = await fetch(
    "http://host.docker.internal:8080/realms/fullcycle-realm/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "fullcycle-client",
        grant_type: "password",
        username,
        password,
        scope: "openid",
      }).toString(),
    }
  );

  const result = await response.json();
  console.log(result);
  //@ts-expect-error - type mismatch
  req.session.user = result;
  req.session.save();

  res.redirect("/admin");
});

app.get("/logout", async (req, res) => {
  await fetch(
    "http://keycloak:8080/realms/fullcycle-realm/protocol/openid-connect/revoke",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: "fullcycle-client",
        //@ts-expect-error
        token: req.session.user.refresh_token,
      }).toString(),
    }
  );
  req.session.destroy((err) => {
    console.error(err);
  });
  res.redirect("/login");
});

app.get("/admin", middlewareIsAuth, (req, res) => {
  //@ts-expect-error - type mismatch
  res.json(req.session.user);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
