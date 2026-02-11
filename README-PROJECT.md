# VantageGuard - PR Agency Landing Page

A modern, interactive landing page for a reputation management and PR agency built with Next.js, Tailwind CSS, and shadcn/ui.

## 🎨 Design Features

### Color Palette
Based on the logo's colors:
- **Dark Navy/Charcoal** (#2C3E50) - Primary brand color
- **Steel Blue** (#5A7A95) - Secondary accent
- **Vibrant Orange** (#F39C6B) - Call-to-action and highlights
- **Growth Mode** - Emerald/teal tones for positive growth scenarios
- **Crisis Mode** - Warm orange/amber tones for crisis management

### Interactive Elements

1. **Live Reputation Pulse Widget**
   - Real-time animated wave visualization
   - Mouse-interactive (amplitude changes with cursor movement)
   - Respects `prefers-reduced-motion` for accessibility
   - Displays dynamic KPIs

2. **Growth/Crisis Mode Toggle**
   - Seamless transitions between two brand narratives
   - Dynamic color scheme changes
   - KPI value swaps with smooth animations

3. **Scrollytelling "How It Works"**
   - 4-step narrative (Listen → Analyze → Act → Measure)
   - Scroll-driven animations show:
     - Mention nodes appearing and clustering
     - Playbook cards deploying
     - Resolution badge appearing
   - Fully functional with IntersectionObserver

4. **Interactive Capabilities Cards**
   - 9 capability cards with hover effects
   - Risk flag badges that pulse once on hover
   - Reveal detailed metrics on hover
   - Smooth scale and shadow transitions

5. **Case Study Cards**
   - 3 real case studies with before/after metrics
   - Animated progress bars
   - Hover reveals detailed actions and outcomes
   - Color-coded by industry

6. **Pricing Section**
   - 3 tiers: Starter, Growth (popular), Crisis
   - Tooltip system for feature explanations
   - Responsive pricing cards
   - Highlighted "Most Popular" plan

7. **Contact Form**
   - Loading state with spinner animation
   - Success state with full-screen overlay
   - Form validation
   - Auto-reset after submission

8. **Data Widgets**
   - Sentiment trend chart (7-day visualization)
   - Share of voice comparison
   - Source mix breakdown
   - Viewport-triggered animations

## 🚀 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (using CSS imports)
- **shadcn/ui** - Radix-based component library
- **Geist Font** - Modern, clean typography

## 📦 Components

All components are in `/components`:
- `Header.tsx` - Sticky navigation with scroll effects
- `Hero.tsx` - Hero section with pulse widget and mode toggle
- `HowItWorks.tsx` - Scrollytelling section
- `Capabilities.tsx` - Capability cards grid
- `DataWidgets.tsx` - Analytics visualizations
- `Proof.tsx` - Case study cards
- `Pricing.tsx` - Pricing tiers with tooltips
- `Contact.tsx` - Contact form with states
- `Footer.tsx` - Footer with links and social

## ♿ Accessibility

- Full `prefers-reduced-motion` support
- All animations disabled for users who prefer reduced motion
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Smooth scroll behavior (respects accessibility preferences)

## 🎯 Getting Started

### Development
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Fully responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🌟 Key Features

### Performance
- Fast loading with Next.js optimizations
- Optimized images with Next.js Image component
- Minimal JavaScript for animations
- CSS-based animations where possible

### SEO
- Optimized metadata
- OpenGraph tags
- Semantic HTML
- Fast Core Web Vitals

### User Experience
- Smooth scroll navigation
- Contextual hover states
- Clear visual hierarchy
- Intuitive interaction patterns
- Professional animations and transitions

## 📄 About VantageGuard

VantageGuard is a reputation management and PR agency specializing in:

- **Real-time Monitoring** - Track brand mentions across 50K+ news sources, social media, forums, and review sites
- **AI-Powered Analysis** - Automated sentiment analysis and trend detection
- **Crisis Response** - Sub-5-minute response times with dedicated crisis teams
- **Strategic Playbooks** - Pre-built and custom response strategies
- **Measurable Impact** - Track sentiment lift, share of voice, and coverage quality

### Services
- Media monitoring and social listening
- Competitive intelligence
- Executive protection
- Crisis management
- Brand reputation analytics
- Influencer tracking
- Regulatory watch

## 🎨 Customization

### Colors
Edit `/app/globals.css` to change the color palette. All colors use OKLCH format for better color consistency.

### Content
- Update copy in each component file
- Modify KPIs and metrics in `Hero.tsx` and `DataWidgets.tsx`
- Customize case studies in `Proof.tsx`
- Adjust pricing in `Pricing.tsx`

## 📞 Contact Information

- Email: hello@vantageguard.com
- Phone: +1 (555) 123-4567
- Live Chat: Available Mon-Fri, 9am-6pm EST

---

Built with ❤️ using Next.js and modern web technologies.
