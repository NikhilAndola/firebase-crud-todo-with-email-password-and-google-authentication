import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../controls/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center p-[30px] bg-[rgba(78,83,90,0.82)] rounded-[10px]">
        <span className="text-white mb-4 text-2xl">Login</span>
        <input
          type="text"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)]"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[#4285f4]" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div className="text-white mt-[7px]">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div className="mt-[7px]">
          <span className="text-white">Don't have an account?</span> <Link to="/register"><span className="text-[#4285f4]">Register now.</span></Link> 
        </div>
      </div>
    </div>
  );
}
export default Login;
