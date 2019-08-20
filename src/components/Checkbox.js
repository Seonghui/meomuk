import React from 'react';

export const Checkbox = props => {
  return (
    <label>
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleCheckboxChange}
        name={props.name}
        value={props.value}
      /> {props.label}
    </label>
  )
}

export default Checkbox;