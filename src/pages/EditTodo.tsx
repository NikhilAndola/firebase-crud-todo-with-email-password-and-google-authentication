import React, { useEffect, useState } from "react";
import { useAppSelector } from '../app/hooks/hooks';
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, deleteDoc, updateDoc, deleteField, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";

export const EditTodo = () => {
    
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    const DataToEdit = useAppSelector(state => state.todosData.currentFieldId)
    const secretId = useAppSelector((state) => state.todosData.secretUserId)

    // let x = new Date(DataToEdit.remindAt );
    const [title, setTitle] = useState(DataToEdit.title);
    const [remindAt, setRemindAt] = useState<any>(new Date(DataToEdit.remindAt).toLocaleDateString());
    const [completed, setCompleted] = useState(DataToEdit.completed);
    const [preData, setPreData] = useState<any>(null);

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

    const handleUpdateTodo = async () => {
        const userRefAddNew = doc(db, 'users', secretId);
        const updatedEditTodo =  preData.data.map((item:any) => {
            if(item.id === DataToEdit.id){
                return {
                    completed: completed,
                    createdAt: item.createdAt,
                    id: item.id,
                    remindAt: new Date(remindAt).toISOString(),
                    title: title,
                }
            } else return item;
        })
        // let itemToUpdate = preData.data.filter((item: any) => item.id === DataToEdit.id)
        const finalDataToUpdate = [...preData.data, {...updatedEditTodo}]
        // console.log("************************", updatedEditTodo )
        await updateDoc(userRefAddNew, {
          data: updatedEditTodo,
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
          <input
              type="checkbox"
              className="w-5 h-5"
              id="vehicle2"
              checked={completed}
              onChange={()=>setCompleted(!completed)}
              name="vehicle2"
              value="Car"
            />
        <button
          className="p-[10px] text-[18px] mb-[10px] rounded-[8px] text-white bg-[rgb(162,85,190)] mt-2"
          onClick={handleUpdateTodo}
        >
          Update
        </button>
      </div>
    </div>
  )
}
