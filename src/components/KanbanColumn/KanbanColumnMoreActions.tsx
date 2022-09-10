import { Button, Dropdown, Menu, Modal } from 'antd'
import { Kanban } from '../../models/models'
import { Dao } from '../../dao/dao'
import { Dispatch, SetStateAction, useContext } from 'react'
import { TasksContext } from '../../context/TasksContext'

export const KanbanColumnMoreActions = (props: { kanban: Kanban, kanbans: Kanban[], setKanbans: Dispatch<SetStateAction<Kanban[]>> }) => {
  const { tasksData, setTasksData } = useContext(TasksContext)

  const startDelete = () => {
    Modal.confirm({
      okText: '確定',
      cancelText: 'キャンセル',
      title: '削除しますか',
      onOk() {
        (async () => {
          await Dao.getInstance().deleteKanban(props.kanban.id)
          props.setKanbans(props.kanbans.filter((kanban) => kanban.id !== props.kanban.id))
          tasksData.delete(Number(props.kanban.id))
          setTasksData(new Map(tasksData))
          // 看板が削除されたら、その看板に紐づくタスクも削除する
          await Dao.getInstance().deleteTasksByKanbanId(props.kanban.id)
        })()
        // Dao.getInstance().deleteKanban(props.kanban.id).then(() => {
        //   props.setKanbans(props.kanbans.filter((kanban) => kanban.id !== props.kanban.id))
        // })
      }
    })
  }
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} danger={true} onClick={startDelete}>
          削除
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}