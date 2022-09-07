import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { RootState } from "../app/store/store";
import { handleCheckState } from "../features/todosSlice";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";

export const Todos = () => {

    let iteratedTodos = useAppSelector(state => state.todosData.todosDataFirebase);

    const dispatch = useAppDispatch();

    const handleChange = (id: number) => {
        let filteredTodo = iteratedTodos.map(item => {
            if(item.id === id){
                return {...item, completed: !item.completed}
            } else return item;
        })
        dispatch(handleCheckState(filteredTodo))
        console.log("🚀 ~ file: Todos.tsx ~ line 13 ~ handleChange ~ filteredTodo", filteredTodo)
    }

  return (
    <div className="h-screen w-screen ">
      <div className="flex flex-col items-center">
        <header className="text-[#000000] mb-4 text-2xl">Todos</header>
        <button className="p-[10px] text-xl rounded-[8px] bg-[rgb(162,85,190)]">
          New Todo
        </button>
        <div className="self-start text-[18px]">Sort by:</div>
      </div>
      {iteratedTodos.map((item, index) => (
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
              onChange={()=>handleChange(item.id)}
              name="vehicle2"
              value="Car"
            />
            <EditIcon height="50px" width="30px" />
            <DeleteIcon height="50px" width="30px" />
          </div>
        </div>
      ))}
    </div>
  );
};
