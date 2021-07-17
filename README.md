# Salsify Challenge: Condition Editor UI
Solution to Challenge:
> [Condition Editor UI - Github Pages](https://aquafishe.github.io/salsify_challenge/)

# Review
My initial approach to the challenge was to start reviewing the instructions, taking notes, identifying requirements, and creating my assumptions.

###  Requirements
* User can create a single filter
* Creating or updating a filter causes the list of products to update
* A user can clear the filter to see all products
* Application is able to handle different product properties across different customers

### Assumptions
* Table will not update unless fully valid filter is formed (eg. Property, Operator, Value are selected)
* Product property_values keys are mapped in the same format across all products for a given customer
* Property and Operator filter inputs will always display
* Value input will not render until both Property and Operator selected
* Value input type is dynamically determined based on Property and Operator selection
    * eg. Property with datatype 'number' will render input type of number
* Operator id of 'in' will render multi-select Value input
* Solution UI matches provided wireframe
* Table header and rows are styled similarly to provided wireframe
* Operator and Property datatypes are static thus valid Operators based on Property datatypes will not change

# Investigation
After processing the instructions I moved onto investigating the provided datastore to get a better understanding on how to approach the challenge. Once comfortable with the data I looked into various frameworks and libraries to use in my solution.
### Datastore
* Just a plain JavaScript file which added a 'datastore' attribute to the browser window object
* Didn't need to deal with SQL or CSV files just load JavaScript src in HTML \<script> tag
* Identified product data would need to be parsed and flattened in someway to process easier
### Framework/Library (React + Material-UI)
* I thought of using jQuery + DataTables or React + another table library for my solution 
* Decided on using React since I thought it would be better for dynamic rendering of the table which was a main requirement
* Reviewed various table component libraries:
    * [react-tables](https://react-table.tanstack.com/): Lightweight table library
        * Planned on originally using this library, however Material-UI also includes a Multi-Select form input component
    * [Material-UI](https://material-ui.com/): Robust component framework with tables, inputs, everything I needed plus the kitchen sink
        * Chose this framework after deliberating since it had multiple components I could take advantage of and I would stick with 1 library dependency

# Implementation
Started by setting up a 'create-react-app' project to make getting started easier. Pros and cons to using CRA, however for this challenge I decided I did not need custom configs like a custom Webpack configuration. If it was an application slated for production, I may have decided differently based on circumstances.

## Components
### \<App>
* Root Class Component which maintains datastore data, and dynamic table data state
* State is initialized in loadDataStore() method which is called in componentDidMount() React lifecycle method
    * includes callback method which calls parseProductData() method to flatten product data into more manageable format for table
* Renders
    * \<Filter>
    * \<ProductTable>

### \<Filter>
* Class Component which renders Property, Operator, Value filter inputs and maintains filter input state
* State is initialized using initialState constant in constructor
* When valid filter is created component will dynamically filter product data and update App filteredData state
* Clear button will reset state and update App filteredData state to original product data
* Renders 
    * \<PropertySelect>
    * \<OperatorSelect>
    * \<MultiValueSelect>
    * Value Text Input
    * Clear Button

### \<ProductTable>
* Functional Component which renders Product Table list
* Renders Table with headers based on props.properties and rows based on props.data passed from App component

### \<PropertySelect>
* Functional Component which renders Property select input
* Includes property data-attributes used on event trigger and stored in Filter state.propertyInput
    * data-property-id
    * data-property-type
* Renders property options based on props.properties passed from Filter component

### \<OperatorSelect>
* Functional Component which renders Operator select input
* Includes operator data-attributes used on event trigger and stored in Filter state.operatorInput
    * data-operator-id
* Utilizes static operatorMap which maps operators with valid property datatypes and includes operator dependent filtering method 
* Renders valid operator options based on checking selected property datatype and operatorMap

### \<MultiValueSelect>
* Functional Component which renders mulitple value select input
* Renders value options based on props.distinctPropertyValues passed from Filter component

## Utility Modules
* operatorMap.js : Static map of operators with thier id, text, valid property datatype, and method used to filter
* operatorHelper.js : Contains operator dependant filtering methods which are mapped in operatorMap.js

## Resources
* datastore.js : Provided file from challenge which contains product, property, and operator data

## Styling
* Class components use CSS in JSX
* Functional components use Material-UI useStyles() standard

# Takeaways
Recap of takeaways after completing challenge.
## Time Spent
I took a lot more time than I originally expected. However that wasn't such a bad thing since I definitely learned a lot from the challenge. I started reviewing it Tuesday night and finished 95% of development by Friday night. I spent on average about 3-4 hours everyday. 

| Phase  | Time Spent |
|--------|------------|
|Review  | 2 hours    |
|Investigation  | 1-2 hours |
|Implementation | 12 hours  |
|Documentation  | 2 hours   |

## Retrospective
* Make changes so 'Clear' button retrieves new dataset from datastore (more realistic approach to recall API and refresh dataset)
* Refactor App state management so Filter state is accessible to ProductTable component so filtering can be done in ProductTable removing the need to store duplicate data. Leverage Redux?
* Refactor Filter component to a functional component instead of class component
* Attempted to use [Tachyons](https://tachyons.io/) (lightweight CSS library) to style my class components, however there were CSS name collisions with Material-UI so I lost some development time
* Should have asked more questions about how important it was that the final solution match wireframe. The Material-UI library has a data-grid component which includes filters similar to the challenges requirements. However, the data-grid component UI was totally different.