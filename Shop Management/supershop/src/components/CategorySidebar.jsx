
export default function CategorySidebar({
  categories,
  active,
  onSelect,
  onAdd
}) {
  return (
    <aside className="lg:sticky lg:top-4">

      {/* Category Title */}
      <div className="bg-white border p-3">

        <h2 className="text-sm font-bold text-gray-500">
          CATEGORIES
        </h2>

        {/* Category List */}
        <nav className="mt-2 flex flex-col gap-2">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`text-left p-2 rounded ${
                category === active
                  ? "bg-gray-200 font-bold"
                  : "text-gray-500"
              }`}
            >
              {category}
            </button>
          ))}

        </nav>
      </div>

      {/* Add Product Button */}
      <button
        onClick={onAdd}
        className="mt-3 w-full bg-yellow-500 p-3 font-medium"
      >
        + Add Product
      </button>

    </aside>
  );
}
