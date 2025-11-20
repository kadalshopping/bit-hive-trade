import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/micro-bitcoin-coin.jpg";

const TermsAndConditions = () => {
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
              Terms and Conditions
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="shadow-card">
            <CardContent className="prose prose-sm max-w-none p-4 sm:p-6 space-y-4 sm:space-y-6">
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Micro Bitcoin platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
                <p className="text-muted-foreground">
                  Micro Bitcoin is a Bitcoin investment platform that offers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Minimum investment starting from ₹100 INR</li>
                  <li>Fixed monthly returns of 3% calculated every 31 days</li>
                  <li>Additional profit from Bitcoin price appreciation</li>
                  <li>Withdrawals to registered Indian bank accounts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Investment Terms</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Minimum investment: ₹100 INR</li>
                  <li>5% gas fee applies to all transactions</li>
                  <li>Monthly returns are calculated 31 days from investment date</li>
                  <li>Bitcoin price fluctuations affect total returns</li>
                  <li>All investments are subject to market risks</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Obligations</h2>
                <p className="text-muted-foreground mb-2">You agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not use the platform for illegal activities</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Use only your own bank account for transactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Withdrawal Policy</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>All withdrawal requests require admin approval</li>
                  <li>5% gas fee applies to all withdrawals</li>
                  <li>Processing time: 1-3 business days for approval</li>
                  <li>Bank transfers take 2-5 business days</li>
                  <li>Withdrawals are processed to registered bank account only</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Risk Disclosure</h2>
                <p className="text-muted-foreground">
                  Cryptocurrency investments carry inherent risks. Bitcoin prices are volatile and can fluctuate significantly. Past performance does not guarantee future results. You should only invest what you can afford to lose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Micro Bitcoin is not liable for losses resulting from market volatility, technical issues, or circumstances beyond our control. We do not guarantee any specific returns or profits.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Account Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activities, or pose security risks.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, contact us at support@microbitcoin.com
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
