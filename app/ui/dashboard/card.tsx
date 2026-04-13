type CardProps = {
  title: string;
  value: number;
};

export default function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-blue-600">{value}</p>
    </div>
  );
}