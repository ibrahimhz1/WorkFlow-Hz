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


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const names = [
    "Humaira Sims",
    "Santiago Solis",
    "Dawid Floyd",
    "Mateo Barlow",
    "Samia Navarro",
    "Kaden Fields",
    "Genevieve Watkins",
    "Mariah Hickman",
    "Rocco Richardson",
    "Harris Glenn"
];

const SelectLabel = () => {
    const [selectedNames, setSelectedNames] = useState([]);

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
                                    key={value}
                                    label={value}
                                    onDelete={() => setSelectedNames(selectedNames.filter((item) => item !== value))}
                                    deleteIcon={
                                        <CancelIcon onMouseDown={(event) => event.stopPropagation()} />
                                    }
                                />
                            ))}
                        </Stack>
                    )}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            sx={{justifyContent: "space-between"}}
                        >
                            {name}
                            {selectedNames.includes(name) ? <CheckIcon color="info" /> : null}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
}

export default SelectLabel;