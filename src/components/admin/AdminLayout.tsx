import { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminAuthProvider, useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { PageLoader } from '@/components/ui/page-loader';
import { Navigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { user, loading, canView } = useAdminAuthContext();

  if (loading) {
    return <PageLoader />;
  }

  if (!user || !canView()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background dark flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </AdminAuthProvider>
  );
}
