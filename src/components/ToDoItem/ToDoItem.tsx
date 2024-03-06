import { useAppDispatch } from "../../app/hooks";
import { Record, deleteRecord, toggleRecordStatus } from "../../app/slices/todoSlice";
import styles from './ToDoItem.module.css';

const ToDoItem = ({ record }: { record: Record }) => {

    const dispatch = useAppDispatch();

    const handleDeleteRecord = (id: string) => {
        dispatch(deleteRecord(id));
    };

    const handleToggleRecordStatus = (id: string) => {
        dispatch(toggleRecordStatus(id));
    };

    return (
        <>
            <li
                key={record.id}
                onClick={() => handleToggleRecordStatus(record.id)}
                style={{
                    textDecoration: record.completed ? "line-through" : "none",
                }}
            >
                {record.text}
                <button onClick={() => handleDeleteRecord(record.id)}>delete</button>
            </li>
        </>
    )
}

export default ToDoItem;