import React, { useState } from 'react';
import './App.css';

function App() {
  // State for the list of items
  const [items, setItems] = useState([
    { id: 1, name: "Learn React Basics" },
    { id: 2, name: "Master useState Hook" },
    { id: 3, name: "Practice List Rendering" }
  ]);

  // State for new item input
  const [newItemName, setNewItemName] = useState("");

  // Function to add a new item
  const addItem = () => {
    if (newItemName.trim() === "") return; // Prevent empty items

    const newItem = {
      id: Date.now(), // Unique ID using timestamp
      name: newItemName.trim()
    };

    setItems([...items, newItem]);
    setNewItemName(""); // Clear input field
  };

  // Function to remove an item
  const removeItem = (idToRemove) => {
    setItems(items.filter(item => item.id !== idToRemove));
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Dynamic List Manager</h1>
        <p className="subtitle">Add and Remove Items • Demonstrates List Rendering + Keys</p>

        {/* Add New Item Section */}
        <div className="add-section">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter new item name..."
            className="item-input"
          />
          <button onClick={addItem} className="add-btn">
            Add Item
          </button>
        </div>

        {/* List Display Section */}
        <div className="list-section">
          <h2>Items List ({items.length})</h2>

          {items.length === 0 ? (
            <div className="empty-state">
              <p>No items in the list. Add some above!</p>
            </div>
          ) : (
            <ul className="item-list">
              {items.map((item) => (
                <li key={item.id} className="list-item">
                  <span className="item-name">{item.name}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;