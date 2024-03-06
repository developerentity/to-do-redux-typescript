import './App.css';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import ToDoHeader from './components/ToDoHeader/ToDoHeader';
import ToDoItem from './components/ToDoItem/ToDoItem';

function App() {
  const records = useAppSelector((state: RootState) => state.todo.records);
  const filter = useAppSelector((state: RootState) => state.todo.filter);

  return (
    <div className='app'>
      <ToDoHeader />
      <ul>
        {records
          .filter((record) => {
            if (filter === "all") return true;
            if (filter === "completed") return record.completed;
            if (filter === "current") return !record.completed;
            return true;
          })
          .map((record) => <ToDoItem key={record.id} record={record} />)}
      </ul>
    </div>
  );
}

export default App;
