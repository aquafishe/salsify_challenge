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
      operators: [],
      data: [],
      filteredData: [],
      columns: {},     
      isDataLoaded: false
    }
  }

  componentDidMount() {
    this.loadDataStore();
  }

  /**
   * Intializes datastore into React state and loads columns/row data for table
   */
  loadDataStore = () => {
    this.setState({
      products: window.datastore.getProducts(),
      properties: window.datastore.getProperties(),
      operators: window.datastore.getOperators(),
    }, () => {
      let columns = this.loadColumns();
      let data = this.loadData(columns);
      this.setState({
        columns: columns,
        data: data,
        filteredData: data,
        isDataLoaded: true
      })
    })
  }

  /**
   * Parses datastore.properties into <Table> component column format
   * @returns {Array} Array of objects containing property names as Headers and ids as accessors 
   */
  loadColumns = () => {
    let columns = this.state.properties.map(property => {
      return {
        Header: property.name,
        accessor: property.id.toString()
      }
    })
    return columns;
  }

  /**
   * Parses datastore.products into <Table> component row data format
   * @param   {Object} columns, Array of objects retuned from loadColumns() function
   * @returns {Array} Array of objects containing product property:value pairs
   */
  loadData = (columns) => {
    return this.state.products.map(product => {
      let productData = {}
      columns.forEach(column => {
        let value = product.property_values[column.accessor] ? product.property_values[column.accessor].value : null;
        productData[column.accessor] = value;
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
          <Box mt={2} borderTop={1} borderLeft={1} borderRight={1} style={{overflow: 'hidden'}}>
          <Filter
            properties={this.state.properties}
            operators={this.state.operators}
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
