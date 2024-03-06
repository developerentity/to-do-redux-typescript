import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { Record, deleteRecord, toggleRecordStatus } from "../app/slices/todoSlice";
import DeleteIcon from '@mui/icons-material/Delete';

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
            <Card
                onClick={() => handleToggleRecordStatus(record.id)}
                elevation={6}
                sx={{
                    minWidth: 275,
                    background: '#B0B5CC',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 10px',
                    cursor: 'pointer',
                    '&:hover': {
                        background: "#FFB546",

                    }
                }}>
                <CardContent>
                    <Typography
                        sx={{
                            fontSize: 14,
                            textDecoration: record.completed ? "line-through" : "none"
                        }}
                        color="text.secondary"
                        gutterBottom>
                        {record.text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => handleDeleteRecord(record.id)}
                        size="large"
                        sx={{
                            bgcolor: '#DE3642',
                            ':hover': {
                                bgcolor: '#DE6B73',
                            },
                        }}>
                        <DeleteIcon sx={{ color: '#fff' }} />
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ToDoItem;