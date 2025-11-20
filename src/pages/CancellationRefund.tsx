import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/micro-bitcoin-coin.jpg";

const CancellationRefund = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent pointer-events-none" />
      
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Micro Bitcoin" className="h-10 w-10 rounded-full shadow-glow" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Micro Bitcoin
            </span>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" className="shadow-primary">
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Cancellation and Refund Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="shadow-card">
            <CardContent className="prose prose-sm max-w-none p-4 sm:p-6 space-y-4 sm:space-y-6">
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">1. Investment Cancellation</h2>
                <p className="text-muted-foreground mb-2">
                  Due to the nature of cryptocurrency investments:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>All investments are final once payment is completed</li>
                  <li>You cannot cancel an investment after payment processing</li>
                  <li>Bitcoin is allocated immediately upon successful payment</li>
                  <li>Market fluctuations begin affecting your investment instantly</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Refund Policy</h2>
                <p className="text-muted-foreground mb-2">
                  Refunds are not available except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Payment gateway errors where money was deducted but investment not created</li>
                  <li>Duplicate transactions due to technical issues</li>
                  <li>Unauthorized transactions reported within 24 hours</li>
                  <li>Platform errors that prevented proper investment allocation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Refund Process</h2>
                <p className="text-muted-foreground mb-2">
                  If you qualify for a refund:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Contact support@microbitcoin.com immediately</li>
                  <li>Provide transaction details and proof of payment</li>
                  <li>Refund requests are reviewed within 3-5 business days</li>
                  <li>Approved refunds are processed to the original payment method</li>
                  <li>Refund processing takes 7-14 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Withdrawal vs Refund</h2>
                <p className="text-muted-foreground">
                  To access your invested funds and returns, use the withdrawal feature:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Submit withdrawal request through your dashboard</li>
                  <li>5% gas fee applies to all withdrawals</li>
                  <li>Admin approval required (1-3 business days)</li>
                  <li>Funds transferred to your registered bank account</li>
                  <li>Withdrawal includes your investment plus any earned returns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Transaction Fees</h2>
                <p className="text-muted-foreground">
                  The 5% gas fee charged on transactions is non-refundable as it covers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Blockchain transaction costs</li>
                  <li>Payment gateway charges</li>
                  <li>Platform operational expenses</li>
                  <li>Security and compliance costs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Disputed Transactions</h2>
                <p className="text-muted-foreground">
                  For disputed or unauthorized transactions:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Report within 24 hours to support@microbitcoin.com</li>
                  <li>Provide detailed information and evidence</li>
                  <li>Account may be temporarily suspended during investigation</li>
                  <li>Resolution typically within 7-10 business days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Market Loss</h2>
                <p className="text-muted-foreground">
                  Refunds are not provided for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Losses due to Bitcoin price decline</li>
                  <li>Dissatisfaction with returns or performance</li>
                  <li>Change of mind after investment</li>
                  <li>Market volatility or adverse price movements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
                <p className="text-muted-foreground">
                  For cancellation or refund queries, contact us at:
                  <br />
                  Email: support@microbitcoin.com
                  <br />
                  Phone: +91 1800-123-4567
                  <br />
                  Hours: Monday-Friday, 9AM-6PM IST
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CancellationRefund;
