import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addRecord, setFilter } from "../app/slices/todoSlice";
import { Box, Button, TextField, Typography } from "@mui/material";


const ToDoHeader = () => {
    const MIN_AMOUNT = 3
    const MAX_AMOUNT = 300

    const dispatch = useAppDispatch();

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

    return (
        <Box mx={'20%'} sx={{
            mx: {
                xs: 0,
                sm: '20%',

            },
        }}>
            <Typography
                my={2}
                variant="h3"
                align="center">
                Todo-List-App
            </Typography>

            <TextField
                fullWidth
                value={newRecord}
                onChange={(e) => handleInputChange(e.target.value)}
                style={{ borderColor: error ? 'red' : 'initial' }}
                label="Add Task"
                variant="outlined"
                error={!!error}
                helperText={error}
                InputProps={{
                    endAdornment: (
                        <Button
                            onClick={handleAddRecord}
                            size="large"
                            color="success"
                            variant="contained">
                            Save
                        </Button>
                    ),
                }}
            />
        </Box>
    )
}

export default ToDoHeader;