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
      propertyInput: ''
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'propertyInput') {
      this.setState({ propertyInput: event.target.value})
    }
  }

  render() {
    const { properties } = this.props;
    console.log(properties)
    return (
      <div>
        <FormControl variant="outlined" style={{textAlign: 'left', width: 200}}>
          <Select
            name="propertyInput"
            id="propertyInput"
            value={this.state.propertyInput}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={this.handleChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a Property...
            </MenuItem>
            { properties.map(property => (
                <MenuItem value={property.id}>{property.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default Filter;