import { create } from 'zustand';
import { Task } from "../model/task";

import {v4 as uuidv4} from 'uuid';
import { persist, createJSONStorage } from 'zustand/middleware'

interface TaskState {
  tasks: Task[];
  addTask: (description: string) => void;
  setTaskCompleted: (uuid: string, completed: boolean) => void;
  deleteAll: () => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set, get) => ({
            tasks: [],
            addTask: (description: string) => set({
                tasks: [...get().tasks,
                    {
                        uuid: uuidv4(),
                        description,
                        isDone: false
                    } as Task,
                ],
            }),
            setTaskCompleted: (uuid: string, completed: boolean) => {
                set({
                    tasks: get().tasks.map(x => (x.uuid === uuid ? { ...x, isDone: completed } : x))
                })
            },
            deleteAll: () => {
                set({tasks: []})
            }
        }),
        {
            name: 'task-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)

