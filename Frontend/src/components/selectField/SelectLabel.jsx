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
// dark theme 
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

    const SelectLabel = ({ names, selectedNames, setSelectedNames }) => {
        return (
            <ThemeProvider theme={darkTheme}>
                <FormControl sx={{ m: 1, width: 500 }}>
                    <InputLabel>Multiple Select</InputLabel>
                    <Select
                        multiple
                        value={selectedNames}
                        onChange={(e)=> {
                            const obj = JSON.parse(e.target.value)
                            setSelectedNames({_id: obj._id, labelName: obj.labelName})
                        }}
                        input={<OutlinedInput label="Multiple Select" />}
                        renderValue={(selected) => (
                            <Stack gap={1} direction="row" flexWrap="wrap">
                                {selected.map((value) => (
                                    <Chip
                                        key={value._id}
                                        label={value.labelName}

                                        onDelete={() =>
                                            setSelectedNames(
                                                selectedNames.filter((item) => item !== value)
                                            )
                                        }
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                    />
                                ))}
                            </Stack>
                        )}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name._id}
                                // value={{name._id, name.labelName}}
                                value={JSON.stringify({_id: name._id, labelName: name.labelName})}
                                sx={{ justifyContent: "space-between" }}
                            >
                                {name.labelName}
                                {/* {selectedNames.includes(name.labelName) ? <CheckIcon color="info" /> : null} */}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ThemeProvider>
        );
    }

    export default SelectLabel;