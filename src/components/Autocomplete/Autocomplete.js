import React from 'react';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

const filter = createFilterOptions();

export const AutocompleteCreatable = ({array, handleSetNestedState, label, params}) => {
    const [value, setValue] = React.useState(null);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                let item;
                if (typeof newValue === 'string') {
                    setValue({
                        name: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        name: newValue.inputValue
                    });
                    item =
                        {
                            id: null,
                            name: newValue.inputValue
                        }

                } else {
                    setValue(newValue);
                    item = {...newValue};

                }
                handleSetNestedState(item, ...params);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={array}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(option) => option.name}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label={label} variant="outlined"/>
            )}
        />
    );
}

export const AutocompleteGrouped = ({array, handleSetNestedState, label, params}) =>{
    const options = array.map((option) => {
        const parent = option.parentCategory.name.toUpperCase();
        return {
            parent: parent,
            ...option,
        };
    });

    return (
        <Autocomplete
            onChange={(event,newValue)=>{
                const value = newValue ? newValue.id : '';
                handleSetNestedState(value, ...params);
            }}
            options={options
                .sort((a, b) => -b.name.localeCompare(a.name))
                .sort((a, b) => -b.parent.localeCompare(a.parent))}
            groupBy={(option) => option.parent}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        />
    );
}
