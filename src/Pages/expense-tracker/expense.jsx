import { useState } from "react";
import "./expense.css";
import useAddTransaction from "../../Custom_hooks/useAddTransaction";
import useGetUser from "../../Custom_hooks/useGetUserInfo";
import useGetTransactions from "../../Custom_hooks/useGetTransaction";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/Firebase-Setup";
import { useNavigate } from "react-router-dom";
import useDeleteTransaction from '../../Custom_hooks/useDeleteTransaction'
import Navbar from "../../Navbar/Navbar";
function Expense() {
  const { addTransaction } = useAddTransaction(); // Corrected function name
  const { deleteTransaction} = useDeleteTransaction()
  const { userID, photoURL } = useGetUser(); // Get userID from hook
  const { transactions = [], balance, income, expense } = useGetTransactions(); // Ensure transactions is an array by default
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const navigate = useNavigate();

  const signUserOut = async () => {
    try {
      signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    if (!description.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      console.error(
        "Invalid input. Please enter a valid description and amount."
      );
      return;
    }

    if (!userID) {
      console.error("User is not authenticated, cannot add transaction.");
      return;
    }

    try {
      await addTransaction(description, parseFloat(amount), type);
      console.log("Transaction added");
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      console.log("Transaction deleted");
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="expense-tracker">

        <div className="expense">
          <div className="info">
            {/* {Current Balance income and Expense} */}
            <div className="expense-data">
              <div className="balance">
                <h1>Current Balance: </h1>
                <label htmlFor="">
                  <span>${balance}</span>
                </label>
              </div>
              <div className="income">
                <h1>Total Income: </h1>
                <label htmlFor="">
                  <span>${income}</span>
                </label>
              </div>
              <div className="total-expense">
                <h1>Total Expense: </h1>
                <label htmlFor="">
                  <span>${expense}</span>
                </label>
              </div>
            </div>
            <div className="profile">
              <div>
                
                <img src={photoURL} alt="No Profile Photo" />
              </div>
              <div>
                <button className="Btn" onClick={signUserOut}>
                  <div className="sign">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>

                  <div className="text">Logout</div>
                </button>
              </div>
            </div>
          </div>
          <div className="enter-expense">
            <h2>Enter Expense</h2>
            <form className="add-transaction" onSubmit={onSubmit}>
              <div className="amount">
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="radio-btn">
                <div className="radio-input-wrapper">
                  <label className="label">
                    <input
                      value="expense"
                      name="value-radio"
                      id="expense"
                      className="radio-input"
                      type="radio"
                      checked={type === "expense"} // Check if type is "expense"
                      onChange={() => setType("expense")} // Set type to "expense"
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">Expense</div>
                  </label>
                  <label className="label">
                    <input
                      value="income"
                      name="value-radio"
                      id="income"
                      className="radio-input"
                      type="radio"
                      checked={type === "income"} // Check if type is "income"
                      onChange={() => setType("income")} // Set type to "income"
                    />
                    <div className="radio-design"></div>
                    <div className="label-text">Income</div>
                  </label>
                </div>
              </div>
              <div className="submit-btn">
                <button>
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        className="icon"
                      >
                        <path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path>
                      </svg>
                    </div>
                  </div>
                  <span>Add Transaction</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="transaction-list">
          <div className="list-heading">
            <h2>Transaction List</h2>
          </div>
          <div className="list-data">
            {transactions.length === 0 ? (
              <p>No transactions available.</p>
            ) : (
              <ul className="list">
                {transactions.map((transaction) => {
                  const { id, description, amount, type } = transaction;
                  return (
                    <li key={id} className="item">
                      <div className="disc">
                        <h3>{description}</h3>
                      </div>
                      <p className="types">
                        <span className="list-amount">{amount}/-</span>
                        <span
                          style={{
                            color: type === "expense" ? "tomato" : "lightgreen",
                          }}
                        >
                          {type}
                        </span>

                        <button className="delete-button" onClick={() => handleDeleteTransaction(id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            className="svgIcon bin-top"
                          >
                            <g clip-path="url(#clip0_35_24)">
                              <path
                                fill="black"
                                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_24">
                                <rect
                                  fill="white"
                                  height="14"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            className="svgIcon bin-bottom"
                          >
                            <g clip-path="url(#clip0_35_22)">
                              <path
                                fill="black"
                                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_22">
                                <rect
                                  fill="white"
                                  height="57"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
