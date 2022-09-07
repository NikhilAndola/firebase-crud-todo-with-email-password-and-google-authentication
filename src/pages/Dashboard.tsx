import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, updateDoc, doc } from "firebase/firestore";
import { Todos } from "./Todos";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { InitialTodoForFirebase } from "../features/todosSlice";
function Dashboard() {
  // const [users, setUsers] = useState<any[]>([])
  // console.log("🚀 ~ file: Dashboard.tsx ~ line 11 ~ Dashboard ~ users", users)
  // const initialTodoForFirebase = useAppSelector(state => state.todosData.todosDataFirebase)
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      const data = docs.docs[0].data();
      setEmail(data.email);
      
      // const userCollectionsRef = collection(db, "users")
      // const userDoc = doc(db, "users", user?.uid)
      // const newFields = {data: initialTodoForFirebase}
      // console.log("🚀 ~ file: Dashboard.tsx ~ line 26 ~ fetchUser ~ userDoc", userDoc)

      // if(data.data.length === 0) {
        // await addDoc(userCollectionsRef, {data: initialTodoForFirebase})
        
        // await updateDoc(userDoc, {data: initialTodoForFirebase})
        // await updateDoc(docs, newFields)
      // }
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

  // const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users")
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  //     console.log('db data', data)
  //   }
  //   getUsers();
  // }, [])

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