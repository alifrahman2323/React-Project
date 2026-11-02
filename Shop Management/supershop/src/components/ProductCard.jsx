
import { useState } from "react";

import Header from "./components/Header";
import CategorySidebar from "./components/CategorySidebar";
import ProductCard from "./components/ProductCard";

import "./App.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Coca Cola",
      category: "Beverages",
      price: 40,
      stock: 20,
      reorder_level: 5,
    },
    {
      id: 2,
      name: "Chips",
      category: "Snacks",
      price: 30,
      stock: 10,
      reorder_level: 3,
    },
    {
      id: 3,
      name: "Rice",
      category: "Grocery",
      price: 70,
      stock: 15,
      reorder_level: 5,
    },
  ]);

  const [activeCategory, setActiveCategory] =
    useState("All Products");

  const [revenue, setRevenue] = useState(0);
  const [itemsSold, setItemsSold] = useState(0);

  const categories = [
    "All Products",
    ...new Set(products.map((product) => product.category)),
  ];

  // Sell one product
  function handleSell(productId) {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product || product.stock <= 0) return;

    setProducts((previousProducts) =>
      previousProducts.map((item) =>
        item.id === productId
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    );

    setRevenue((previousRevenue) =>
      previousRevenue + Number(product.price)
    );

    setItemsSold((previousItems) => previousItems + 1);
  }

  // Filter products by category
  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // Count products at or below reorder level
  const lowStock = products.filter(
    (product) => product.stock <= product.reorder_level
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        revenue={revenue}
        itemsSold={itemsSold}
        lowStock={lowStock}
      />

      <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <CategorySidebar
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
          onAdd={() => alert("Add Product form coming next")}
        />

        <main>
          <h2 className="text-xl font-bold mb-4">
            {activeCategory}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">
              No products found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSell={handleSell}
                  onEdit={(selectedProduct) => {
                    console.log("Edit product:", selectedProduct);
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
