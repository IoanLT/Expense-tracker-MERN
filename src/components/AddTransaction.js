import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
	const [text, setText] = useState("");
	const [amount, setAmount] = useState(0);

	const { addTransaction } = useContext(GlobalContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		// This will generate a random id.
		const newTransaction = {
			id: Math.floor(Math.random() * 1000000),
			text,
			amount: +amount, //using the unary + operator to convert the amount to a number
		};

		addTransaction(newTransaction);
	};

	return (
		<div>
			<h3>Add new transaction</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					<label htmlFor="text">Add transaction name:</label>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Enter text..."
					/>
				</div>
				<div className="form-control">
					<label htmlFor="amount">
						Amount <br />
						(negative - expense, positive - income)
					</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="Enter amount..."
					/>
				</div>
				<button className="btn">Add transaction</button>
			</form>
		</div>
	);
};

export default AddTransaction;
