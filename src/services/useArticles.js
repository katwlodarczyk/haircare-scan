import { collection, getDocs, getDoc, getFirestore } from "firebase/firestore";

function useArticles() {
  const db = getFirestore();
  const ref = collection(db, "articles");

  // get all articles in the collection
  const getArticles = () => getDocs(ref);

  // get article based on ID
  const getArticle = (id) => {
    const ref = collection(db, "articles", id);
    return getDoc(ref);
  };

  return { getArticles, getArticle };
}

export default useArticles;
