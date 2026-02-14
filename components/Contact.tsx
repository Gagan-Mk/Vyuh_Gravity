"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const formAnim = useScrollAnimation({ threshold: 0.1 });
  const infoAnim = useScrollAnimation({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdMUhpYeAmAfUiIymiL7FyOD3OdVt3e6eovypzRV9DvrtEjuA/formResponse";

    const formBody = new URLSearchParams({
      "entry.1598230340": formData.name,
      "entry.1600366442": formData.email,
      "entry.1736626078": formData.company,
      "entry.1835350331": formData.message,
    });

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
    } catch {
      // Google Forms doesn't return a readable response in no-cors mode,
      // but the submission still goes through
    }

    setIsLoading(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-background to-muted/10 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            Get in Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to protect your reputation?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a free reputation audit and see how we can help you take control
          </p>
        </div>

        <div
          ref={formAnim.ref}
          className={`max-w-2xl mx-auto scroll-scale-in ${formAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Card className="p-8 shadow-2xl border-2 relative overflow-hidden glow-border">
            {/* Success overlay */}
            {isSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in zoom-in">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                  <p className="text-white/90">
                    We&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="h-12 bg-background/50"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Work email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="h-12 bg-background/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-foreground"
                >
                  Company name *
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Acme Inc."
                  className="h-12 bg-background/50"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Tell us about your needs
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="I'm interested in learning more about..."
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all relative overflow-hidden"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  </>
                ) : (
                  "Get your free audit"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our privacy policy. We&apos;ll never share your information.
              </p>
            </form>
          </Card>
        </div>

        {/* Additional contact options */}
        <div
          ref={infoAnim.ref}
          className={`mt-16 grid md:grid-cols-2 gap-8 max-w-2xl mx-auto stagger-children`}
        >
          <div className={`text-center scroll-fade-in ${infoAnim.isVisible ? 'is-visible' : ''}`}>
            <div className="text-3xl mb-2">📧</div>
            <h4 className="font-semibold mb-1">Email us</h4>
            <p className="text-sm text-muted-foreground">
              team@vyuhgravity.com
            </p>
          </div>
          <div className={`text-center scroll-fade-in ${infoAnim.isVisible ? 'is-visible' : ''}`}>
            <div className="text-3xl mb-2">📞</div>
            <h4 className="font-semibold mb-1">Call us</h4>
            <p className="text-sm text-muted-foreground">
              +91 96868 46216
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
