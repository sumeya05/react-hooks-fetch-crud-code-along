// src/components/ShoppingList.js
import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";
import Filter from "./Filter"; // Optional, if you're implementing category filter

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // GET items on load
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Add new item
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // Update item
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // Delete item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      category={selectedCategory}
      onCategoryChange={setSelectedCategory}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
