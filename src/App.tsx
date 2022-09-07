import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppSelector, useAppDispatch } from './app/hooks/hooks';
import {add, fetchTodosData, InitialTodoForFirebase} from './features/todosSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';
import { Todos } from './pages/Todos';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodosData())
  }, [])

  const count = useAppSelector((state) => state.todosData.count)

  let TodoFirstdata = useAppSelector(state => state.todosData.value);
  console.log("🚀 ~ file: Dashboard.tsx ~ line 30 ~ Dashboard ~ TodoFirstdata", TodoFirstdata)

  let iteratedTodo = TodoFirstdata.map(({body, userId, ...rest}) => ({...rest, createdAt:"",completed:false,remindAt:"" }))
  console.log("🚀 ~ file: Dashboard.tsx ~ line 36 ~ iteratedTodo ~ iteratedTodo", iteratedTodo)

  if(TodoFirstdata.length > 0) {
    dispatch(InitialTodoForFirebase(iteratedTodo))
  }

  return (
    <div className="app">
  <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/reset" element={<Reset/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  </Router>
</div>
  );
}

export default App;
