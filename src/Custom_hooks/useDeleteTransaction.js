import { useState } from "react";
import { db } from "../Config/Firebase-Setup";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteTransaction = async (transactionID) => {
    setLoading(true);
    setError(null);
    try {
      const transactionRef = doc(db, "transactions", transactionID);
      await deleteDoc(transactionRef);
      console.log("Transaction deleted successfully.");
    } catch (err) {
      console.error("Error deleting transaction: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTransaction, loading, error };
};

export default useDeleteTransaction;
