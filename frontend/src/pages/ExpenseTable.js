import React from 'react';
import './ExpenseTable.css';

const ExpenseTable = ({ expenses, deleteExpens }) => {
  return (
    <div className="expense-list">
      <h2 className="expense-title">Expense History</h2>
      {expenses.length === 0 ? (
        <p className="no-expense">No expenses added yet.</p>
      ) : (
        expenses.map((expense, index) => (
          <div key={index} className="expense-item">
            <div className="expense-left">
              <div className="expense-description">{expense.text}</div>
              <div
                className="expense-amount"
                style={{ color: expense.amount > 0 ? '#27ae60' : '#c0392b' }}
              >
                ₹{expense.amount}
              </div>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteExpens(expense._id)}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseTable;
