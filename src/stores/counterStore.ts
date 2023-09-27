import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>()(
    persist(
        (set, get) => ({
          count: 0,
          increment: () => set({count: get().count + 1 }),
          decrement: () => set({ count: get().count - 1 }),
        }),
        {
          name: 'counter-storage', // name of the item in the storage (must be unique)
          storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)