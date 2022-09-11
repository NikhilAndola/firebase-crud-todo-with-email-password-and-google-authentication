import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { RootState } from "../app/store/store";
import { handleCheckState, userCurrentField } from "../features/todosSlice";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, deleteDoc, updateDoc, deleteField, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";

export const Todos: React.FC<any> = ({usersData}) => {

    let iteratedTodos = useAppSelector(state => state.todosData.todosDataFirebase);

    const secretId = useAppSelector((state) => state.todosData.secretUserId)
    const [data, setData ] = React.useState(usersData.data)

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

    // const handleChange = (id: number) => {

    // }

    const handleChange = async (id: number) => {
      const userRefAddNew = doc(db, 'users', secretId);

      const updatedEditTodo =  usersData.data.map((item:any) => {
          if(item.id === id){
              return {
                  completed: !item.completed,
                  createdAt: item.createdAt,
                  id: item.id,
                  remindAt: item.remindAt,
                  title: item.title,
              }
          } else return item;
      })
      // let itemToUpdate = preData.data.filter((item: any) => item.id === DataToEdit.id)
      const finalDataToUpdate = [...usersData.data, {...updatedEditTodo}]
      // console.log("************************", updatedEditTodo )
      await updateDoc(userRefAddNew, {
        data: updatedEditTodo,
      });
      navigate("/dashboard")
      window.location.reload();

  }

    const handleEdit = (id: number) => {
      const dataUpdatedAfterEdit =  usersData.data.filter((item: any) => item.id === id)
      dispatch(userCurrentField(dataUpdatedAfterEdit[0]))
      navigate("/EditTodo")
    }

    const handleDelete = async (id: any) => {
        const userRefDelete = doc(db, 'users', secretId);
        // console.log(userRefDelete) 
        const dataUpdatedAfterDelete = await usersData.data.filter((item: any) => item.id !== id)
        // console.log("id", id, dataUpdatedAfterDelete)
        await updateDoc(userRefDelete, {
          data: dataUpdatedAfterDelete,
        });
        window.location.reload();
    }
    
    // console.log("🚀 ~ file: Todos.tsx ~ line 13 ~ handleChange ~ filteredTodo", usersData)

    const handleSort = async () => {
      let sortedData = data.sort((item: any)=> {
        if(item.completed){
          return -1;
        }else return 1;

      })
      // console.log("sort button", sortedData)
      setData(sortedData);
    }

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col items-center">
        <header className="text-[#000000] mb-4 text-2xl">Todos</header>
        <button onClick={()=> navigate("/newTodo")} className="p-[10px] text-xl rounded-[8px] bg-[rgb(162,85,190)]">
          New Todo
        </button>
        <div className="self-start text-[18px]">Sort by:
        <button className="p-[10px] text-xl rounded-[8px] bg-[rgb(0,255,85)]" disabled onClick={()=> handleSort()}>Complete status</button>
        </div>
      </div>
      {data.sort((item: any)=> {
        if(item.completed){
          return -1;
        }else return 1;

      }).map((item: any, index: number) => (
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
              className="w-5 h-5 cursor-pointer"
              id="vehicle2"
              checked={item.completed}
              onChange={()=>handleChange(item.id)}
              name="vehicle2"
              value="Car"
            />
            <EditIcon onClick={()=>handleEdit(item.id)} className="cursor-pointer" height="50px" width="30px" />
            <DeleteIcon className="cursor-pointer" height="50px" width="30px" onClick={()=> handleDelete(item.id)}/>
          </div>
        </div>
      ))}



    </div>
  );
};
