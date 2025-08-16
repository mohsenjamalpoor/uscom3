export default function ParameterCard({ parameter, onValueChange, darkMode }) {
  const { id, title, value, unit, normalRange, isCritical } = parameter;

  return (
    <div
      className={`p-3 rounded-lg border ${
        isCritical ? "border-red-500" : "border-transparent"
      } ${darkMode ? "bg-gray-700" : "bg-white shadow-sm"}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{unit}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded ${
            isCritical
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {normalRange}
        </span>
      </div>

      <div className="mt-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onValueChange(id, e.target.value)}
          className={`w-full p-2 rounded border ${
            darkMode
              ? "bg-gray-600 border-gray-500 text-white"
              : "bg-white border-gray-300"
          } ${isCritical ? "ring-1 ring-red-500" : ""}`}
        />
      </div>

      <div className="mt-1 text-xs">
        {isCritical && (
          <span className="text-red-500">مقدار خارج از محدوده نرمال</span>
        )}
      </div>
    </div>
  );
}
