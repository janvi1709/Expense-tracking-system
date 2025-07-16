import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpenseTable from "./ExpenseTable";
import ExpenseDetails from "./ExpenseDetails";
import ExpenseForm from "./ExpenseForm";
import { Pie } from "react-chartjs-2";
import PieChart from "./PieChart";
import LandingPage from "./LandingPage";
import './LandingPage.css';
import { Link } from 'react-router-dom';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APIUrl}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSuccess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [incomeAmt, expenseAmt],
        backgroundColor: ["#27ae60", "#c0392b"],
      },
    ],
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <div className="navbar">
        <h1>Welcome {loggedInUser}</h1>
        <div>
          <button onClick={handleLogout}>Logout</button>

        </div>
      </div>

      <div className="landing-container">

      {/* Hero Section */}
      <header className="landing-hero">
        <h1>Welcome to FinTrack</h1>
        <p>Track your expenses, visualize your spending, and manage your budget like a pro.</p>
        {/* <Link to="/login" className="cta-button">Get Started</Link> */}
        
      </header>

      {/* Feature Highlights */}
      <section className="features">
        <h2>Why Choose FinTrack?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Expense Tracking</h3>
            <p>Monitor your spending habits and stay in control of your finances.</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Charts</h3>
            <p>Visualize expenses by category, date, or amount with interactive graphs.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Budgeting</h3>
            <p>Set and manage budgets for different goals and categories.</p>
          </div>
          <div className="feature-card">
            <h3>Cloud Sync</h3>
            <p>Access your data anytime across devices with real-time sync.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Stay protected with JWT-based login and session management.</p>
          </div>
          <div className="feature-card">
            <h3>Mobile-Friendly</h3>
            <p>Use FinTrack on any device with our responsive design support.</p>
          </div>
        </div>
      </section>

      


      <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

      <ExpenseForm addTransaction={addTransaction} />

      <ExpenseTable expenses={expenses} deleteExpens={deleteExpens} />
      <ToastContainer />

      {/* <div className="pie-chart-section">
        <h2>Spending Breakdown</h2>
        <Pie data={chartData} />
      </div> */}

      <PieChart incomeAmt={incomeAmt} expenseAmt={expenseAmt} />

      {/* Contact Us Section */}
      <section className="contact-section" id="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-description">Have questions or suggestions? We'd love to hear from you!</p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-grid">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>


            {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 FinTrack. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}

export default Home;
