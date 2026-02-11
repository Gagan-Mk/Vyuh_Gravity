"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const clients = [
  {
    name: "CT Ravi",
    category: "Political Leader",
    description: "Strategic political campaign management and digital presence",
    icon: "👤",
    stats: {
      reach: "2.5M+",
      engagement: "+340%",
      impact: "Regional Leader",
    },
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Saptagiri Gowda",
    category: "Public Figure",
    description: "Personal brand building and public relations strategy",
    icon: "⭐",
    stats: {
      reach: "1.8M+",
      engagement: "+280%",
      impact: "Industry Voice",
    },
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "OFF Ground",
    category: "Hospitality & Events",
    description: "Brand positioning and integrated digital marketing campaigns",
    icon: "🎪",
    stats: {
      reach: "500K+",
      engagement: "+450%",
      impact: "Market Leader",
    },
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Aatmatrisha",
    category: "Wellness & Lifestyle",
    description: "Content strategy and community building for holistic wellness",
    icon: "🧘",
    stats: {
      reach: "350K+",
      engagement: "+520%",
      impact: "Trusted Authority",
    },
    color: "from-emerald-500 to-green-500",
  },
  {
    name: "J Davis Pro Sounds",
    category: "Entertainment & Audio",
    description: "Brand creation and performance marketing for premium audio services",
    icon: "🎵",
    stats: {
      reach: "420K+",
      engagement: "+380%",
      impact: "Industry Standard",
    },
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Bhonomia Coffee",
    category: "Food & Beverage",
    description: "Brand launch strategy and social media amplification",
    icon: "☕",
    stats: {
      reach: "280K+",
      engagement: "+610%",
      impact: "Rising Star",
    },
    color: "from-amber-500 to-orange-500",
  },
];

export function Proof() {
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const gridAnim = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="proof" className="py-32 bg-gradient-to-b from-muted/10 to-background relative">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[oklch(0.55_0.12_300)]/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? 'is-visible' : ''}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            Who We Serve
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by leaders and brands
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From political campaigns to hospitality brands, from events to retail—proven results across industries
          </p>
        </div>

        <div
          ref={gridAnim.ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
        >
          {clients.map((client, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 cursor-pointer border-2 hover:border-accent card-shimmer scroll-fade-in ${gridAnim.isVisible ? 'is-visible' : ''
                }`}
              style={{
                transitionDelay: gridAnim.isVisible ? `${index * 80}ms` : '0ms',
              }}
              onMouseEnter={() => setActiveCase(index)}
              onMouseLeave={() => setActiveCase(null)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${client.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="relative p-6 space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {client.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{client.name}</h3>
                  <Badge variant="outline" className="text-xs border-accent/20">
                    {client.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-3">
                    {client.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Reach</span>
                    <span className="text-sm font-bold text-foreground">
                      {client.stats.reach}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Engagement</span>
                    <span className="text-sm font-bold text-accent">
                      {client.stats.engagement}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Impact</span>
                    <span className="text-sm font-bold text-foreground">
                      {client.stats.impact}
                    </span>
                  </div>
                </div>

                {/* Success indicator - revealed on hover */}
                <div
                  className={`transition-all duration-300 ${activeCase === index
                      ? "opacity-100 max-h-20 translate-y-0"
                      : "opacity-0 max-h-0 translate-y-4 overflow-hidden"
                    }`}
                >
                  <div className="pt-4 border-t border-border text-center">
                    <Badge className={`bg-gradient-to-r ${client.color} text-white border-0`}>
                      ✓ Success Story
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
