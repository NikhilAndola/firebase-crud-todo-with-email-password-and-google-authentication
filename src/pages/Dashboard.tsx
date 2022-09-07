import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Todos } from "./Todos";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { InitialTodoForFirebase } from "../features/todosSlice";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setEmail(data.email);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUser();
  }, [user, loading]);

  return (
    <div>
    <div className="h-full w-full flex items-center justify-center">
       <div className="flex flex-col text-center p-[30px] bg-[rgba(78,83,90,0.82)] rounded-[10px]">
        Logged in as
         <div>{user?.email}</div>
         <button className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)]" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
       <div>
       <Todos/>
       </div>
       </div>
  );
}
export default Dashboard;