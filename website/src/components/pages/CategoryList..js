import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategories,setLoading,setError } from '../../store/slices/CategorySlice';
import  config  from "../../config";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categoryList, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get(`${config.baseURL}web/active-category`); // Replace with your API endpoint
     //   console.log("response-->",response);
        dispatch(setCategories(response.data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };

    fetchCategories();
  }, [dispatch]);

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {categoryList.map((category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
