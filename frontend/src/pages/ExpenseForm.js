import React, { useState } from 'react';
import { handleError } from '../utils';
import './ExpenseForm.css';

function ExpenseForm({ addTransaction }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: '',
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo({ ...expenseInfo, [name]: value });
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError('Please add Expense Details');
      return;
    }
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: '', text: '' });
  };

  return (
    <div className="expense-form-wrapper">
      <div className="expense-form-box">
        <h2>💸 Expense Tracker</h2>
        <p>Add your recent expenses below</p>
        <form onSubmit={addExpenses}>
          <div className="form-group">
            <label>Expense Detail</label>
            <input
              onChange={handleChange}
              type="text"
              name="text"
              placeholder="e.g. Grocery, Electricity"
              value={expenseInfo.text}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              onChange={handleChange}
              type="number"
              name="amount"
              placeholder="e.g. 500"
              value={expenseInfo.amount}
            />
          </div>
          <button type="submit" className="expense-button">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
