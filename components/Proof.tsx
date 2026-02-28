"use client";

import { Badge } from "@/components/ui/badge";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const clients: CardStackItem[] = [
  {
    id: 3,
    title: "Aatmatrisha",
    description: "Karnataka's BIGGEST college fest PR, media relations and student engagement campaigns",
    imageSrc: "/Aatmatrisha.png",
  },
  {
    id: 4,
    title: "Audi",
    description: "Luxury automotive PR, executive communications and brand positioning across India",
    imageSrc: "/Audi.png",
  },
  {
    id: 5,
    title: "Bonhomia",
    description: "Specialty coffee brand launch strategy, lifestyle storytelling and retail amplification",
    imageSrc: "/Bonhomia.png",
  },
  {
    id: 6,
    title: "Great White",
    description: "Market entry PR, product visibility campaigns and trade media outreach",
    imageSrc: "/GreatWhite.png",
  },
  {
    id: 7,
    title: "Heineken",
    description: "Premium beer brand activations, event sponsorships and integrated digital campaigns",
    imageSrc: "/Heineken.png",
  },
  {
    id: 8,
    title: "PhysicsWallah",
    description: "EdTech brand amplification, influencer partnerships and high-growth performance marketing",
    imageSrc: "/PhysicWallah.png",
  },
  {
    id: 9,
    title: "Qualcomm",
    description: "Technology PR, product launch communications and thought leadership in semiconductors",
    imageSrc: "/Qualcomm.png",
  },
  {
    id: 10,
    title: "Royal Enfield",
    description: "Iconic motorcycle brand storytelling, community building and experiential event PR",
    imageSrc: "/RoyalEnfield.png",
  },
  {
    id: 11,
    title: "Tata",
    description: "Corporate communications, sustainability PR and integrated multi-brand strategy",
    imageSrc: "/Tata.png",
  },
  {
    id: 12,
    title: "Amazon Web Services",
    description: "Enterprise cloud adoption PR, startup ecosystem evangelism and technology thought leadership",
    imageSrc: "/aws.png",
  },
];

export function Proof() {
  const headerAnim = useScrollAnimation({ threshold: 0.1 });
  const cardAnim = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="proof" className="py-32 bg-gradient-to-b from-muted/10 to-background relative">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[oklch(0.55_0.12_300)]/3 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={headerAnim.ref}
          className={`text-center mb-16 scroll-fade-in ${headerAnim.isVisible ? "is-visible" : ""}`}
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/25">
            Who We Serve
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From political campaigns to hospitality brands, from events to retail—proven results across industries
          </p>
        </div>

        <div
          ref={cardAnim.ref}
          className={`scroll-fade-in ${cardAnim.isVisible ? "is-visible" : ""}`}
        >
          <CardStack
            items={clients}
            cardWidth={540}
            cardHeight={360}
            showDots
            loop
          />
        </div>
      </div>
    </section>
  );
}
