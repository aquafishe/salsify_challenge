import React from 'react';
import {
	MenuItem,
	FormControl,
	Select,
} from '@material-ui/core';

const PropertySelect = ({ propertyValue, properties, formProps, handleChange }) => {
	return (
		<FormControl>
			<Select
				name="propertyInput"
				id="propertyInput"
				value={propertyValue}
				inputProps={{ 'aria-label': 'Without label' }}
				onChange={handleChange}
				style={formProps}
				displayEmpty
			>
				<MenuItem value="" disabled>
					Select a Property...
              </MenuItem>
				{properties.map(property => (
					//using data attributes to add more data to select drop down options
					<MenuItem
						key={property.id}
						data-property-id={property.id}
						data-property-type={property.type}
						value={property.name}
					>
						{property.name.capitalize()}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default PropertySelect;