import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import AddProductForm from './AddProductForm';
import Modal from './Modal';
import GraphPage from './GraphPage'; 

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState('management'); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? newProduct : p)));
      setEditingProduct(null);
    } else {
      setProducts((prev) => [...prev, newProduct]);
    }
    setShowForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarVisible ? '<' : '>'}
        </button>
        {isSidebarVisible && (
          <aside style={{marginTop:'120px'}} className="sidebar-content">
            <p style={{cursor:'pointer', margin:'20px'}} onClick={() => setCurrentPage('management')}>Management</p>
            <p style={{cursor:'pointer'}} onClick={() => setCurrentPage('threatIntelligence')}>Threat Intelligence</p>
          </aside>
        )}
      </div>

      <div className="main-content">
        {currentPage === 'management' ? (
          <div>
            <header className="header">
              <h1>Management</h1>
              <br />
            </header>

            <div className="data-center-header">
              <h2>Data Center</h2>
              <button className="add-button" onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}>Add New +</button>
            </div>

            <Modal isOpen={showForm} onClose={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}>
              <AddProductForm
                onAddProduct={handleAddProduct}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                initialData={editingProduct}
              />
            </Modal>

            <section className="data-center">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7">Error: {error}</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{product.description || 'No description available'}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.rating}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-button" onClick={() => handleEditProduct(product)}>✏️</button>
                            <button className="delete-button">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>
          </div>
        ) : (
          <GraphPage /> 
        )}
      </div>
    </div>
  );
};

export default Dashboard;
