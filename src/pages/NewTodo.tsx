import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, deleteDoc, updateDoc, deleteField, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";
import { useAppSelector } from "../app/hooks/hooks";

export function NewTodo() {
  const [title, setTitle] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [preData, setPreData] = useState<any>(null);
  const secretId = useAppSelector((state) => state.todosData.secretUserId)

  const rid = React.useId();
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      const data = docs.docs[0].data();
      setPreData(data);
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

//   useEffect(() => {
//     if (loading) {
//       // maybe trigger a loading screen
//       return;
//     }
//     if (user) navigate("/dashboard");
//   }, [user, loading]);

const handleAddNewTodo = async () => {
    const userRefAddNew = doc(db, 'users', secretId);
    const newDataToAdd = {
        completed: false,
        createdAt: new Date().toISOString(),
        id: Date.now(),
        remindAt: new Date(remindAt).toISOString(),
        title: title,
    }
    const updatedDataTodo = [...preData.data, {...newDataToAdd}]
    console.log("adding data", title, new Date(remindAt).toISOString() )
    // if (user) navigate("/dashboard");
    await updateDoc(userRefAddNew, {
      data: updatedDataTodo,
    });
    navigate("/dashboard")
}

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center p-[30px] bg-[rgba(78,83,90,0.82)] rounded-[10px]">
        <span className="text-white mb-4 text-2xl">New Todo</span>
        <input
          type="text"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          className="p-[8px] text-[18px] mb-[10px] rounded-[8px]"
          value={remindAt}
          onChange={(e) => setRemindAt(e.target.value)}
          placeholder="Remind at"
        />
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)]"
          onClick={handleAddNewTodo}
        >
          Create
        </button>
      </div>
    </div>
  );
}
