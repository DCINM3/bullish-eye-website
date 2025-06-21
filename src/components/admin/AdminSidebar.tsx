'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Mail,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(
    pathname.startsWith('/admin/blogs')
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="py-6 px-6 border-b">
        <span className="font-bold text-xl text-blue-700">Bullish Eyes Admin</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}
        <SidebarLink
          href="/admin"
          icon={<LayoutDashboard className="w-5 h-5" />}
          active={pathname === '/admin'}
          label="Dashboard"
        />

        {/* Blog with Subtabs */}
        <div>
          <button
            className={clsx(
              'flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition',
              pathname.startsWith('/admin/blogs') && 'bg-blue-100 text-blue-700 font-semibold'
            )}
            onClick={() => setBlogOpen((o) => !o)}
          >
            <FileText className="w-5 h-5 mr-2" />
            Blog
            {blogOpen ? (
              <ChevronUp className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-auto" />
            )}
          </button>
          {blogOpen && (
            <div className="ml-7 mt-1 space-y-1">
              <SidebarLink
                href="/admin/blogs"
                icon={<FileText className="w-4 h-4" />}
                active={pathname === '/admin/blogs'}
                label="View All Blogs"
                small
              />
              <SidebarLink
                href="/admin/blogs/create"
                icon={<Plus className="w-4 h-4" />}
                active={pathname === '/admin/blogs/create'}
                label="Add Blog"
                small
              />
            </div>
          )}
        </div>

        {/* Newsletter */}
        <SidebarLink
          href="/admin/newsletter"
          icon={<Mail className="w-5 h-5" />}
          active={pathname === '/admin/newsletter'}
          label="Newsletter"
        />

        {/* Contact Data */}
        <SidebarLink
          href="/admin/contact"
          icon={<BarChart3 className="w-5 h-5" />}
          active={pathname === '/admin/contact'}
          label="Contact Data"
        />

        {/* Settings */}
        <SidebarLink
          href="/admin/settings"
          icon={<Settings className="w-5 h-5" />}
          active={pathname === '/admin/settings'}
          label="Settings"
        />
      </nav>
    </aside>
  );
}

// SidebarLink helper
function SidebarLink({
  href,
  icon,
  label,
  active,
  small,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center px-3 py-2 rounded-lg transition',
        small ? 'text-sm ml-1' : 'text-base',
        active
          ? 'bg-blue-100 text-blue-700 font-semibold'
          : 'text-gray-700 hover:bg-blue-50'
      )}
    >
      {icon}
      <span className={small ? 'ml-2' : 'ml-3'}>{label}</span>
    </Link>
  );
}
