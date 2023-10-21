import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';

const LabelSelect =()=> {
    const labels = useSelector((state)=> state.task.labelsOfProject);
    const [state, setState] = useState({id: '', labelName: ''});
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (newValue) => {
        setSelectedOptions(newValue);
    };
    
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#242424',
            color: 'white'
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: '#242424',
            color: 'white',
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'brown' : 'gray',
            // backgroundColor: '#242424',
            color: 'white',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            color: 'red',
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
        }),
    };

    return (
        <CreatableSelect
            isMulti
            options={labels}
            value={selectedOptions}
            onChange={handleChange}
            placeholder="Select or create label"
            isClearable
            styles={customStyles}
        />
    );
}

export default LabelSelect;