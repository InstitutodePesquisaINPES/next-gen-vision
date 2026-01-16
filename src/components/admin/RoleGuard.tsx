import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuthContext, AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { AppRole } from '@/hooks/useAdminAuth';
import { PageLoader } from '@/components/ui/page-loader';

interface RoleGuardProps {
  children: ReactNode;
  requiredRole?: AppRole;
  fallback?: ReactNode;
}

function RoleGuardContent({ children, requiredRole, fallback }: RoleGuardProps) {
  const { user, loading, hasRole, canView } = useAdminAuthContext();

  if (loading) {
    return <PageLoader />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // No admin roles at all
  if (!canView()) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check specific role if required
  if (requiredRole && !hasRole(requiredRole) && !hasRole('admin')) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Acesso Negado</h2>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function RoleGuard(props: RoleGuardProps) {
  return (
    <AdminAuthProvider>
      <RoleGuardContent {...props} />
    </AdminAuthProvider>
  );
}

export function AdminOnlyGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard requiredRole="admin">
      {children}
    </RoleGuard>
  );
}

export function EditorGuard({ children }: { children: ReactNode }) {
  return (
    <RoleGuard requiredRole="editor">
      {children}
    </RoleGuard>
  );
}
