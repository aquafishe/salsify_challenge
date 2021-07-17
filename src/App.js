import React, { Component } from 'react';
import './App.css';
import Filter from './components/Filter';
import ProductTable from './components/ProductTable';
import { Container, Box } from '@material-ui/core';

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      properties: [],
      data: [],
      filteredData: [],   
      isDataLoaded: false
    }
  }

  componentDidMount() {
    this.loadDataStore();
  }

  /**
   * Intializes datastore attributes into React state and loads data for <Table>
   */
  loadDataStore = () => {
    this.setState({
      products: window.datastore.getProducts(),
      properties: window.datastore.getProperties(),
    }, () => {
      let data = this.parseProductData(this.state.properties);
      this.setState({
        data: data,
        filteredData: data,
        isDataLoaded: true
      })
    })
  }
  /**
   * Parses datastore.products and flattens dataset which is passed to <Table> component
   * @param   {Object} properties, this.state.properties which is columns in Table
   * @returns {Array} Array of objects containing product property:value pairs
   */
  parseProductData = (properties) => {
    return this.state.products.map(product => {
      let productData = {}
      properties.forEach(property => {
        let productValue = product.property_values[property.id] ? product.property_values[property.id].value : null;
        productData[property.id] = productValue;
      })
      return productData;
    })
  }

  /**
   * Function passed to <Filter> to update filteredData state passed to <ProductTable>
   * @param {*} data 
   */
  updateFilteredData = (data) => {
    this.setState({
      filteredData: [...data]
    })
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Box mt={2} borderTop={1} borderLeft={1} borderRight={1} overflow="hidden">
          <Filter
            properties={this.state.properties}
            data={this.state.data}
            updateFilteredData={this.updateFilteredData}
          />
        </Box>
        { !this.state.isDataLoaded ? null : 
          <ProductTable properties={this.state.properties} data={this.state.filteredData} />
        }
        </Container>
      </div>
    )
  }
}

export default App;
