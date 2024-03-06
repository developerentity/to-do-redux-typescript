import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { setFilter } from "../app/slices/todoSlice";


const FilterSelect = () => {

    const dispatch = useAppDispatch();
    const records = useAppSelector((state: RootState) => state.todo.records);
    const filter = useAppSelector((state: RootState) => state.todo.filter);

    const totalCount = records.length
    const currentCount = records.filter((record) => !record.completed).length
    const completedCount = records.filter((record) => record.completed).length

    const filterOptions = [
        { value: 'all', count: totalCount },
        { value: 'completed', count: completedCount },
        { value: 'current', count: currentCount },]

    const handleFilterChange = (event: SelectChangeEvent) => {
        dispatch(setFilter(event.target.value as "all" | "completed" | "current"));
    };

    return (
        <Box display={'flex'} justifyContent={'flex-end'}>
            <Select
                size="small"
                sx={{ width: 150, textTransform: 'capitalize' }}
                value={filter}
                onChange={handleFilterChange}>
                {filterOptions.map(option =>
                    <MenuItem
                        disabled={option.count === 0}
                        key={option.value} value={option.value}>
                        {`${option.value} (${option.count})`}
                    </MenuItem>)}
            </Select>
        </Box>
    )
}

export default FilterSelect;