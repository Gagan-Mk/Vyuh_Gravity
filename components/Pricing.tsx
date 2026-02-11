"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const plans = [
  {
    name: "Starter",
    price: "$2,499",
    period: "/month",
    description: "Perfect for growing companies looking to monitor their reputation",
    popular: false,
    features: [
      {
        name: "Up to 5,000 mentions/month",
        tooltip: "We track and analyze up to 5,000 brand mentions across all sources",
      },
      {
        name: "News & social monitoring",
        tooltip: "Coverage across major news outlets and social media platforms",
      },
      {
        name: "Daily sentiment reports",
        tooltip: "Automated daily reports showing sentiment trends and key metrics",
      },
      {
        name: "Basic playbook library",
        tooltip: "Access to pre-built response templates for common scenarios",
      },
      {
        name: "Email support (48h response)",
        tooltip: "Dedicated support team responds within 48 hours",
      },
      {
        name: "3 user seats",
        tooltip: "Up to 3 team members can access the platform",
      },
    ],
    cta: "Start monitoring",
    color: "border-border",
  },
  {
    name: "Growth",
    price: "$7,999",
    period: "/month",
    description: "For established brands requiring proactive reputation management",
    popular: true,
    features: [
      {
        name: "Up to 25,000 mentions/month",
        tooltip: "Comprehensive tracking across all major and niche sources",
      },
      {
        name: "Full-spectrum monitoring",
        tooltip: "News, social, forums, reviews, podcasts, and video platforms",
      },
      {
        name: "Real-time alerts & insights",
        tooltip: "Instant notifications for critical mentions and emerging trends",
      },
      {
        name: "Advanced playbook automation",
        tooltip: "AI-powered response suggestions and automated deployments",
      },
      {
        name: "Competitive intelligence",
        tooltip: "Track and compare against up to 5 competitors",
      },
      {
        name: "Priority support (4h response)",
        tooltip: "Expedited support with 4-hour response time guarantee",
      },
      {
        name: "10 user seats",
        tooltip: "Accommodate larger teams with role-based access",
      },
      {
        name: "Custom integrations",
        tooltip: "Connect with your existing tools via API or webhooks",
      },
    ],
    cta: "Start growing",
    color: "border-accent",
  },
  {
    name: "Crisis",
    price: "Custom",
    period: "",
    description: "Enterprise-grade protection with dedicated crisis response team",
    popular: false,
    features: [
      {
        name: "Unlimited mentions",
        tooltip: "No limits on tracking volume for comprehensive coverage",
      },
      {
        name: "White-glove crisis team",
        tooltip: "Dedicated PR strategists available 24/7 for crisis situations",
      },
      {
        name: "Sub-5-minute response SLA",
        tooltip: "Guaranteed crisis response within 5 minutes of detection",
      },
      {
        name: "Executive monitoring",
        tooltip: "Dedicated tracking for C-suite and board members",
      },
      {
        name: "Custom playbook development",
        tooltip: "Bespoke response strategies tailored to your brand and industry",
      },
      {
        name: "24/7 war room access",
        tooltip: "Direct hotline to crisis management team anytime",
      },
      {
        name: "Unlimited user seats",
        tooltip: "No restrictions on team size or access levels",
      },
      {
        name: "Dedicated account team",
        tooltip: "Personal account manager, strategist, and analyst",
      },
      {
        name: "Quarterly strategy reviews",
        tooltip: "Regular planning sessions with senior strategists",
      },
    ],
    cta: "Contact sales",
    color: "border-border",
  },
];

export function Pricing() {
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const gridAnim = useScrollAnimation({ threshold: 0.05 });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-32 bg-background relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose your protection level
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From proactive monitoring to crisis response, we have a plan for every need
          </p>
        </div>

        <TooltipProvider>
          <div
            ref={gridAnim.ref}
            className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-children"
          >
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 border-2 ${plan.color} card-shimmer scroll-fade-in ${gridAnim.isVisible ? 'is-visible' : ''
                  } ${plan.popular ? "shadow-xl shadow-accent/10 scale-105 lg:scale-110 glow-border" : ""
                  }`}
                style={{
                  transitionDelay: gridAnim.isVisible ? `${index * 120}ms` : '0ms',
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold shadow-lg shadow-accent/30">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-4xl font-bold gradient-text">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group">
                        <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm text-foreground">
                            {feature.name}
                          </span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="text-muted-foreground hover:text-foreground transition-colors">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10" />
                                  <path d="M12 16v-4" />
                                  <path d="M12 8h.01" />
                                </svg>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="max-w-xs"
                            >
                              <p className="text-sm">{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={scrollToContact}
                    className={`w-full ${plan.popular
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TooltipProvider>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 30-day money-back guarantee • Enterprise volume discounts available
          </p>
        </div>
      </div>
    </section>
  );
}
