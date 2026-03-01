"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { Globe, Building2, Target, BarChart2, Radio, Lightbulb, Zap, TrendingUp, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const philosophies: { title: string; description: string; Icon: LucideIcon; tagline: string }[] = [
  {
    title: "Reach Before Everything",
    description:
      "100,000 people seeing your message beats 1,000 people loving it. First they discover you. Then they engage. Then they convert. Visibility is the foundation.",
    Icon: Globe,
    tagline: "Visibility isn't vanity",
  },
  {
    title: "Build Brands, Not Just Campaigns",
    description:
      "Your brand is the gut feeling people get when they hear your name. We craft the story that makes people care and build ecosystems that last.",
    Icon: Building2,
    tagline: "Long-term thinking",
  },
  {
    title: "Content With Purpose",
    description:
      "Every post serves a strategic goal: build familiarity, demonstrate value, position authority, and drive action. No filler. No fluff.",
    Icon: Target,
    tagline: "Strategic communication",
  },
  {
    title: "The Numbers Don't Lie",
    description:
      "Advanced analytics tell us the truth. We do more of what works and kill what doesn't. Performance marketing is about spending smarter, not more.",
    Icon: BarChart2,
    tagline: "Data-driven decisions",
  },
];

// Simulated PR campaign timeline data
const campaignPhases: { phase: string; Icon: LucideIcon; label: string; metrics: { label: string; value: string; trend: string }[] }[] = [
  {
    phase: "Monitor",
    Icon: Radio,
    label: "Media Intelligence",
    metrics: [
      { label: "Sources Tracked", value: "2,847", trend: "+12%" },
      { label: "Mentions Found", value: "156", trend: "+34%" },
      { label: "Sentiment Score", value: "72%", trend: "positive" },
    ],
  },
  {
    phase: "Strategize",
    Icon: Lightbulb,
    label: "Campaign Strategy",
    metrics: [
      { label: "Target Journalists", value: "48", trend: "identified" },
      { label: "Key Messages", value: "6", trend: "crafted" },
      { label: "Channels Mapped", value: "12", trend: "active" },
    ],
  },
  {
    phase: "Execute",
    Icon: Zap,
    label: "Content Deployment",
    metrics: [
      { label: "Press Releases", value: "3", trend: "published" },
      { label: "Media Pitches", value: "127", trend: "sent" },
      { label: "Social Posts", value: "45", trend: "scheduled" },
    ],
  },
  {
    phase: "Measure",
    Icon: TrendingUp,
    label: "Performance Analytics",
    metrics: [
      { label: "Media Impressions", value: "4.2M", trend: "+280%" },
      { label: "Earned Media Value", value: "$1.8M", trend: "+156%" },
      { label: "Brand Lift", value: "31%", trend: "+18pts" },
    ],
  },
];

export function HowItWorks() {

  const [activePhase, setActivePhase] = useState(0);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const cardsAnim = useScrollAnimation({ threshold: 0.05 });
  const vizAnim = useScrollAnimation({ threshold: 0.1 });

  // Auto-cycle through campaign phases
  useEffect(() => {
    if (!vizAnim.isVisible) return;

    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % campaignPhases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [vizAnim.isVisible]);

  // Animate metric values when phase changes
  useEffect(() => {
    setAnimatedValues([0, 0, 0]);

    const timers = [
      setTimeout(() => setAnimatedValues((p) => [100, p[1], p[2]]), 200),
      setTimeout(() => setAnimatedValues((p) => [p[0], 100, p[2]]), 400),
      setTimeout(() => setAnimatedValues((p) => [p[0], p[1], 100]), 600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [activePhase]);



  const currentPhase = campaignPhases[activePhase];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="pt-32 pb-24 bg-gradient-to-b from-background via-muted/10 to-background relative"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            How We Think
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our philosophy drives results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four core principles that shape every strategy we create and every campaign we run
          </p>
        </div>

        {/* Philosophy Grid */}
        <div
          ref={cardsAnim.ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 stagger-children"
        >
          {philosophies.map((philosophy, index) => (
            <Card
              key={index}
              className={`p-6 transition-all duration-500 card-shimmer scroll-fade-in ${cardsAnim.isVisible ? 'is-visible' : ''
                } opacity-100 translate-y-0 shadow-lg border-2 border-border/50 hover:border-accent/50 hover:shadow-accent/5`}
              style={{
                transitionDelay: cardsAnim.isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              <div className="mb-5 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                <philosophy.Icon size={22} className="text-accent" strokeWidth={1.5} />
              </div>
              <div className="mb-2">
                <Badge variant="outline" className="text-xs mb-2 border-accent/30 text-accent/80">
                  {philosophy.tagline}
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {index + 1}. {philosophy.title}
              </h3>
              <p className="text-sm text-muted-foreground">{philosophy.description}</p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
