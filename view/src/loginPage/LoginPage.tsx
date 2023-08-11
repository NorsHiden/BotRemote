import "./login.css";

export const Login = () => {
  return (
    <div className="login-container">
      <h1 className="login-header">Welcome back!</h1>
      <p className="login-text">
        Log in to BotRemote and take control of your Discord Bot from the Web!
      </p>
      <a href="/api/oauth" className="login-btn">
        Continue with Discord
      </a>
    </div>
  );
};
