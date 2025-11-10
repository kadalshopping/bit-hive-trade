import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth';
import { Bitcoin, Users, TrendingUp, DollarSign, LogOut } from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalInvestments: number;
  totalVolume: number;
  totalTransactions: number;
}

interface UserData {
  id: string;
  full_name: string;
  created_at: string;
  total_invested?: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalInvestments: 0,
    totalVolume: 0,
    totalTransactions: 0,
  });
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'admin') {
      loadAdminData();
    }
  }, [user, userRole]);

  const loadAdminData = async () => {
    // Load users
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      toast.error('Failed to load users');
    } else {
      setUsers(profilesData || []);
    }

    // Load investments stats
    const { data: investmentsData, error: investmentsError } = await supabase
      .from('investments')
      .select('amount_usd, status');

    if (!investmentsError && investmentsData) {
      const activeInvestments = investmentsData.filter(inv => inv.status === 'active');
      setStats(prev => ({
        ...prev,
        totalInvestments: activeInvestments.length,
        totalVolume: activeInvestments.reduce((sum, inv) => sum + Number(inv.amount_usd), 0),
      }));
    }

    // Load transactions count
    const { data: transactionsData, error: transactionsError } = await supabase
      .from('transactions')
      .select('id', { count: 'exact' });

    if (!transactionsError) {
      setStats(prev => ({
        ...prev,
        totalTransactions: transactionsData?.length || 0,
      }));
    }

    // Set total users
    if (profilesData) {
      setStats(prev => ({
        ...prev,
        totalUsers: profilesData.length,
      }));
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Bitcoin className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">BitInvest Admin</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestments}</div>
              <p className="text-xs text-muted-foreground">Current positions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalVolume.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">USD invested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <Bitcoin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              <p className="text-xs text-muted-foreground">Total operations</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-left py-3 px-4 font-medium">User ID</th>
                        <th className="text-left py-3 px-4 font-medium">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4">{user.full_name}</td>
                          <td className="py-3 px-4">
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {user.id.slice(0, 8)}...
                            </code>
                          </td>
                          <td className="py-3 px-4">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
