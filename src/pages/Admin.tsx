import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { signOut } from '@/lib/auth';
import { Bitcoin, Users, TrendingUp, DollarSign, LogOut, Settings, ArrowDownToLine } from 'lucide-react';
import logo from '@/assets/micro-bitcoin-logo.jpg';

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
  total_btc?: number;
  bank_account_number?: string;
}

interface Payout {
  id: string;
  user_id: string;
  amount_inr: number;
  payout_type: string;
  status: string;
  created_at: string;
  bank_account_number: string;
  bank_ifsc_code: string;
  user_name?: string;
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
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [btcAddress, setBtcAddress] = useState('');

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
    // Load users with their investments
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      toast.error('Failed to load users');
    } else {
      // Load investment data for each user
      const usersWithInvestments = await Promise.all(
        (profilesData || []).map(async (profile) => {
          const { data: investmentsData } = await supabase
            .from('investments')
            .select('amount_usd, btc_amount')
            .eq('user_id', profile.id)
            .eq('status', 'active');

          const totalInvested = investmentsData?.reduce((sum, inv) => sum + Number(inv.amount_usd), 0) || 0;
          const totalBtc = investmentsData?.reduce((sum, inv) => sum + Number(inv.btc_amount), 0) || 0;

          return {
            ...profile,
            total_invested: totalInvested,
            total_btc: totalBtc,
          };
        })
      );
      setUsers(usersWithInvestments);
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

    // Load payouts with user names
    const { data: payoutsData, error: payoutsError } = await supabase
      .from('payouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!payoutsError && payoutsData) {
      // Fetch user names for each payout
      const payoutsWithNames = await Promise.all(
        payoutsData.map(async (payout) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', payout.user_id)
            .single();
          
          return {
            ...payout,
            user_name: profileData?.full_name || 'Unknown User',
          };
        })
      );
      setPayouts(payoutsWithNames);
    }

    // Load BTC address
    const { data: settingsData } = await supabase
      .from('platform_settings')
      .select('setting_value')
      .eq('setting_key', 'btc_deposit_address')
      .single();

    if (settingsData) {
      setBtcAddress(settingsData.setting_value);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleUpdateBtcAddress = async () => {
    const { error } = await supabase
      .from('platform_settings')
      .update({ setting_value: btcAddress })
      .eq('setting_key', 'btc_deposit_address');

    if (error) {
      toast.error('Failed to update BTC address');
    } else {
      toast.success('BTC address updated successfully');
    }
  };

  const handleApprovePayonet = async (payoutId: string) => {
    const { error } = await supabase
      .from('payouts')
      .update({ status: 'completed', processed_at: new Date().toISOString() })
      .eq('id', payoutId);

    if (error) {
      toast.error('Failed to approve payout');
    } else {
      toast.success('Payout approved');
      loadAdminData();
    }
  };

  const handleRejectPayout = async (payoutId: string) => {
    const { error } = await supabase
      .from('payouts')
      .update({ status: 'failed', processed_at: new Date().toISOString() })
      .eq('id', payoutId);

    if (error) {
      toast.error('Failed to reject payout');
    } else {
      toast.success('Payout rejected');
      loadAdminData();
    }
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
          <div className="flex items-center gap-3">
            <img src={logo} alt="Micro Bitcoin" className="h-12 w-12 rounded-full object-cover" />
            <h1 className="text-xl font-bold">Micro Bitcoin Admin</h1>
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

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
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
                            <th className="text-left py-3 px-4 font-medium">Balance (USD)</th>
                            <th className="text-left py-3 px-4 font-medium">BTC</th>
                            <th className="text-left py-3 px-4 font-medium">Bank Account</th>
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
                                ${(user.total_invested || 0).toFixed(2)}
                              </td>
                              <td className="py-3 px-4">
                                {(user.total_btc || 0).toFixed(8)}
                              </td>
                              <td className="py-3 px-4">
                                {user.bank_account_number ? (
                                  <code className="text-xs bg-muted px-2 py-1 rounded">
                                    {user.bank_account_number.slice(-4).padStart(user.bank_account_number.length, '*')}
                                  </code>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Not set</span>
                                )}
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
          </TabsContent>

          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownToLine className="h-5 w-5" />
                  Payout Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {payouts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No payout requests</p>
                ) : (
                  <div className="space-y-4">
                    {payouts.map((payout) => (
                      <div 
                        key={payout.id} 
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="font-semibold">
                              {payout.user_name || 'Unknown User'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Amount: ₹{Number(payout.amount_inr).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Type: {payout.payout_type}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Requested: {new Date(payout.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Badge 
                            className={
                              payout.status === 'completed' ? 'bg-success' :
                              payout.status === 'pending' ? 'bg-warning' :
                              'bg-destructive'
                            }
                          >
                            {payout.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm space-y-1">
                          <p className="text-muted-foreground">
                            Account: {payout.bank_account_number}
                          </p>
                          <p className="text-muted-foreground">
                            IFSC: {payout.bank_ifsc_code}
                          </p>
                        </div>

                        {payout.status === 'pending' && (
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleApprovePayonet(payout.id)}
                              className="flex-1"
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectPayout(payout.id)}
                              className="flex-1"
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="btc-address">BTC Deposit Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="btc-address"
                      value={btcAddress}
                      onChange={(e) => setBtcAddress(e.target.value)}
                      placeholder="Enter BTC address"
                    />
                    <Button onClick={handleUpdateBtcAddress}>
                      Update
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This address will be shown to users for deposits
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
