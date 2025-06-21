'use client';

import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthWrapper>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </AdminAuthWrapper>
  );
}
