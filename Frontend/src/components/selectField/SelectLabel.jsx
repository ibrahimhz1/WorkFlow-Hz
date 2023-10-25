import React, { useState } from "react";
import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    ThemeProvider,
    createTheme,
    Stack,
    Chip
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const SelectLabel = ({names, selectedNames, setSelectedNames}) => {

    return (
        <ThemeProvider theme={darkTheme}>
            <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel>Labels</InputLabel>
                <Select
                    multiple
                    value={selectedNames}
                    onChange={(e) => setSelectedNames(e.target.value)}
                    input={<OutlinedInput label="Labels" />}
                    renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                            {selected.map((value) => (
                                <Chip
                                    key={value._id}
                                    label={value.labelName}
                                    onDelete={() => setSelectedNames(selectedNames.filter((item) => item._id !== value._id))}
                                    deleteIcon={
                                        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                    }
                                />
                            ))}
                        </Stack>
                    )}
                >
                    {names.map((label) => (
                        <MenuItem
                            key={label._id}
                            value={label}
                            sx={{ justifyContent: "space-between" }}
                        >
                            {label.labelName}
                            {selectedNames.some(selectedLabel => selectedLabel._id === label._id) ? <CheckIcon color="info" /> : null}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}

export default SelectLabel;