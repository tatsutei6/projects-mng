import { Kanban } from '../models/models'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './index'

interface KanbanState {
  kanbanList: Kanban[]
}

const initialKanbanState: KanbanState = {
  kanbanList: [],
}

export const kanbanSlice = createSlice({
  name: 'kanbanSlice',
  initialState: initialKanbanState,
  reducers: {
    setKanbanList(state, action) {
      state.kanbanList = action.payload
    }
  }
})

export const kanbanActions = kanbanSlice.actions

export const selectKanbanList = (state: RootState) => {
  return state.kanban.kanbanList
}
