import React from 'react'
import './RadioButton.scss'

export const RadioButton = props => {
  return (
    <label className="radio">
      <input
        className="hidden"
        type="radio"
        checked={props.isChecked}
        onChange={props.handleRadioChange}
        name={props.name}
        value={props.value}
      />
      <span className="label"></span>{props.label}
    </label>
  )
}

export default RadioButton