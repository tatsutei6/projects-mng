import React, { useEffect, useState } from 'react'
import styles from './KanbanPage.module.scss'
import { Dao } from '../../dao/dao'
import { Kanban, Task } from '../../models/models'
import KanbanColumn from '../../components/KanbanColumn/KanbanColumn'
import CreateKanban from '../../components/KanbanColumn/CreateKanban'
import { TaskModal } from '../../components/KanbanColumn/TaskModal'
import { TasksContext, useTasksContext } from '../../context/TasksContext'

const KanbanPage = (props: { projectId: number | string }) => {
  const [kanbans, setKanbans] = useState<Kanban[]>([])
  const [tasksData, setTasksData] = React.useState<Map<string | number, Array<Task>>>(new Map())


  useEffect(() => {
    (async () => {
      alert('KanbanPage.useEffect')
      const kanbans = await Dao.getInstance().getKanbansByProjectId(Number(props.projectId))
      setKanbans(kanbans)
      for (const ele of kanbans) {
        const tasks = await Dao.getInstance().getTasksByKanbanId(ele.id)
        tasksData.set(Number(ele.id), tasks)
      }
      setTasksData(new Map(tasksData))
    })()
  }, [setTasksData, props.projectId])
  return (
    <TasksContext.Provider value={{ tasksData, setTasksData }}>
      <div className={styles['kanban-container']}>
        <h3>看板</h3>
        <div className={styles['kanban-column-outer-container']}>
          {
            kanbans?.map((kanban) => {
              return (
                <KanbanColumn key={kanban.id} kanban={kanban} kanbans={kanbans} setKanbans={setKanbans} />
              )
            })
          }
          <CreateKanban projectId={props.projectId} setKanbans={setKanbans} />
        </div>
        <TaskModal kanbans={kanbans} />
      </div>
    </TasksContext.Provider>
  )
}

export default KanbanPage