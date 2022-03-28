import {
  doc,
  setDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

function useSaveScan() {
  const db = getFirestore();

  // add scan to the db
  const createScan = (userId, recipeName, ingredients) =>
    setDoc(doc(db, `shopping-list-${userId}`, recipeName), ingredients, {
      merge: true,
    });

  // get shopping list of the user
  const getShoppingList = (userId) =>
    getDocs(collection(db, `shopping-list-${userId}`));

  // get weekly planer of a user
  const getWeeklyPlanner = (userId) =>
    getDocs(collection(db, `weekly-planner-${userId}`));

  return { createScan, getShoppingList, getWeeklyPlanner };
}

export default useSaveScan;
