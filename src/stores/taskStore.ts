import { create } from 'zustand';
import { Task } from "../model/task";

import {v4 as uuidv4} from 'uuid';

interface TaskState {
  tasks: Task[];
  addTask: (description: string) => void;
  setTaskCompleted: (uuid: string, completed: boolean) => void;
  deleteAll: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    addTask: (description: string) => set((state) => ({
        tasks: [ ...state.tasks, 
            {
                uuid: uuidv4(),
                description,
                isDone: false 
            }    as Task,
        ],
       })),
    setTaskCompleted: (uuid: string, completed: boolean) => {
        set((state) => ({
            tasks: state.tasks.map(x => (x.uuid === uuid ? { ...x, isDone: completed } : x))
        }))
    },
    deleteAll: () => {
        set((state) => ({
            tasks: [],
        }))
    }
    
}));

