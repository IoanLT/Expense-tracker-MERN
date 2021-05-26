import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Action to get a transaction from our database
	async function getTransaction() {
		try {
			const res = await axios("/api/v1/transactions");

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: res.data.data
			})
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	}

	// Actions to remove a transaction
	const deleteTransaction = (id) => {
		dispatch({
			type: "DELETE_TRANSACTION",
			payload: id,
		});
	};

	// Actions to add a new transaction
	const addTransaction = (transaction) => {
		dispatch({
			type: "ADD_TRANSACTION",
			payload: transaction,
		});
	};

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
