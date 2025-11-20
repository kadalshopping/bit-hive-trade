import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/micro-bitcoin-coin.jpg";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="shadow-card">
            <CardContent className="prose prose-sm max-w-none pt-6 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-2">
                  We collect the following information when you use Micro Bitcoin:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Personal identification: Name, email address, phone number</li>
                  <li>Financial information: Bank account details, transaction history</li>
                  <li>Account data: Login credentials, investment records</li>
                  <li>Technical data: IP address, browser type, device information</li>
                  <li>Usage data: Platform interactions, feature usage patterns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-2">
                  Your information is used to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Process investments and withdrawals</li>
                  <li>Manage your account and provide customer support</li>
                  <li>Calculate and distribute monthly returns</li>
                  <li>Send transaction confirmations and updates</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Improve our services and user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
                <p className="text-muted-foreground mb-2">
                  We implement industry-standard security measures:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and updates</li>
                  <li>Secure payment gateway integration (Razorpay)</li>
                  <li>Multi-factor authentication support</li>
                  <li>Limited employee access to personal data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-2">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Payment processors (Razorpay) for transaction processing</li>
                  <li>Banking partners for withdrawal transfers</li>
                  <li>Legal authorities when required by law</li>
                  <li>Service providers who assist our operations</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience, analyze usage, and maintain security. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-2">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request data deletion (subject to legal requirements)</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Object to certain data uses</li>
                  <li>Export your data in portable format</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your information for as long as necessary to provide services and comply with legal obligations. Financial records are maintained for 7 years as per Indian regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links</h2>
                <p className="text-muted-foreground">
                  Our platform may contain links to third-party websites. We are not responsible for their privacy practices. Please review their privacy policies before providing any information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect information from minors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than India. We ensure appropriate safeguards are in place for such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Policy Updates</h2>
                <p className="text-muted-foreground">
                  We may update this privacy policy periodically. Changes will be posted on this page with an updated revision date. Continued use constitutes acceptance of changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy-related questions or to exercise your rights, contact us at:
                  <br />
                  Email: privacy@microbitcoin.com
                  <br />
                  Phone: +91 1800-123-4567
                  <br />
                  Address: Micro Bitcoin Pvt Ltd, Mumbai, Maharashtra, India - 400001
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
