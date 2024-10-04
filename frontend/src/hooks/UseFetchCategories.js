import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../url";

const useFetchCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/filter/all-categories`);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return { categoriesList };
};

export default useFetchCategories;
