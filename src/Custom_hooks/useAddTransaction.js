import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/Firebase-Setup";
import { useGetUser } from "./useGetUserInfo";

const useAddTransaction = () => {
  const collectionRef = collection(db, "transactions");
  const { userID } = useGetUser();

  

  const addTransaction = async (description, amount, type) => {
    await addDoc(collectionRef, {
      userID,
      description,
      amount,
      type,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};

export default useAddTransaction;
