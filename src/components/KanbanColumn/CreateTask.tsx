import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Card, Input } from 'antd'
import { Dao } from '../../dao/dao'
import { Task } from '../../models/models'

const CreateTask = (props: {
  projectId: number | string,
  kanbanId: number | string | undefined,
  tasksData: Map<string | number, Task[]>,
  setTasksData: (data: Map<string | number, Task[]>) => void
}) => {
  const [name, setName] = useState('')
  const { projectId, kanbanId } = props
  const [inputMode, setInputMode] = useState(false)

  const submit = () => {
    (async () => {
      if (kanbanId !== undefined && name != null && name.trim().length > 0) {
        const ele = { projectId, name, kanbanId, typeId: 1, personId: 1, epicId: 1 }
        await Dao.getInstance().saveTask(ele)
        setInputMode(false)
        setName('')
        await Dao.getInstance().getTasksByKanbanId(Number(kanbanId))
        const tempData = props.tasksData.get(Number(kanbanId)) || []
        tempData.push(ele)
        props.tasksData.set(Number(kanbanId), tempData)
        props.setTasksData(new Map(props.tasksData))
      }
    })()
    // if (kanbanId !== undefined && name != null && name.trim().length > 0) {
    //   const ele = { projectId, name, kanbanId, typeId: 1, personId: 1, epicId: 1 }
    //   Dao.getInstance().saveTask(
    //     ele).then((value) => {
    //     setInputMode(false)
    //     setName('')
    //     Dao.getInstance().getTasksByKanbanId(Number(kanbanId)).then((value) => {
    //       props.tasksData.set(Number(kanbanId), value)
    //       props.setTasksData(new Map(props.tasksData))
    //     })
    //   })
    // }
  }

  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return <div onClick={toggle} style={{ marginBottom: '0.5rem' }}>+ タスクの作成</div>
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'タスクの内容は？'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  )
}

export default CreateTask