import {
	equals,
	greaterThan,
	lessThan,
	any,
	none,
	within,
	contains
} from './operatorHelper';

const operatorMap = [
	{
		text: "Equals",
		id: "equals",
		type: ["string", "number", "enumerated"],
		fn: equals
	},
	{
		text: "Is greater than",
		id: "greater_than",
		type: ["number"],
		fn: greaterThan
	},
	{
		text: "Is less than",
		id: "less_than",
		type: ["number"],
		fn: lessThan
	},
	{
		text: "Has any value",
		id: "any",
		type: ["string", "number", "enumerated"],
		fn: any
	},
	{
		text: "Has no value",
		id: "none",
		type: ["string", "number", "enumerated"],
		fn: none
	},
	{
		text: "Is any of",
		id: "in",
		type: ["string", "number", "enumerated"],
		fn: within
	},
	{
		text: "Contains",
		id: "contains",
		type: ["string"],
		fn: contains
	}
]

export {
	operatorMap
};
