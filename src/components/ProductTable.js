import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box
} from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		borderBottom: 1,
	},
	tableRow: {
		background: 'rgba(136,206,251,0.15)',
	},
	header: {
		fontWeight: 'bold',
		background: 'rgba(136,206,251,0.3)',
		paddingTop: 2,
		paddingBottom: 2,
	},
});

const ProductTable = (props) => {
	const classes = useStyles();
	const { properties, data } = props;

	return (
		<Box borderBottom={1}>
			<TableContainer className={classes.container}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow className={classes.tableRow}>
							{properties.map((property, index) => (
								<TableCell key={`header-${index}`} className={classes.header}>
									{property.name.capitalize()}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{ data.map((product, index) => (
							<TableRow
								key={`product-${product[0]}`}
								className={index % 2 ? classes.tableRow : null}
							>
								{/* product is Object so need to use Object.values to map over correctly */}
								{ Object.values(product).map((property, index) => (
									<TableCell key={`property-${index}`}>{property}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default ProductTable;