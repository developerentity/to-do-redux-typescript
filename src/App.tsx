import { Grid } from '@mui/material';
import './App.css';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import ToDoHeader from './components/ToDoHeader';
import ToDoItem from './components/ToDoItem';
import FilterSelect from './components/FilterSelect';

function App() {
  const records = useAppSelector((state: RootState) => state.todo.records);
  const filter = useAppSelector((state: RootState) => state.todo.filter);

  return (
    <div className='app'>
      <div className="container">
        <ToDoHeader />
        {records.length ? <FilterSelect /> : null}
        <Grid container spacing={2} mt={'0'}>
          {records
            .filter((record) => {
              if (filter === "all") return true;
              if (filter === "completed") return record.completed;
              if (filter === "current") return !record.completed;
              return true;
            })
            .map((record) => <Grid key={record.id} xs={12} item>
              <ToDoItem record={record} />
            </Grid>)}
        </Grid>
      </div>
    </div>
  );
}

export default App;
