import React from 'react';

export const RadioButton = props => {
  return (
    <label>
      <input
        type="radio"
        checked={props.isChecked}
        onChange={props.handleRadioChange}
        name={props.name}
        value={props.value}
      /> {props.label}
    </label>
  )
}

export default RadioButton