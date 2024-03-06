import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addRecord, setFilter } from "../../app/slices/todoSlice";
import { RootState } from "../../app/store";
import styles from './ToDoHeader.module.css';


const ToDoHeader = () => {
    const MIN_AMOUNT = 3
    const MAX_AMOUNT = 300

    const dispatch = useAppDispatch();
    const records = useAppSelector((state: RootState) => state.todo.records);
    const filter = useAppSelector((state: RootState) => state.todo.filter);

    const [newRecord, setNewRecord] = useState("");
    const [error, setError] = useState('');

    const handleInputChange = (str: string) => {
        setNewRecord(str)
        setError('')
    }

    const handleAddRecord = () => {
        if (newRecord.trim().length <= MIN_AMOUNT || newRecord.trim().length > MAX_AMOUNT) {
            setError(`Record length must be between ${MIN_AMOUNT} and ${MAX_AMOUNT} characters.`);
            return;
        }
        dispatch(addRecord(newRecord.trim()));
        setNewRecord('');
        setError('');
        dispatch(setFilter('all'));
    };

    const handleFilterChange = (
        selectedFilter: "all" | "completed" | "current"
    ) => {
        dispatch(setFilter(selectedFilter));
    };

    return (
        <>
            <div>
                <select
                    value={filter}
                    onChange={(e) => handleFilterChange(e.target.value as 'all' | 'completed' | 'current')}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="current">Current</option>
                </select>
            </div>

            <div>
                Completed: {records.filter((record) => record.completed).length}
            </div>
            <div>
                Uncompleted: {records.filter((record) => !record.completed).length}
            </div>

            <input
                type="text"
                value={newRecord}
                onChange={(e) => handleInputChange(e.target.value)}
                style={{ borderColor: error ? 'red' : 'initial' }}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={handleAddRecord}>Add</button>
        </>
    )
}

export default ToDoHeader;