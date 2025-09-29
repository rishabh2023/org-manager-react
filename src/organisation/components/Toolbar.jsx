export default function Toolbar({ children, right }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
      <div className="text-lg font-semibold">Organizations</div>
      <div className="flex items-center gap-2">
        {children}
        {right}
      </div>
    </div>
  );
}
