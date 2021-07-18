import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Input,
	MenuItem,
	FormControl,
	Select
} from '@material-ui/core'

const useStyles = makeStyles({
	mutliSelectForm: {
		textAlign: 'left',
		minWidth: 200,
		width: 'auto'
	}
});

const MutliValueSelect = ({ valueInput, distinctPropertyValues, formProps, handleChange }) => {
	const classes = useStyles();
	return (
		<FormControl variant="outlined" className={classes.mutliSelectForm}>
			<Select
				name="multiValueInput"
				id="multiValueInput"
				multiple
				value={valueInput.value}
				onChange={handleChange}
				style={formProps}
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