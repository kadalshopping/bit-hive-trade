import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Percent } from 'lucide-react';

interface EarningsCardProps {
  totalInvestedInr: number;
  monthlyReturnInr: number;
  btcProfitInr: number;
  totalEarningsInr: number;
}

export const EarningsCard = ({ 
  totalInvestedInr, 
  monthlyReturnInr, 
  btcProfitInr, 
  totalEarningsInr 
}: EarningsCardProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">3% Monthly Returns</CardTitle>
          <Percent className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">₹{monthlyReturnInr.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Fixed monthly earnings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">BTC Price Profit</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${btcProfitInr >= 0 ? 'text-success' : 'text-destructive'}`}>
            {btcProfitInr >= 0 ? '+' : ''}₹{btcProfitInr.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">From BTC price changes</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-success">₹{totalEarningsInr.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Monthly Returns + BTC Profit on ₹{totalInvestedInr.toFixed(2)} invested
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
