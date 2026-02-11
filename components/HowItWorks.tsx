"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const philosophies = [
  {
    title: "Reach Before Everything",
    description:
      "100,000 people seeing your message beats 1,000 people loving it. First they discover you. Then they engage. Then they convert. Visibility is the foundation.",
    icon: "🌐",
    tagline: "Visibility isn't vanity",
  },
  {
    title: "Build Brands, Not Just Campaigns",
    description:
      "Your brand is the gut feeling people get when they hear your name. We craft the story that makes people care and build ecosystems that last.",
    icon: "🏗️",
    tagline: "Long-term thinking",
  },
  {
    title: "Content With Purpose",
    description:
      "Every post serves a strategic goal: build familiarity, demonstrate value, position authority, and drive action. No filler. No fluff.",
    icon: "🎯",
    tagline: "Strategic communication",
  },
  {
    title: "The Numbers Don't Lie",
    description:
      "Advanced analytics tell us the truth. We do more of what works and kill what doesn't. Performance marketing is about spending smarter, not more.",
    icon: "📊",
    tagline: "Data-driven decisions",
  },
];

// Simulated PR campaign timeline data
const campaignPhases = [
  {
    phase: "Monitor",
    icon: "📡",
    label: "Media Intelligence",
    metrics: [
      { label: "Sources Tracked", value: "2,847", trend: "+12%" },
      { label: "Mentions Found", value: "156", trend: "+34%" },
      { label: "Sentiment Score", value: "72%", trend: "positive" },
    ],
  },
  {
    phase: "Strategize",
    icon: "🧠",
    label: "Campaign Strategy",
    metrics: [
      { label: "Target Journalists", value: "48", trend: "identified" },
      { label: "Key Messages", value: "6", trend: "crafted" },
      { label: "Channels Mapped", value: "12", trend: "active" },
    ],
  },
  {
    phase: "Execute",
    icon: "🚀",
    label: "Content Deployment",
    metrics: [
      { label: "Press Releases", value: "3", trend: "published" },
      { label: "Media Pitches", value: "127", trend: "sent" },
      { label: "Social Posts", value: "45", trend: "scheduled" },
    ],
  },
  {
    phase: "Measure",
    icon: "📈",
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
      className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative"
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
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 stagger-children"
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
              <div className="text-5xl mb-4">{philosophy.icon}</div>
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

        {/* PR Campaign Lifecycle Visualization */}
        <div
          ref={vizAnim.ref}
          className={`scroll-scale-in ${vizAnim.isVisible ? 'is-visible' : ''}`}
        >
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-accent/15 text-accent border-accent/25">
              Live Campaign View
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold">
              How a campaign comes to life
            </h3>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Every campaign follows our proven 4-phase process — from media intelligence to measurable impact
            </p>
          </div>

          <Card className="p-0 overflow-hidden bg-gradient-to-br from-card to-muted/10 border-2 shadow-2xl glow-border">
            {/* Phase Navigation */}
            <div className="flex border-b border-border/50">
              {campaignPhases.map((phase, index) => (
                <button
                  key={phase.phase}
                  onClick={() => setActivePhase(index)}
                  className={`flex-1 px-4 py-4 text-center transition-all duration-300 relative ${index === activePhase
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                    }`}
                >
                  <div className="text-lg mb-1">{phase.icon}</div>
                  <div className="text-xs sm:text-sm font-semibold">{phase.phase}</div>

                  {/* Active phase indicator */}
                  {index === activePhase && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  )}

                  {/* Progress line between phases */}
                  {index < activePhase && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent/30" />
                  )}
                </button>
              ))}
            </div>

            {/* Phase Content */}
            <div className="p-6 sm:p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Phase description + progress */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{currentPhase.icon}</span>
                      <div>
                        <h4 className="text-xl font-bold text-foreground">{currentPhase.label}</h4>
                        <p className="text-sm text-muted-foreground">
                          Phase {activePhase + 1} of {campaignPhases.length}
                        </p>
                      </div>
                    </div>

                    {/* Phase progress bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all duration-1000"
                        style={{ width: `${((activePhase + 1) / campaignPhases.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Campaign timeline */}
                  <div className="space-y-3">
                    {campaignPhases.map((phase, index) => (
                      <div
                        key={phase.phase}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${index === activePhase
                          ? "bg-accent/10 border border-accent/30"
                          : index < activePhase
                            ? "opacity-60"
                            : "opacity-30"
                          }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${index < activePhase
                            ? "bg-green-500/20 text-green-400"
                            : index === activePhase
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {index < activePhase ? "✓" : index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{phase.label}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {index < activePhase
                            ? "Complete"
                            : index === activePhase
                              ? "In progress"
                              : "Pending"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Live metrics */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Live Metrics
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400 font-medium">Active</span>
                    </div>
                  </div>

                  {currentPhase.metrics.map((metric, index) => (
                    <Card
                      key={metric.label}
                      className={`p-4 bg-background/50 border border-border/50 transition-all duration-500 ${animatedValues[index] === 100
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-4"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                          <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                        </div>
                        <Badge
                          className={`text-xs font-semibold ${metric.trend.startsWith("+")
                            ? "bg-green-500/15 text-green-400 border-green-500/25"
                            : metric.trend === "positive"
                              ? "bg-green-500/15 text-green-400 border-green-500/25"
                              : "bg-accent/15 text-accent border-accent/25"
                            }`}
                        >
                          {metric.trend}
                        </Badge>
                      </div>

                      {/* Mini progress bar */}
                      <div className="mt-3 w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${metric.trend.startsWith("+")
                            ? "bg-green-400"
                            : "bg-accent"
                            }`}
                          style={{
                            width: animatedValues[index] === 100
                              ? `${60 + Math.random() * 35}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </Card>
                  ))}

                  {/* Summary stat */}
                  {activePhase === 3 && (
                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-accent/10 to-green-500/10 border border-accent/20">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🎯</span>
                        <span className="text-sm font-semibold text-foreground">Campaign ROI</span>
                      </div>
                      <div className="text-3xl font-bold text-accent">12.4x</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Every $1 invested generated $12.40 in earned media value
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
