import "./login.css";
import { useContext, useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]:e.target.value}))
  }

  const { loading, error, dispatch } = useContext(AuthContext);
  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button className="lButton">Login</button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
