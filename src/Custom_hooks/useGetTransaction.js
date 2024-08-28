import { db } from "../Config/Firebase-Setup";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import useGetUser from "./useGetUserInfo";

const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userID } = useGetUser();
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);

  const calculateTotals = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpense += transaction.amount;
      }
    });

    // Update the state with the calculated totals
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  const getTransactions = () => {
    const collectionRef = collection(db, "transactions");

    try {
      const queryTransaction = query(
        collectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      const unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
        let docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(docs);
        calculateTotals(docs); // Calculate totals whenever transactions are updated
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getTransactions();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userID]);

  return { transactions, balance, income, expense };
};

export default useGetTransactions;
