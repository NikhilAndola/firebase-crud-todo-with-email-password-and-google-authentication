import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../controls/firebase";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center p-[30px] bg-[rgba(78,83,90,0.82)] rounded-[10px]">
        <input
          type="text"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)]"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register"><span className="text-[#4285f4]">Register now.</span></Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;