import Card from './card';

export default function EmployeeCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Card title="Available Assets" value={20} />
      <Card title="Total Requests" value={10} />
      <Card title="Pending Requests" value={3} />
    </div>
  );
}