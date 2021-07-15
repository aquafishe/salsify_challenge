import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      propertyInput: {
        id: '',
        name: '',
        type: '',
      }
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'propertyInput') {
      const { propertyType, propertyId } = event.currentTarget.dataset;
      this.setState({ propertyInput: {
        id: propertyId,
        name: event.target.value,
        type: propertyType
      }})
    }
  }

  //using data attributes to add more data to select drop down options
  render() {
    const { properties } = this.props;
    console.log(this.state.propertyInput)
    return (
      <div>
        <FormControl variant="outlined" style={{textAlign: 'left', width: 200}}>
          <Select
            name="propertyInput"
            id="propertyInput"
            value={this.state.propertyInput.name}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={this.handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a Property...
            </MenuItem>
            { properties.map(property => (
                <MenuItem 
                  data-property-id={property.id}
                  data-property-type={property.type}
                  value={property.name}
                >
                  {property.name}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default Filter;