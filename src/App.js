import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setCategories(data)
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setProducts(data.products)})
        .catch((error) => console.error(error));
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  return (
    <div>
      {' '}
      <label htmlFor="category-select">Select a category:</label>{' '}
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        {' '}
        <option value="">--Select a category--</option>{' '}
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}{' '}
      </select>{' '}
      {products.length > 0 && (
        <div>
          {' '}
          <h2>Products:</h2>{' '}
          <ul>
            {' '}
            {products.map((product, index) => (
              <li key={index}>{product.brand}</li>
            ))}{' '}
          </ul>{' '}
        </div>
      )}{' '}
    </div>
  );
}
