import React from 'react';


const InputChange = ({
    value, onChangeFunction, placeholder, type, attribute
}) => {


    return (
        <input
            type={type}
            value={value}
            onChange={onChangeFunction(attribute)}
            placeholder={placeholder}
        />
    )
}

export default InputChange
