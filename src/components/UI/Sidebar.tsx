'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/utils';
import { ClipboardList, FileDown, UserPlus, UserCircle, LayoutDashboard } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { LogOut } from 'lucide-react';
import React from 'react';

type User = {
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
};

const menuItems: Record<
  User['role'],
  { href: string; label: string; icon: React.ReactNode }[]
> = {
  admin: [
    {
      href: '/admin/protected/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: '/admin/protected/product-mnagement',
      label: 'Product Management',
      icon: <ClipboardList size={20} />,
    },
    {
      href: '/admin/protected/create-user',
      label: 'Create User',
      icon: <UserPlus size={20} />,
    },
    {
      href: '/admin/protected/profile',
      label: 'Profile',
      icon: <UserCircle size={20} />,
    },
  ],
  viewer: [
    {
      href: '/admin/protected/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: '/admin/protected/product-management',
      label: 'Product Management',
      icon: <ClipboardList size={20} />,
    },
    {
      href: '/admin/protected/profile',
      label: 'Profile',
      icon: <UserCircle size={20} />,
    },
  ],
  editor: [
    {
      href: '/admin/protected/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: '/admin/protected/product-management',
      label: 'Product Management',
      icon: <ClipboardList size={20} />,
    },
    {
      href: '/admin/protected/profile',
      label: 'Profile',
      icon: <UserCircle size={20} />,
    },
  ],
};

function getRandomColor(name?: string) {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-purple-500',
  ];
  if (!name || name.length === 0) return 'bg-gray-400';
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = user?.username?.charAt(0)?.toUpperCase() ?? 'U';
  const color = getRandomColor(user?.username);
  const items = menuItems[user.role] || [];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside className="w-16 min-h-screen bg-white border-r shadow-md flex flex-col items-center py-6 space-y-6">
      {/* Profile Avatar */}
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${color}`}
        >
          {initials}
        </div>
        <span
           className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
            user?.isActive === false ? 'bg-red-500' : 'bg-green-500'
        }`}
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col items-center space-y-4 flex-1">
        {[...items].map(({ href, label, icon }) => (
          <div key={href} data-tooltip-id={href} data-tooltip-content={label}>
            <button
              className={cn(
                'group p-3 rounded-lg transition',
                 pathname === href
                ? 'bg-pink-200 text-pink-600'
                : 'text-gray-600 hover:bg-pink-100 hover:text-pink-600'
            )}
              onClick={() => router.push(href)}
            >
              <span className="group-hover:scale-110 transition-transform">{icon}</span>
            </button>
            <Tooltip id={href} place="right" />
          </div>
        ))}

        {/* Logout Button */}
        <div data-tooltip-id="logout" data-tooltip-content="Logout">
          <button
            onClick={handleLogout}
            className="group p-3 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <Tooltip id="logout" place="right" />
        </div>
      </nav>
    </aside>
  );
}
