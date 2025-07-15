import React from 'react';
import './ExpenseDetails.css';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
  const balance = incomeAmt - expenseAmt;

  return (
    <div className="details-wrapper">
      <h2>Your Current Balance</h2>
      <div className="balance-box">₹ {balance}</div>

      <div className="amounts-container">
        <div className="amount-box income-box">
          <h4>Income</h4>
          <p>₹ {incomeAmt}</p>
        </div>
        <div className="amount-box expense-box">
          <h4>Expense</h4>
          <p>₹ {expenseAmt}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
