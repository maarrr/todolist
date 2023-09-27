import "./List.scss";
import React, { useState } from "react";

import { useTaskStore } from "../stores/taskStore";
import AddTaskComponent from "./AddTask";

import { Divider, List, Button } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Space } from 'antd';



const ListComponent: React.FC = () => {

  const tasks = useTaskStore().tasks;
  const markTask = useTaskStore().setTaskCompleted;
  const deleteTasks = useTaskStore().deleteAll;

  const onChange = (e: CheckboxChangeEvent, task: string) => {
    const { checked } = e.target;
    markTask(task,checked);
  };

  const deleteAll = () => {
    deleteTasks();
  };

  return (<>
    <AddTaskComponent />
    <Divider orientation="left">TODO list</Divider>
    <Space.Compact style={{ width: '100%'}} id="divList">
      <List
        size="small"      
        bordered
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item>
            <Checkbox checked={task.isDone} onChange={(e) => onChange(e, task.uuid)}>{task.description}</Checkbox>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={deleteAll} id="deleteButton">Delete all tasks</Button>
    </Space.Compact>    
  </>);
};

export default ListComponent;