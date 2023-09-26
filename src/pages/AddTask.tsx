import "./AddTask.scss";

import React, { useState } from "react";
import { useTaskStore } from "../stores/taskStore";
import { Button, Input, Space } from 'antd';

const AddTaskComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');

    const addTask = useTaskStore().addTask;

    const handleClick = () => {
        if (inputValue !== "") {
            addTask(inputValue);
            console.log(inputValue);
        }        
    };

    return (<>
        <Space.Compact style={{ width: '50%' , padding: '30px'}} id="inputBar">
          <Input placeholder="Description of the task" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <Button type="primary" onClick={handleClick}>Add task</Button>
        </Space.Compact>
        </>
    )
}

export default AddTaskComponent;