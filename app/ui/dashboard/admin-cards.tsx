import Card from './card';

export default function AdminCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card title="Total Assets" value={120} />
      <Card title="Allocated Assets" value={80} />
      <Card title="Remaining Assets" value={40} />
    </div>
  );
}