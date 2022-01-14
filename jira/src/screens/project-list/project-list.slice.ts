import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
  projectModelOpen: boolean
}

const initialState: State = {
  projectModelOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal (state) {
      state.projectModelOpen = true
    },
    closeProjectModal (state) {
      state.projectModelOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModelOpen
