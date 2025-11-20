import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/micro-bitcoin-coin.jpg";

const ShippingPolicy = () => {
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

      <main className="container py-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Shipping Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="shadow-card">
            <CardContent className="prose prose-sm max-w-none pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Digital Service</h2>
                <p className="text-muted-foreground">
                  Micro Bitcoin is a digital investment platform. We do not ship physical products. All our services are delivered electronically through our online platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Service Delivery</h2>
                <p className="text-muted-foreground mb-2">
                  Upon successful payment and account verification:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Your investment will be processed immediately</li>
                  <li>Bitcoin will be allocated to your account within 24 hours</li>
                  <li>You will receive email confirmation of your investment</li>
                  <li>Your dashboard will reflect the updated investment details</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Withdrawal Processing</h2>
                <p className="text-muted-foreground mb-2">
                  For withdrawal requests:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Requests are reviewed within 1-3 business days</li>
                  <li>Approved withdrawals are processed to your registered bank account</li>
                  <li>Bank transfers typically take 2-5 business days</li>
                  <li>You will receive notifications at each step</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground">
                  For any questions regarding our service delivery, please contact us at support@microbitcoin.com
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ShippingPolicy;
