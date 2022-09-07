import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../controls/firebase";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const initialTodoForFirebase = useAppSelector(state => state.todosData.todosDataFirebase)

  const navigate = useNavigate();
  const register = () => {
    if (password !== confirmPass) {
      alert("Password must be same");
    } else {
      registerWithEmailAndPassword(email, password, initialTodoForFirebase);
    }
  };
  useEffect(() => {
    if (loading) return;
    // if (user) navigate("dashboard", { replace: true });
    if (user) navigate("/dashboard");
    // history.replace("/dashboard");
  }, [user, loading]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center p-[30px] bg-[rgba(78,83,90,0.82)] rounded-[10px]">
        <span className="text-white mb-4 text-2xl">Register</span>
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
        <input
          type="password"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm password"
        />
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)]"
          onClick={register}
        >
          Register
        </button>
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[#4285f4]"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/"><span className="text-[#4285f4]">Login now.</span></Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
