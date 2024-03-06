import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Record {
  id: string;
  text: string;
  completed: boolean;
}

interface ToDoState {
  records: Record[];
  filter: "all" | "completed" | "current";
}

const initialState: ToDoState = {
  records: [],
  filter: "all",
};

const toDoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<string>) => {
      const newRecord: Record = {
        id: uuidv4(),
        text: action.payload,
        completed: false,
      };
      state.records.push(newRecord);
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(
        (record) => record.id !== action.payload
      );
    },
    toggleRecordStatus: (state, action: PayloadAction<string>) => {
      const record = state.records.find(
        (record) => record.id === action.payload
      );
      if (record) {
        record.completed = !record.completed;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "current">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addRecord, deleteRecord, toggleRecordStatus, setFilter } =
  toDoSlice.actions;
export default toDoSlice.reducer;
