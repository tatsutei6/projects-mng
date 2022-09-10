import React, { ReactNode, useContext } from 'react'
import { Task } from '../models/models'
import { Dao } from '../dao/dao'


export const TasksContext = React.createContext<{
  tasksData: Map<string|number, Array<Task>>,
  setTasksData: (data: Map<string|number, Array<Task>>) => void
}>({
  tasksData: new Map(),
  setTasksData: (data: Map<string|number, Array<Task>>) => {
  }
})

/**
 * contextを返す
 */
export const useTasksContext = () => {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasksContextはTasksProviderの範囲内で利用する必要がある')
  }
  return context
}

