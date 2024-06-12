import React from 'react';
import './App.css';
import Counter from './pages/Counter'
import ListComponent from './pages/ListComponent';
import AddTaskComponent from './pages/AddTask';




function App() {
  return (
    <div className="App">
        <AddTaskComponent />
        <ListComponent/>
    </div>
  );
}

export default App;
