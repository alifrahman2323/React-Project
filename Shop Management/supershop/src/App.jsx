import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useShop } from "./hooks/useShop";
import Header from "./components/Header";
import CategorySidebar from "./components/CategorySidebar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import SalesHistory from "./components/SalesHistory";

function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shop = useShop();
  const [modal, setModal] = useState({ open: false, product: null });

  const { setActiveCategory } = shop;

  // The URL decides which category is active, so refreshing the page keeps it
  useEffect(() => {
    if (pathname.startsWith("/category/")) {
      setActiveCategory(decodeURIComponent(pathname.replace("/category/", "")));
    } else if (pathname === "/") {
      setActiveCategory("All");
    }
  }, [pathname, setActiveCategory]);

  const openModal = (product = null) => setModal({ open: true, product });
  const closeModal = () => setModal({ open: false, product: null });

  function handleCategorySelect(category) {
    navigate(category === "All" ? "/" : `/category/${encodeURIComponent(category)}`);
  }

  const products = (
    <>
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <h2 className="text-xl font-semibold">
          {shop.activeCategory === "All" ? "All products" : shop.activeCategory}
        </h2>
        <input
          value={shop.search}
          onChange={(e) => shop.setSearch(e.target.value)}
          placeholder="Find a product…"
          className="px-3 py-1.5 text-sm border border-line w-56"
        />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {shop.visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} onSell={shop.sell} onEdit={openModal} />
        ))}
      </div>

      {shop.visibleProducts.length === 0 && (
        <p className="text-sm text-gray-500 mt-6">No products found.</p>
      )}
    </>
  );

  return (
    <>
      <Header
        revenue={shop.today.summary.revenue}
        itemsSold={shop.today.summary.itemsSold}
        lowStock={shop.lowStockCount}
      />

      {shop.error && (
        <div className="bg-red-100 text-red-800 text-sm px-5 py-2">{shop.error}</div>
      )}

      <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <CategorySidebar
          categories={shop.categories}
          active={shop.activeCategory}
          onSelect={handleCategorySelect}
          onAdd={() => openModal()}
        />

        <main>
          <nav className="flex gap-4 text-sm mb-4">
            <Link to="/" className="underline">Products</Link>
            <Link to="/sales" className="underline">Sales history</Link>
          </nav>

          <Routes>
            <Route path="/" element={products} />
            <Route path="/category/:category" element={products} />
            <Route path="/sales" element={<SalesHistory sales={shop.today.sales} />} />
          </Routes>
        </main>
      </div>

      <ProductModal
        open={modal.open}
        product={modal.product}
        categories={shop.categories}
        onSave={shop.saveProduct}
        onDelete={shop.removeProduct}
        onClose={closeModal}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}