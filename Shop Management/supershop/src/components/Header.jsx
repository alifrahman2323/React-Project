
export default function Header({ revenue, itemsSold, lowStock }) {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center flex-wrap gap-4">

        {/* Shop Name */}
        <h1 className="text-2xl font-bold">
        Super Shop
        </h1>

        {/* Shop Statistics */}
        <div className="flex gap-6">

          <div>
            <p className="text-sm text-gray-400">
              Today's Sales
            </p>
            <h2 className="text-xl font-bold">
              ৳{revenue}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Items Sold
            </p>
            <h2 className="text-xl font-bold">
              {itemsSold}
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-400">
              Low Stock
            </p>
            <h2 className="text-xl font-bold">
              {lowStock}
            </h2>
          </div>

        </div>
      </div>
    </header>
  );
}
