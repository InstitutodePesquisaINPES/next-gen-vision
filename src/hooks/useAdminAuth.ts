import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type AppRole = 'admin' | 'editor' | 'visualizador';

interface UserRole {
  role: AppRole;
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserRoles = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching roles:', error);
      return [];
    }

    return (data as UserRole[]).map((r) => r.role);
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer role fetching with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchUserRoles(session.user.id).then(setRoles);
          }, 0);
        } else {
          setRoles([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserRoles(session.user.id).then((userRoles) => {
          setRoles(userRoles);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRoles]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      return { error };
    }

    // Check if user has any admin role
    const userRoles = await fetchUserRoles(data.user.id);
    if (userRoles.length === 0) {
      await supabase.auth.signOut();
      setLoading(false);
      return { error: { message: 'Você não tem permissão para acessar o painel administrativo.' } };
    }

    setRoles(userRoles);
    setLoading(false);
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const redirectUrl = `${window.location.origin}/admin`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);
    if (error) {
      return { error };
    }

    toast.success('Conta criada! Verifique seu email para confirmar.');
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoles([]);
    navigate('/admin/login');
  };

  const hasRole = (role: AppRole): boolean => {
    return roles.includes(role);
  };

  const isAdmin = (): boolean => hasRole('admin');
  const isEditor = (): boolean => hasRole('editor') || hasRole('admin');
  const canView = (): boolean => roles.length > 0;

  return {
    user,
    session,
    roles,
    loading,
    signIn,
    signUp,
    signOut,
    hasRole,
    isAdmin,
    isEditor,
    canView,
  };
}
