import React from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

import { operatorMap } from '../util/operatorMap';

const OperatorSelect = ({ operatorInput, propertyInputType, formProps, handleChange }) => {
  return (
    <FormControl>
      <Select
        name="operatorInput"
        id="operatorInput"
        value={operatorInput.text}
        inputProps={{ 'aria-label': 'Without label' }}
        onChange={handleChange}
        style={formProps}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an Operator...
        </MenuItem>
        {operatorMap.map(operator => {
          //only render valid operators based on chosen property type
          return (operator.type.includes(propertyInputType)) ?
              <MenuItem
                key={operator.id}
                data-operator-id={operator.id}
                value={operator.text}
              >
                {operator.text}
              </MenuItem>
              : null
          })}
      </Select>
    </FormControl>
  )
}

export default OperatorSelect;