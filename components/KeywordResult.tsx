type Props = {
  title: string;
  items: string[];
  type: "success" | "danger";
};

export default function KeywordResult({ title, items, type }: Props) {
  const color =
    type === "success"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-red-200 bg-red-50 text-red-700";

  return (
    <div className={`border rounded-xl p-5 ${color}`}>
      <h3 className="font-semibold mb-3">{title}</h3>

      {items.length === 0 ? (
        <p className="text-sm opacity-70">None</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-sm bg-white rounded border"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
