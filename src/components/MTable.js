import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	container: {
		maxWidth: 800,
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	header: {
		fontWeight: 'bold',
		paddingTop: 0,
		paddingBottom: 0,
	},
});

const MTable = (props) => {
	const classes = useStyles();
	
	const { properties, data } = props;

	return (
    <TableContainer className={classes.container} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
						{ properties.map(property => (
							<TableCell className={classes.header}>{property.name}</TableCell>
						))}
          </TableRow>
        </TableHead>
        <TableBody>
          { data.map(product => (
            <TableRow>  
              <TableCell>{product[0]}</TableCell>
              <TableCell>{product[1]}</TableCell>
              <TableCell>{product[2]}</TableCell>
              <TableCell>{product[3]}</TableCell>
              <TableCell>{product[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MTable;