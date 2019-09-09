import React from 'react';
import './Tagbox.scss'
import { Add, Check } from '@material-ui/icons';

export const Checkbox = props => {
  let icon;

  if (props.isChecked) {
    icon = <Check />
  } else {
    icon = <Add />
  }
  return (
    <label className="tagbox">
      <input
        className="hidden"
        type="checkbox"
        checked={props.isChecked}
        onChange={props.handleCheckboxChange}
        name={props.name}
        value={props.value}
      />
      <p className="label">
        <span>
          {icon}
        </span>
        {props.label}
      </p>
    </label>
  )
}

export default Checkbox;