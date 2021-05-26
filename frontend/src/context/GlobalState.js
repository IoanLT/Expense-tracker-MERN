import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	// Action to get the transactions from our database
	const getTransactions = async () => {
		try {
			const res = await axios("/api/v1/transactions");

			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	};

	// Action to remove a transaction
	const deleteTransaction = async (id) => {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);

			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	};

	// Actions to add a new transaction
	const addTransaction = async (transaction) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/v1/transactions", transaction, config);

			dispatch({
				type: "ADD_TRANSACTION",
				payload: res.data.data,
			});
		} catch (err) {
			dispatch({
				type: "TRANSACTION_ERROR",
				payload: err.response.data.error,
			});
		}
	};

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				deleteTransaction,
				addTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
