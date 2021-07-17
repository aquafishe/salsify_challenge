import React, { Component } from 'react';
import {
  TextField,
  Button
} from '@material-ui/core';

import PropertySelect from './PropertySelect';
import OperatorSelect from './OperatorSelect';
import MutliValueSelect from './MutliValueSelect';
import { operatorMap } from '../util/operatorMap';

const initialState = {
  propertyInput: {
    id: '',
    name: '',
    type: '',
  },
  operatorInput: {
    text: ''
  },
  valueInput: {
    value: []
  },
  distinctPropertyValues: []
}

const formStyle = {
  filterContainer: {
    float: 'left',
    margin: "1%"
  },
  btnContainer: {
    float: 'right',
    margin: '1%'
  },
  filterInput: {
    marginLeft: 10, 
    marginRight: 10
  }
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  /**
   * Parses product data for distinct/unique properties to use in <MutliValueSelect>
   * @param {Object} data, product data from props.data
   * @param {number} propertyId, the id which corresponds to the property eg. 0 = Product Names}
   * @returns {Array} distinct/unique product properties used for "in" operator value select
   */
  getDistinctPropertyValues = (data, propertyId) => {
    let distinctPropValues = {};
    data.forEach(product => {
      if (!distinctPropValues[product[propertyId]]) {
        distinctPropValues[product[propertyId]] = null;
      }
    })
    return Object.keys(distinctPropValues);
  }

  /**
   * Filters product data using operator filter function
   * Updates App filteredData state which is passed to <ProductTable>
   */
  filterData = () => {
    const propertyId = this.state.propertyInput.id;
    const operator = this.state.operatorInput;
    const { value } = this.state.valueInput;

    if (propertyId && operator.text && value) {
      let filterData = [];
      this.props.data.forEach(product => {
        if (operator.text) {
          if (operator.fn(product[propertyId], value)) {
            filterData.push(product);
          }
        }
      })
      this.props.updateFilteredData(filterData);
    }else{
      this.props.updateFilteredData(this.props.data);
    }
  }

  /**
   * Updates Filter state based on changes in filter selection
   * Calls filterData() when changes are made
   */
  handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    let newState = {}
    console.log(name)
    switch (name) {
      case 'propertyInput':
        const { propertyType, propertyId } = event.currentTarget.dataset;
        const distinctPropertyValues = this.getDistinctPropertyValues(this.props.data, propertyId);
        let { operatorInput } = this.state;
        
        //check if new property datatype is valid with previous operator, if NOT reset operatorInput
        if (operatorInput.text && !operatorInput.type.includes(propertyType)) {
          operatorInput = initialState.operatorInput;
        }
        newState = {
          propertyInput: {
            id: propertyId,
            name: value,
            type: propertyType,
          },  
          operatorInput: operatorInput,
          valueInput: {
            value: []
          },
          distinctPropertyValues: distinctPropertyValues
        }
        break;
      case 'operatorInput':
        const { operatorId } = event.currentTarget.dataset;
        const operator = operatorMap.find(operator => operator.id === operatorId);

        newState = {
          operatorInput: operator,
          valueInput: {
            value: []
          }
        }
        break;
      case 'valueInput':
      case 'multiValueInput':
        if (!(value instanceof Array)) {
          value = [value]
        }
        newState = {
          valueInput: { value: value }
        }
        break
    }
    this.setState(prevState => ({
      ...prevState, ...newState
    }), () => {
      this.filterData()
    })
  }

  /**
   * Clears filter selction and resets filter state and data
   */
  clearInputs = () => {
    this.setState({
      ...initialState
    }, () => {
      this.props.updateFilteredData(this.props.data);
    })
  }

  render() {
    const operatorId = this.state.operatorInput.id;
    return (
      <div>
        <div id="filterInputsContainer" style={formStyle.filterContainer}>
          <PropertySelect
            properties={this.props.properties}
            propertyValue={this.state.propertyInput.name}
            handleChange={this.handleChange}
            formProps={formStyle.filterInput}
          />
          <OperatorSelect
            operatorInput={this.state.operatorInput}
            propertyInputType={this.state.propertyInput.type}
            handleChange={this.handleChange}
            formProps={formStyle.filterInput}
          />
          {operatorId === "in" ?
            <MutliValueSelect
              valueInput={this.state.valueInput}
              distinctPropertyValues={this.state.distinctPropertyValues}
              handleChange={this.handleChange}
              style={formStyle.filterInput}
            />
            : (operatorId && operatorId != "any" && operatorId != "none") ?
              <TextField
                id="valueInput"
                name="valueInput"
                type={ this.state.propertyInput.type === "number" ? "number" : "text" }
                value={this.state.valueInput.value}
                onChange={this.handleChange}
                style={formStyle.filterInput}
              />
              : null}
        </div>
        <div id="clearBtnContainer" style={formStyle.btnContainer}>
          <Button
            variant="outlined"
            name="clearButton"
            style={{ textTransform: 'none' }}
            onClick={this.clearInputs}
          >
            Clear
          </Button>
        </div>
      </div>
    )
  }
}

export default Filter;