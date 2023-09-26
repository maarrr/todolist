import "./List.scss";

import React, { useState } from "react";
import { Divider, List, Button } from 'antd';
import { useTaskStore } from "../stores/taskStore";
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Input, Space } from 'antd';




const ListComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks = useTaskStore().tasks;
  const markTask = useTaskStore().setTaskCompleted;
  const addTask = useTaskStore().addTask;

  const onChange = (e: CheckboxChangeEvent, task: string) => {
    const { checked } = e.target;

    markTask(task,checked);

    if (checked) {
      setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, task]);
    } else {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((completedTask) => completedTask !== task)
      );
    }
  };

  const handleClick = () => {
    addTask(inputValue);
    console.log(inputValue);
  };

  return (<>
    <Space.Compact style={{ width: '50%' , padding: '30px'}} id="inputBar">
      <Input placeholder="Description of the task" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <Button type="primary" onClick={handleClick}>Add task</Button>
    </Space.Compact>

    <Divider orientation="left">TODO list</Divider>
    <List
      size="small"      
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item>
          <Checkbox checked={completedTasks.includes(task.uuid)} onChange={(e) => onChange(e, task.uuid)}>{task.description}</Checkbox>
          {/* <Button>Delete</Button> */}
        </List.Item>
      )}
    />
  </>);
};

export default ListComponent;