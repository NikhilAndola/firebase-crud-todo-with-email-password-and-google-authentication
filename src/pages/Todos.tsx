import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { RootState } from "../app/store/store";
import { handleCheckState } from "../features/todosSlice";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, deleteDoc, updateDoc, deleteField, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";

export const Todos: React.FC<any> = ({usersData}) => {

    let iteratedTodos = useAppSelector(state => state.todosData.todosDataFirebase);
    const [count, setCount ] = React.useState(0)
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const handleChange = (id: number) => {
    //     let filteredTodo = iteratedTodos.map(item => {
    //         if(item.id === id){
    //             return {...item, completed: !item.completed}
    //         } else return item;
    //     })
    //     dispatch(handleCheckState(filteredTodo))
    //   }

    const handleChange = () => {

    }

    const handleDelete = async (id: any) => {
        const userRefDelete = doc(db, 'users', "u4GqGqCSCOUCSneUIBlf");
        console.log(userRefDelete) 
        // Remove the 'capital' field from the document
        // await updateDoc(userRefDelete, {
        //     capital: deleteField()
        // });
        const dataUpdatedAfterDelete = await usersData.data.filter((item: any) => item.id !== id)
        console.log("id", id, dataUpdatedAfterDelete)
        await updateDoc(userRefDelete, {
          data: dataUpdatedAfterDelete,
        });
        setCount(count + 1)
    }
    
    console.log("🚀 ~ file: Todos.tsx ~ line 13 ~ handleChange ~ filteredTodo", usersData)

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col items-center">
        <header className="text-[#000000] mb-4 text-2xl">Todos</header>
        <button onClick={()=> navigate("/newTodo")} className="p-[10px] text-xl rounded-[8px] bg-[rgb(162,85,190)]">
          New Todo
        </button>
        <div className="self-start text-[18px]">Sort by:</div>
      </div>
      {usersData.data.map((item: any, index: number) => (
        <div
          key={item.id}
          className={`w-full px-10 h-[60px] ${item.completed === false ? "bg-[red]" : "bg-[green]"} flex justify-between items-center my-5`}>
          <div className="text-[20px]">{item.title}</div>
          <div className="flex gap-x-2 items-center">
            <label htmlFor="vehicle2" className="text-[18px]">
              Completed
            </label>
            <input
              type="checkbox"
              className="w-5 h-5"
              id="vehicle2"
              checked={item.completed}
              onChange={()=>handleChange()}
              name="vehicle2"
              value="Car"
            />
            <EditIcon height="50px" width="30px" />
            <DeleteIcon height="50px" width="30px" onClick={()=> handleDelete(item.id)}/>
          </div>
        </div>
      ))}
    </div>
  );
};
