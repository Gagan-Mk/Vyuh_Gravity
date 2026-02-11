"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

export function DataWidgets() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const cardsAnim = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sentimentData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 58 },
    { day: "Thu", value: 65 },
    { day: "Fri", value: 72 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 78 },
  ];

  const sourceMix = [
    { source: "News", percentage: 35, icon: "📰" },
    { source: "Social", percentage: 45, icon: "💬" },
    { source: "Blogs", percentage: 12, icon: "✍️" },
    { source: "Forums", percentage: 8, icon: "🗨️" },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-muted/10 relative">
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Real-time reputation intelligence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what matters, when it matters
          </p>
        </div>

        <div
          ref={cardsAnim.ref}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-children"
        >
          {/* Sentiment Trend */}
          <Card className={`p-6 bg-card shadow-xl border-2 card-shimmer scroll-fade-in ${cardsAnim.isVisible ? 'is-visible' : ''}`}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Sentiment trend</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>

            <div className="h-48 flex items-end justify-between gap-2">
              {sentimentData.map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg relative overflow-hidden h-full">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-emerald-400 transition-all duration-1000 ease-out rounded-t-lg"
                      style={{
                        height: isVisible ? `${item.value}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Change</span>
              <span className="text-lg font-bold text-green-400">+33%</span>
            </div>
          </Card>

          {/* Share of Voice */}
          <Card className={`p-6 bg-card shadow-xl border-2 card-shimmer scroll-fade-in ${cardsAnim.isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Share of voice</h3>
              <p className="text-sm text-muted-foreground">vs. competitors</p>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">Your brand</span>
                  <span className="text-sm font-bold text-accent">34%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-orange-400 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: isVisible ? "34%" : "0%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Competitor A</span>
                  <span className="text-sm text-muted-foreground">28%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/30 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: isVisible ? "28%" : "0%",
                      transitionDelay: "200ms",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Competitor B</span>
                  <span className="text-sm text-muted-foreground">22%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/25 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: isVisible ? "22%" : "0%",
                      transitionDelay: "400ms",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Others</span>
                  <span className="text-sm text-muted-foreground">16%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/20 transition-all duration-1000 ease-out rounded-full"
                    style={{
                      width: isVisible ? "16%" : "0%",
                      transitionDelay: "600ms",
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Source Mix */}
          <Card className={`p-6 bg-card shadow-xl border-2 card-shimmer scroll-fade-in ${cardsAnim.isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Source mix</h3>
              <p className="text-sm text-muted-foreground">Coverage breakdown</p>
            </div>

            <div className="space-y-4">
              {sourceMix.map((source, index) => (
                <div
                  key={source.source}
                  className="flex items-center gap-4 transition-all duration-500"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="text-3xl">{source.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm font-bold text-accent">
                        {source.percentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-1000 ease-out rounded-full"
                        style={{
                          width: isVisible ? `${source.percentage}%` : "0%",
                          transitionDelay: `${index * 150 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">12,438</div>
                <div className="text-xs text-muted-foreground">Total mentions this month</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
