import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import MTable from './components/MTable';
import SimpleSelect from './components/FilterTest';
// import liveData from './data.json';
// import liveColumns from './columns.json';

class App extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      properties: [],
      operators: [],
      data: {},
      columns: {},
      isDataLoaded: false
    }
  }

  componentDidMount() {
    this.loadDataStore();
  }

  /**
   * Function that intializes datastore into React state and loads columns/row data for table
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
        isDataLoaded: true
      })
    })
  }

  /**
   * Function that parses datastore.properties into <Table /> component column format
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
   * Function that parses datastore.products into <Table /> component row data format
   * @param   {Object} columns, Array of objects retuned from loadColumns() function
   * @returns {Array} Array of objects containing product property:value pairs
   */
  loadData = (columns) => {
    return this.state.products.map(product => {
      let productData = {}
      columns.forEach(column => {
        let value = product.property_values[column.accessor] ? product.property_values[column.accessor].value : 'N/A';
        productData[column.accessor] = value
      })
      return productData;
    })
  }

  /**
   * Function that updates state data property which will update table row data
   * @param {*} data
   */
  updateData = (data) => {
    this.setState({ 
      data: {...data}
    })
  }

  render() {
    return (
      <div className="App">
        <Filter 
          properties={this.state.properties} 
          updateData={this.updateData}
        />
        { !this.state.isDataLoaded ? null : 
          <div>
            {/* <Table columns={this.state.columns} data={this.state.data} /> */}
            <MTable properties={this.state.properties} data={this.state.data} />
          </div>
        }
        {/* <SimpleSelect /> */}
      </div>
    )
  }
}

export default App;
