import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const MutliValueSelect = ({ valueInput, distinctPropertyValues, handleChange }) => {
	return (
		<FormControl variant="outlined" style={{ textAlign: 'left', minWidth: 200, width: 'auto' }}>
			<Select
				name="multiValueInput"
				id="multiValueInput"
				multiple
				value={valueInput.value}
				onChange={handleChange}
				input={<Input />}
			>
				{distinctPropertyValues.map(property => {
					return (
						<MenuItem
							key={property}
							value={property}
						>
							{property.capitalize()}
						</MenuItem>
					)
				})}
			</Select>
		</FormControl>
	)
}

export default MutliValueSelect;