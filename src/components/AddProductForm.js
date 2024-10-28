import React, { useState, useEffect } from 'react';

const AddProductForm = ({ onAddProduct, onCancel, initialData }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    title: '',
    description: '',
    category: '',
    price: '',
    rating: '',
    stock: ''
  });

  useEffect(() => {
    if (initialData) {
      setNewProduct(initialData);
    } else {
      setNewProduct({
        name: '',
        title: '',
        description: '',
        category: '',
        price: '',
        rating: '',
        stock: ''
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.description && newProduct.category && newProduct.price) {
      onAddProduct({ id: initialData ? initialData.id : Date.now(), ...newProduct });
      setNewProduct({
        name: '',
        title: '',
        description: '',
        category: '',
        price: '',
        rating: '',
        stock: ''
      });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="new-product-form">
      <form onSubmit={handleAddProduct}>
        <div className="input-container">
          <div>
            <label htmlFor="title">Product Name</label>
            <input
              type="text"
              name="title"
              id="title"
              className="input-field"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              className="input-field"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              className="input-field"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="input-field"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              id="rating"
              className="input-field"
              value={newProduct.rating}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="input-field"
              value={newProduct.stock}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="button-container">
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
