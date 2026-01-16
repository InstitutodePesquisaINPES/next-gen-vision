import { ReactNode } from 'react';
import { AdminAuthProvider, useAdminAuthContext } from '@/contexts/AdminAuthContext';
import { PageLoader } from '@/components/ui/page-loader';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminAppSidebar } from './AdminAppSidebar';
import { AdminHeader } from './AdminHeader';

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background dark">
        <AdminAppSidebar />
        <SidebarInset className="flex-1">
          <AdminHeader />
          <main className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
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
