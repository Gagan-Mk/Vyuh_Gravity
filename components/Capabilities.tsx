"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const capabilities = [
  {
    title: "Strategic PR & Reputation Management",
    description: "Shape how the world sees you—proactively building trust, managing narratives, and turning perception into your competitive advantage.",
    icon: "🎯",
    metrics: {
      impact: "Brand Trust",
      delivery: "Ongoing",
      focus: "Narrative Control",
    },
    highlight: "Build lasting credibility",
  },
  {
    title: "Performance Marketing",
    description: "Campaigns that drive real results. Every rupee spent is tracked, optimized, and scaled based on what actually moves the needle for your business.",
    icon: "📈",
    metrics: {
      impact: "ROI Focused",
      delivery: "Data-Driven",
      focus: "Measurable Growth",
    },
    highlight: "No vanity metrics",
  },
  {
    title: "Brand Creation & Positioning",
    description: "Build brand identities that command attention, create emotional connections, and turn customers into evangelists.",
    icon: "✨",
    metrics: {
      impact: "Unforgettable",
      delivery: "Strategic",
      focus: "Market Domination",
    },
    highlight: "Stand out from the crowd",
  },
  {
    title: "Integrated Digital Strategy",
    description: "Blend PR and marketing into a seamless strategy that amplifies your visibility and drives measurable impact.",
    icon: "🔗",
    metrics: {
      impact: "Amplified Reach",
      delivery: "Omnichannel",
      focus: "Unified Approach",
    },
    highlight: "PR meets marketing",
  },
  {
    title: "Data-Driven Decision Making",
    description: "Transparent dashboards, real-time analytics, and performance tracking give you complete visibility into what's working and why.",
    icon: "📊",
    metrics: {
      impact: "Full Transparency",
      delivery: "Real-Time",
      focus: "Facts Over Fluff",
    },
    highlight: "We don't guess. We know.",
  },
  {
    title: "Content Strategy",
    description: "Every post, every image, every word serves a strategic goal. Content that builds familiarity, demonstrates value, and drives action.",
    icon: "📝",
    metrics: {
      impact: "Strategic Value",
      delivery: "Consistent",
      focus: "Purpose-Driven",
    },
    highlight: "No filler. No fluff.",
  },
];

export function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const gridAnim = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="capabilities" className="py-32 bg-background relative">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            What We Do
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Strategic services that drive results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From PR to performance marketing, we deliver integrated solutions that amplify your brand
          </p>
        </div>

        <div
          ref={gridAnim.ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
        >
          {capabilities.map((capability, index) => (
            <Card
              key={index}
              className={`group relative p-6 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 hover:scale-[1.02] cursor-pointer border-2 hover:border-accent card-shimmer scroll-fade-in ${gridAnim.isVisible ? 'is-visible' : ''
                }`}
              style={{
                transitionDelay: gridAnim.isVisible ? `${index * 80}ms` : '0ms',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {capability.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {capability.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {capability.description}
                </p>

                {/* Highlight badge */}
                <Badge
                  variant="outline"
                  className={`mb-4 border-accent/30 text-accent transition-all duration-300 ${hoveredIndex === index ? "animate-pulse-once" : ""
                    }`}
                >
                  ✓ {capability.highlight}
                </Badge>

                {/* Metrics - revealed on hover */}
                <div
                  className={`space-y-2 transition-all duration-300 ${hoveredIndex === index
                      ? "opacity-100 max-h-40 translate-y-0"
                      : "opacity-0 max-h-0 translate-y-2"
                    }`}
                >
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-2 font-semibold">
                      Key Details:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">Impact</div>
                        <div className="font-semibold text-foreground">
                          {capability.metrics.impact}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Delivery</div>
                        <div className="font-semibold text-foreground">
                          {capability.metrics.delivery}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-muted-foreground">Focus</div>
                        <div className="font-semibold text-foreground">
                          {capability.metrics.focus}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-once {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse-once {
          animation: pulse-once 0.5s ease-in-out 1;
        }
      `}</style>
    </section>
  );
}
