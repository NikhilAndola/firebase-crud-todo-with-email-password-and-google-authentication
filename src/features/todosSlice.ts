import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../app/store/store';

export interface IfetchTodo {
    value: {
        "id": number,
        "title": string,
        "completed?": boolean,
        "createdAt?": string,
        "remindAt"?: string,
        "body"?: string,
        "userId"?: number,
    }[];
    status: 'successfull' | 'loading' | 'failed';
    count: number;
    todosDataFirebase: {
        "id": number,
        "title": string,
        "completed"?: boolean,
        "createdAt"?: string,
        "remindAt"?: string,
        "body"?: string,
        "userId"?: number,
    }[];
    currentFieldId: {
        "id": number,
        "title": string,
        "completed": boolean,
        "createdAt": string,
        "remindAt": string,
    },
    secretUserId: string,
  }

  const initialState: IfetchTodo = {
    status: 'loading',
    value: [],
    count: 0,
    todosDataFirebase: [],
    currentFieldId: {
        "id": 0,
        "title": '',
        "remindAt": '',
        "createdAt": '',
        "completed": false,
    },
    secretUserId:"",
};

export const fetchTodosData = createAsyncThunk(
    "todosList/data",
    async (dispatch, action) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5")
        let res = await response.json()
        return res;
    }
)

export const todoSlice = createSlice({
    name: 'todosList',
    initialState,
    reducers: {
        add: (state) => {
            state.count += 1;
        },
        newTodo: (state, {payload}) => {
            state.todosDataFirebase = payload;
        },
        InitialTodoForFirebase: (state, action) => {
            state.todosDataFirebase = action.payload;
        },
        handleCheckState: (state, {payload}) => {
            state.todosDataFirebase = payload;
        },
        userCurrentField: (state, {payload}) => {
            state.currentFieldId = payload;
        },
        setSecretId: (state, {payload}) => {
            state.secretUserId = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTodosData.fulfilled, (state, action) => {
                state.status = "successfull";
                state.value = action.payload;
            })
            .addCase(fetchTodosData.rejected, (state) => {
                state.status = "failed";
            })
    },
})

export const { add, InitialTodoForFirebase, handleCheckState, userCurrentField, setSecretId } = todoSlice.actions;

export default todoSlice.reducer;