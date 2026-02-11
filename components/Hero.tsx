"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface SocialIcon {
  id: string;
  x: number;
  y: number;
  size: number;
  name: string;
  color: string;
  insight: string;
  velocityX: number;
  velocityY: number;
}

const SocialLogos: Record<string, (color: string) => React.ReactElement> = {
  Instagram: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  Facebook: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Twitter: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  YouTube: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  TikTok: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  Reddit: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  ),
  Pinterest: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
    </svg>
  ),
  Snapchat: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301a.32.32 0 0 1 .138-.027c.2 0 .388.09.49.254a.443.443 0 0 1 .07.197c.015.093-.003.2-.074.328-.15.26-.472.456-.837.584-.135.048-.27.09-.39.12l-.07.017c-.105.03-.2.053-.285.09-.107.046-.161.1-.183.167-.03.09-.008.2.057.376l.015.03c.529 1.052 1.246 1.89 2.13 2.49.224.152.465.274.68.36.11.045.203.075.27.09a.515.515 0 0 1 .32.267.444.444 0 0 1-.01.403c-.18.37-.61.624-1.275.752a3.614 3.614 0 0 1-.153.03c-.055.01-.135.027-.27.06-.122.03-.233.103-.3.225a.71.71 0 0 0-.06.317c0 .028.006.058.009.075.06.272-.067.48-.244.631-.225.193-.567.34-.99.44-.27.063-.555.1-.795.12-.12.013-.18.03-.21.048l-.04.03c-.162.12-.39.296-.716.51a6.07 6.07 0 0 1-1.32.686c-.42.167-.885.28-1.395.28-.217 0-.43-.021-.609-.06a3.347 3.347 0 0 1-.555-.168c-.39-.15-.735-.39-.945-.6a2.28 2.28 0 0 0-.42-.33.733.733 0 0 0-.4-.108c-.18 0-.37.054-.555.168-.21.12-.42.312-.615.54-.18.21-.48.39-.87.54a3.347 3.347 0 0 1-.555.168c-.18.04-.393.06-.609.06-.51 0-.975-.113-1.395-.28a6.07 6.07 0 0 1-1.32-.686c-.326-.214-.554-.39-.716-.51l-.04-.03c-.03-.018-.09-.035-.21-.048a6.844 6.844 0 0 1-.795-.12c-.423-.1-.765-.247-.99-.44-.177-.15-.304-.36-.244-.63.003-.018.009-.048.009-.076a.71.71 0 0 0-.06-.316c-.067-.122-.178-.195-.3-.226-.135-.033-.215-.05-.27-.06a3.614 3.614 0 0 1-.153-.03c-.665-.128-1.095-.382-1.275-.752a.444.444 0 0 1-.01-.403.515.515 0 0 1 .32-.267c.067-.015.16-.045.27-.09.215-.086.456-.208.68-.36.884-.6 1.601-1.438 2.13-2.49l.015-.03c.065-.176.087-.286.057-.376-.022-.067-.076-.121-.183-.167a3.32 3.32 0 0 0-.285-.09l-.07-.017a3.524 3.524 0 0 1-.39-.12c-.365-.128-.687-.324-.837-.584a.46.46 0 0 1-.074-.328.443.443 0 0 1 .07-.197.356.356 0 0 1 .49-.254c.374.181.733.285 1.033.301.198 0 .326-.045.401-.09a37.86 37.86 0 0 1-.033-.57c-.104-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z" />
    </svg>
  ),
  Discord: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  ),
  Telegram: (color) => (
    <svg viewBox="0 0 24 24" fill={color} width="100%" height="100%">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
};

const socialPlatforms = [
  { name: "Instagram", color: "#E4405F", insight: "Analyzing 12.5K mentions..." },
  { name: "Facebook", color: "#4599FF", insight: "Loading engagement data..." },
  { name: "Twitter", color: "#FFFFFF", insight: "Tracking 3.2K conversations..." },
  { name: "LinkedIn", color: "#2D9CDB", insight: "Monitoring B2B sentiment..." },
  { name: "YouTube", color: "#FF4444", insight: "Scanning video mentions..." },
  { name: "TikTok", color: "#EE1D52", insight: "Detecting viral trends..." },
  { name: "Reddit", color: "#FF5700", insight: "Discovering discussions..." },
  { name: "Pinterest", color: "#E60023", insight: "Discovering visual trends..." },
  { name: "Snapchat", color: "#FFFC00", insight: "Tracking story mentions..." },
  { name: "Discord", color: "#7289DA", insight: "Monitoring server chatter..." },
  { name: "Telegram", color: "#40B3E0", insight: "Scanning channel activity..." },
];

const EXCLUSION = { left: 18, right: 82, top: 22, bottom: 78 };

function randomOuterPos(): { x: number; y: number } {
  const zone = Math.floor(Math.random() * 4);
  switch (zone) {
    case 0: return { x: Math.random() * 90 + 5, y: Math.random() * (EXCLUSION.top - 5) + 3 };
    case 1: return { x: Math.random() * 90 + 5, y: Math.random() * (97 - EXCLUSION.bottom) + EXCLUSION.bottom };
    case 2: return { x: Math.random() * (EXCLUSION.left - 3) + 2, y: Math.random() * 90 + 5 };
    default: return { x: Math.random() * (98 - EXCLUSION.right) + EXCLUSION.right, y: Math.random() * 90 + 5 };
  }
}

function isInExclusion(x: number, y: number): boolean {
  return x > EXCLUSION.left && x < EXCLUSION.right && y > EXCLUSION.top && y < EXCLUSION.bottom;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [icons, setIcons] = useState<SocialIcon[]>([]);
  const animationRef = useRef<number>(0);
  const lastMouseMoveRef = useRef(0);
  const sectionAnim = useScrollAnimation({ threshold: 0.1 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initialIcons: SocialIcon[] = socialPlatforms.map((platform, index) => {
      const pos = randomOuterPos();
      return {
        id: `${platform.name}-${index}`, ...pos, size: 36,
        name: platform.name, color: platform.color, insight: platform.insight,
        velocityX: (Math.random() - 0.5) * 0.1, velocityY: (Math.random() - 0.5) * 0.1,
      };
    });
    setIcons(initialIcons);
  }, []);

  useEffect(() => {
    if (icons.length === 0) return;
    let lastTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      if (currentTime - lastTime < 30) { animationRef.current = requestAnimationFrame(animate); return; }
      lastTime = currentTime;
      setIcons(prev => prev.map(icon => {
        let newX = icon.x + icon.velocityX, newY = icon.y + icon.velocityY;
        let newVX = icon.velocityX, newVY = icon.velocityY;
        if (newX <= 2 || newX >= 98) { newVX = -newVX * 0.98; newX = newX <= 2 ? 2 : 98; }
        if (newY <= 2 || newY >= 98) { newVY = -newVY * 0.98; newY = newY <= 2 ? 2 : 98; }
        if (isInExclusion(newX, newY)) {
          const fl = newX - EXCLUSION.left, fr = EXCLUSION.right - newX;
          const ft = newY - EXCLUSION.top, fb = EXCLUSION.bottom - newY;
          const m = Math.min(fl, fr, ft, fb);
          if (m === fl || m === fr) { newVX = -newVX * 0.98; newX = m === fl ? EXCLUSION.left : EXCLUSION.right; }
          else { newVY = -newVY * 0.98; newY = m === ft ? EXCLUSION.top : EXCLUSION.bottom; }
        }
        return { ...icon, x: newX, y: newY, velocityX: newVX, velocityY: newVY };
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [icons.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastMouseMoveRef.current < 16) return;
    lastMouseMoveRef.current = now;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)),
    });
  }, []);

  const getIconStyle = useCallback((icon: SocialIcon) => {
    if (!isHovering) return { scale: 1, opacity: 0.35 };
    const dx = icon.x - mousePos.x, dy = icon.y - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 18) {
      const proximity = 1 - distance / 18;
      return { scale: 1 + proximity * 1.4, opacity: 0.35 + proximity * 0.55 };
    }
    return { scale: 1, opacity: 0.35 };
  }, [isHovering, mousePos]);

  useEffect(() => {
    if (!isHovering) { setHoveredIcon(null); return; }
    let closest: string | null = null, closestDist = Infinity;
    for (const icon of icons) {
      const dist = Math.sqrt((icon.x - mousePos.x) ** 2 + (icon.y - mousePos.y) ** 2);
      if (dist < 8 && dist < closestDist) { closest = icon.id; closestDist = dist; }
    }
    setHoveredIcon(closest);
  }, [mousePos, isHovering, icons]);

  return (
    <section
      ref={sectionAnim.ref}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden scroll-fade-in ${sectionAnim.isVisible ? 'is-visible' : ''}`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.08_0.02_260)] via-background to-[oklch(0.06_0.01_240)]" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[oklch(0.55_0.12_220)]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Floating icons */}
      <div ref={containerRef} className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setMousePos({ x: -100, y: -100 }); }}
      >
        {icons.map(icon => {
          const { scale, opacity } = getIconStyle(icon);
          const isHovered = hoveredIcon === icon.id;
          return (
            <div key={icon.id} className="absolute will-change-transform pointer-events-none" style={{
              left: `${icon.x}%`, top: `${icon.y}%`, width: `${icon.size}px`, height: `${icon.size}px`,
              transform: `translate(-50%, -50%) scale(${scale})`, opacity,
              transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
              zIndex: isHovered ? 5 : 1,
              filter: isHovered ? `drop-shadow(0 0 12px ${icon.color}60)` : 'none',
            }}>
              {SocialLogos[icon.name]?.(icon.color)}
              {isHovered && (
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
                  <div className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="text-[10px] opacity-80 mb-0.5">{icon.name}</div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <div className="w-1.5 h-1.5 bg-accent-foreground rounded-full animate-pulse" />
                      {icon.insight}
                    </div>
                  </div>
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-4xl text-center space-y-8">
        <Badge className="bg-accent/15 text-accent border-accent/25 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
          Strategic PR & Digital Influence
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-foreground tracking-tight">
          Real-time intelligence across{" "}
          <span className="gradient-text text-glow">every platform</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From startups to established brands, we craft narratives that resonate and campaigns that convert. Your success is our obsession.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => scrollToSection("contact")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all text-base px-8 h-12">
            Start Your Transformation
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("how-it-works")}
            className="border-2 border-foreground/20 text-foreground hover:bg-foreground/5 font-semibold text-base px-8 h-12 backdrop-blur-sm">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
