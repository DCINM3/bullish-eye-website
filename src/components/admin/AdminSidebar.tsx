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
  Package,
  Users,
  MessageSquare,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { AdminRole, hasPermission } from '@/types/admin';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(pathname.startsWith('/secure-admin/blogs'));
  const [productsOpen, setProductsOpen] = useState(pathname.startsWith('/secure-admin/products'));
  const [adminRole, setAdminRole] = useState<AdminRole | undefined>(undefined);

  useEffect(() => {
    // Fetch admin data on mount
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/admin/auth', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.admin?.role) {
            setAdminRole(data.admin.role);
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  if (!adminRole) return null;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="py-6 px-6 border-b">
        <span className="font-bold text-xl text-blue-700">Bullish Eyes Admin</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard */}
        <SidebarLink
          href="/secure-admin"
          icon={<LayoutDashboard className="w-5 h-5" />}
          active={pathname === '/secure-admin'}
          label="Dashboard"
        />

        {/* Admin Management - Super Admin Only */}
        {hasPermission(adminRole, 'admin_management') && (
          <SidebarLink
            href="/secure-admin/admins"
            icon={<Users className="w-5 h-5" />}
            active={pathname.startsWith('/secure-admin/admins')}
            label="Admin Management"
          />
        )}

        {/* Blog with Subtabs */}
        {hasPermission(adminRole, 'blog_management') && (
          <div>
            <button
              className={clsx(
                'flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition',
                pathname.startsWith('/secure-admin/blogs') && 'bg-blue-100 text-blue-700 font-semibold'
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
                  href="/secure-admin/blogs"
                  icon={<FileText className="w-4 h-4" />}
                  active={pathname === '/secure-admin/blogs'}
                  label="View All Blogs"
                  small
                />
                <SidebarLink
                  href="/secure-admin/blogs/create"
                  icon={<Plus className="w-4 h-4" />}
                  active={pathname === '/secure-admin/blogs/create'}
                  label="Add Blog"
                  small
                />
                <SidebarLink
                  href="/secure-admin/blogs/comments"
                  icon={<MessageSquare className="w-4 h-4" />}
                  active={pathname === '/secure-admin/blogs/comments'}
                  label="Manage Comments"
                  small
                />
              </div>
            )}
          </div>
        )}

        {/* Products with Subtabs */}
        {hasPermission(adminRole, 'product_management') && (
          <div>
            <button
              className={clsx(
                'flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition',
                pathname.startsWith('/secure-admin/products') && 'bg-blue-100 text-blue-700 font-semibold'
              )}
              onClick={() => setProductsOpen((o) => !o)}
            >
              <Package className="w-5 h-5 mr-2" />
              Products
              {productsOpen ? (
                <ChevronUp className="w-4 h-4 ml-auto" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-auto" />
              )}
            </button>
            {productsOpen && (
              <div className="ml-7 mt-1 space-y-1">
                <SidebarLink
                  href="/secure-admin/products"
                  icon={<Package className="w-4 h-4" />}
                  active={pathname === '/secure-admin/products'}
                  label="View All Products"
                  small
                />
                <SidebarLink
                  href="/secure-admin/products/create"
                  icon={<Plus className="w-4 h-4" />}
                  active={pathname === '/secure-admin/products/create'}
                  label="Add Product"
                  small
                />
              </div>
            )}
          </div>
        )}

        {/* Newsletter */}
        {hasPermission(adminRole, 'newsletter_management') && (
          <SidebarLink
            href="/secure-admin/newsletter"
            icon={<Mail className="w-5 h-5" />}
            active={pathname === '/secure-admin/newsletter'}
            label="Newsletter"
          />
        )}

        {/* Contact Data */}
        {hasPermission(adminRole, 'contact_management') && (
          <SidebarLink
            href="/secure-admin/contact"
            icon={<BarChart3 className="w-5 h-5" />}
            active={pathname === '/secure-admin/contact'}
            label="Contact Data"
          />
        )}
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
