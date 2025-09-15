import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Meals', href: '/meals' },
  { name: 'Preferences', href: '/preferences' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col p-4">
      <div className="text-2xl font-bold text-blue-600 mb-8">MacMealMatch</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-lg text-gray-700 hover:text-blue-600 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 