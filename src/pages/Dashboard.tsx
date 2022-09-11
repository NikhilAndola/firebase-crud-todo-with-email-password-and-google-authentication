import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../controls/firebase";
import { query, collection, getDocs, where, addDoc, deleteDoc, updateDoc, getDoc, doc, setDoc, DocumentData } from "firebase/firestore";
import { Todos } from "./Todos";
import { useAppSelector, useAppDispatch } from "../app/hooks/hooks";
import { InitialTodoForFirebase, setSecretId } from "../features/todosSlice";
import { useDispatch } from "react-redux";

function Dashboard() {
  const [usersData, setUsersData] = useState<any>(null)
  // const initialTodoForFirebase = useAppSelector(state => state.todosData.todosDataFirebase)
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const fetchUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const docs = await getDocs(q);
      // console.log("🚀 **************************** ~ users", docs.docs[0].id)
      dispatch(setSecretId(docs.docs[0].id))  
      const data = docs.docs[0].data();  
      setEmail(data.email);
      setUsersData(data);
      // const userCollectionsRef = collection(db, "users")
      // const userDoc =  getDoc,doc(db, "users", user?.uid) 
      // const newFields = {data: initialTodoForFirebase}

      // if(data.data.length === 0) {
        // await addDoc(userCollectionsRef, {data: initialTodoForFirebase})
        
        // await updateDoc(userDoc, {data: InitialTodoForFirebase})
        // await updateDoc(docs, newFields)
      // }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  // console.log("🚀 ~ file: Dashboard.tsx ~ line 43 ~ fetchUser ~ usersData", usersData)

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUser();
  }, [user, loading]);

  // const userCollectionsRef = collection(db, "users")

  // useEffect(() => {
  //   const dbFetch = async () => {
  //     const data = await getDocs(userCollectionsRef)
  //     // setUsersData(data.map(( getDoc,doc:any) =>  getDoc,doc.data()))
  //     setUsersData(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
  //   }
  //   dbFetch();
  // },[])
  
  // const [users, setUsers] = useState([]);
  // const usersCollectionRef = collection(db, "users")
  // useEffect(() => {
    //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setUsers(data.docs.map(( getDoc,doc) => ({... getDoc,doc.data(), id: doc.id})));
  //     console.log('db data', data)
  //   }
  //   getUsers();
  // }, [])
  // console.log("data of user", user)
  
//   useEffect(()=> {
    
//     const getData = async () => {

//       const docRef = doc(db, "users", "u4GqGqCSCOUCSneUIBlf");
//       const docSnap = await getDoc(docRef);
      
//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//       } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// }
// getData();
//   }, [])

  // console.log("am db", db)

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
        {
          usersData &&
          <Todos usersData={usersData}/>
        }
       </div>
       </div>
  );
}
export default Dashboard;