# Hands-On Design Leadership During Crisis
## Walmart.com — Customer Journey & Merchandising Platform Transformation

### The Challenge

COVID-19 changed Walmart's business overnight.

In March 2020, Walmart faced an unprecedented crisis: millions of offline customers shifted online simultaneously. The retail giant's digital platform, while functional, **wasn't built for this scale or velocity**.

Two critical problems surfaced immediately:

#### Problem 1: Fragmented Customer Experience
Customer journeys on Walmart.com were **siloed across teams**. Search was owned by one team, product pages by another, checkout by a third, and support scattered across channels. No single designer or team owned the end-to-end customer experience.

Result: 
- Inconsistent user experiences across touchpoints
- Duplicated help experiences across web and mobile
- Slow iteration on core journeys due to coordination overhead
- Customer frustration during the highest-traffic period in the company's history

#### Problem 2: Manual Merchandising Workflows
Walmart's assortment and merchandising teams operated on **legacy manual processes**—spreadsheets, email chains, and paper-based approval workflows. These systems, designed for a stable inventory environment, collapsed under pandemic demand volatility.

Result:
- Inability to respond quickly to sudden demand shifts (hand sanitizer, masks, etc.)
- Buyers making decisions without real-time inventory, pricing, or demand data
- Massive operational inefficiencies costing millions daily

**My mandate**: Lead both the redesign of customer-facing experiences AND the design of internal merchandising systems. This meant hands-on design work while coordinating across teams, managing pressure from leadership, and shipping critical improvements under crisis conditions.

![Challenge & Crisis Context](../../images/process/process-org-reorganization.png)

---

### The Approach

I inherited this moment with a clear principle: **I design and lead. Not either/or—both.**

My approach had three concurrent tracks, with me personally deeply involved in the design work:

#### Track 1: Journey-Level Design & Redesign (Week 1-12)

**The Problem**: Teams were siloed. Search didn't talk to category pages. No one owned the customer's end-to-end experience.

**My Strategic Decision**: Reorganize teams around **customer journeys**, not features.

I proposed restructuring from:
- ❌ Search team, Product page team, Checkout team, Support team
- ✅ Browse & Discovery journey team, Product Decision journey team, Purchase & Payment journey team, Support & Returns journey team

**Why This Mattered**: 
- Unified ownership meant faster, coordinated decisions
- Journey teams could make trade-offs across touchpoints
- Clearer communication lines for crisis decision-making
- I could lead design across these journeys rather than fighting silos

**But here's the critical part**: I didn't just reorganize and delegate. **I personally designed the core journey improvements.**

#### My Hands-On Design Work

**1. Search & Browse Experience** (I designed this)
*Context*: With millions of new customers joining, search had to work perfectly. This is where customers started their journey.

*My Design Challenge*: How do you help a first-time online grocery shopper find what they need when Walmart.com has millions of items?

*My Design Solution*:
- Redesigned search results to surface recommendations based on behavior
- Created category browsing experience with smart filtering
- Added "frequently bought together" patterns
- Designed for both functional searches ("milk") and exploratory browsing

*The "genai_search_experience" video shows this work*—the improved search interface where recommendations appear naturally and filters help users narrow down.

![Search & Browse Experience Redesign](../../images/solution/solution-search-experience.png)

**2. Product Page Redesign** (I designed this)
*Context*: Product pages were the critical decision point. Customers needed to make quick, confident purchase decisions.

*My Design Challenge*: How do you present complex information (nutrition, size, availability, price, shipping) without overwhelming a new shopper?

*My Design Solution*:
- Simplified product page hierarchy (most important info at top)
- Added availability and shipping info prominently
- Created trust signals (reviews, ratings) integrated naturally
- Designed for quick scanning, not reading

*The "shop_with_friends" video shows this*—how we designed the product page experience to support social sharing and group shopping.

**3. Smart Substitutions Interface** (I designed this)
*Context*: With demand volatility, products went out of stock constantly. You either show "out of stock" or help customers find alternatives.

*My Design Challenge*: How do you suggest alternatives without feeling like you're forcing a second choice?

*My Design Solution*:
- Designed the substitution suggestion flow to feel helpful, not pushy
- Showed why the substitution was recommended (same brand, similar price, better availability)
- Let customers easily add the original item to a waitlist OR accept the substitute
- Made the interface feel like a helpful assistant, not a system limitation

![Smart Substitutions: Graceful Out-of-Stock Handling](../../images/solution/solution-smart-substitutions.png)

*The "smart_substitutions" video shows this*—a customer-facing feature that improved conversion while handling out-of-stock situations gracefully.

**4. Unified Contact & Support Experience** (I designed this)
*Context*: Support volume was exploding during COVID. But help was fragmented across web, mobile, chat, email, phone, and social. More critically, customers couldn't easily get help *while shopping*—they had to abandon their journey to find support.

*My Design Challenge*: How do you create ONE consistent help system across all channels AND integrate it seamlessly into the shopping experience itself?

*My Design Solution*:
- Designed a central Help Hub with intelligent search and organized-by-need information architecture
- Created contextual help surfaces that appeared *right where customers got stuck* (search page, product detail, cart)
- Designed escalation flows that allowed customers to move fluidly between chat → email → phone without repeating context
- Integrated "Shop with Friends" feature with support access—allowing customers to get help while shopping together
- Established consistent tone, terminology, and structure across all channels (phone, web chat, app, social)

*My Design Principles for This Work*:
- **Help finds the customer, not the reverse** — reduce cognitive load by surfacing help where customers need it
- **Channel interoperability** — start on chat, continue on email, escalate to phone—continuity across all channels
- **Shopping-integrated support** — help shouldn't interrupt the shopping experience; it should enhance it
- **Social shopping with support** — enable customers to shop together and access help without leaving the shared experience

![Unified Help Framework: Before & After](../../images/process/process-help-framework.png)

#### Track 2: Merchandising Platform Design (Month 1-12)

This was the **0→1 system design** challenge. Walmart's assortment and buyer teams needed a modern platform to make inventory, pricing, and promotion decisions in real-time.

**I personally designed the core interfaces** while building out a team to support execution.

**1. Assortment Management Interface** (I designed this)
*Problem*: Buyers needed to decide which products to carry by region, category, and season—all with real-time inventory and demand data.

*My Design Challenge*: How do you make a complex, multi-dimensional decision problem feel manageable?

*My Design Solution*:
- Designed a data dashboard that surfaced the most important metrics (what's selling, what's trending, what's out of stock)
- Created a "recommendation engine" interface showing AI-suggested assortment changes
- Designed approval workflows so buyers could quickly make decisions
- Built in drill-down capability to understand *why* a recommendation existed

**2. Price Optimization Interface** (I designed this)
*Problem*: Pricing needed to respond to demand, supply, competitor prices, and seasonal factors in real-time.

*My Design Challenge*: How do you make pricing recommendations trustworthy when the underlying algorithm is complex?

*My Design Solution*:
- Designed transparency into the interface (show the factors driving the price: demand up, competitor price down, inventory surplus)
- Created a "confidence level" indicator (how sure is the system about this price?)
- Let buyers override recommendations easily with explanation required
- Made the system feel like a tool that augments human judgment, not replaces it

**3. Approval Workflows** (I designed this)
*Problem*: Enterprise governance matters. Multiple stakeholders need to approve merchandising changes.

*My Design Challenge*: How do you make approval workflows fast during a crisis while maintaining control?

*My Design Solution*:
- Designed clear approval hierarchies (who needs to approve what?)
- Created emergency approval paths (fast-track for crisis decisions)
- Designed notifications that actually made people act (not buried in email)
- Made the workflow status visible at every step

#### Track 3: Cross-Functional Leadership Under Crisis (Ongoing)

I led two distributed teams:
- **US-based team**: 12 people (5 designers, 4 PMs/researchers, 3 engineers)
- **India-based team**: 10 people (3 designers, 4 engineers, 3 QA)

**22 people total**, split across geographies, all working under extreme pressure.

**My Leadership Approach**:
- Weekly design critiques where I reviewed all journey redesigns
- Bi-weekly strategy sessions to align on priorities and trade-offs
- Direct mentorship of junior designers on the India team
- Daily check-ins during peak crisis periods (March-May 2020)
- Made the hard calls on scope, timeline, and quality trade-offs

**Why distributed teams worked**:
- I established clear design principles and processes
- Async communication meant continuous iteration
- Time zone difference (US + India) created overlapping working hours
- I personally reviewed all major design decisions

---

### The Results

#### Customer Experience Impact
- **Quarterly funnel improvements of up to 0.03%** in Browse & Discovery journey, with 0.01-0.02% improvements in Product Detail and Checkout journeys
  - Measured via A/B testing of redesigned flows vs. previous baseline
  - At Walmart's scale (2B+ transactions per quarter), these improvements translated to millions of dollars in incremental conversion
- **Unified help experience across all channels** — significantly improved customer satisfaction and reduced support burden
- **Faster, more intuitive journeys** — new customers could navigate and purchase faster
- **Contributed to Walmart+ launch** by providing early design leadership for onboarding, member benefits discovery, and integration with core shopping journeys
  - Walmart+ launched in September 2020 (during my tenure leading redesign)
  - Current state: ~11M members (~25% of customer base) — demonstrating strong product-market fit
  - My contribution: Design strategy for member experience, not sole ownership of the product

![Customer Experience Metrics & Impact](../../images/results/results-metrics.png)

#### Operational Impact (Merchandising Platform)
- **~$5B in merchant/vendor efficiency gains** (FY2021) — quantified as time saved across all Walmart+ merchants and third-party vendors in assortment and pricing decision workflows
  - Shared attribution: This number reflects the full platform impact. My design contribution was specifically in the assortment management and price optimization interfaces, which reduced decision cycle time from 5-7 days to 1-2 days
  - ~$2-3B of this $5B is attributable to faster assortment decisions (design + backend system improvements)
- **$6-8B in operational savings** (FY2021, shared attribution with merchandising and engineering teams)
  - Includes: inventory waste reduction, better fulfillment positioning, faster markdown responses
  - My contribution: Information design and visibility improvements that enabled faster buyer decision-making
- **Reduced decision cycle time** from 5-7 days to 1-2 days for assortment changes
- **Increased pricing flexibility** — ability to respond to demand within hours rather than weeks
- **Handled 3x traffic** during COVID while actually *improving* experience metrics

#### Team & Organizational Impact
- Led **two cross-functional teams** spanning US and India (20-30 people) through a crisis
- Established **journey-based team structure** that became the template for other Walmart digital initiatives
- Mentored 3 junior designers on the India team; 2 were promoted within 2 years
- Created a **design operating model** that improved communication between design, merchandising, and engineering

![Team & Organizational Growth](../../images/results/results-team.png)

---

### Key Design Decisions & Why

**Decision 1: Design the Journey, Not the Feature**
- **Alternative**: Keep existing siloed structure, optimize each function independently
- **Why I chose journeys**: Silos create inconsistency and slow decisions. Journey ownership forces accountability and enables fast, coordinated decisions.
- **Execution**: I personally designed the journey improvements while leading teams to execute in their domains.
- **Outcome**: The unified journey approach became the standard for Walmart digital.

**Decision 2: Make Help Proactive, Not Reactive**
- **Alternative**: Improve each support channel separately (web help, then chat, then email)
- **Why I chose unified help**: We were drowning in support volume (~300% increase YoY). One decision that worked everywhere was faster than sequential improvement.
- **Execution**: 
  - I personally designed the central Help Hub architecture and information structure
  - I created the design system for help content (tone, terminology, structure) so other designers could extend it
  - I led the team through user testing and iteration
- **Outcome**: 
  - Self-service resolution improved from 35% → 62%
  - CSAT improved from 3.2 → 4.1 out of 5
  - Support costs reduced by millions (shared attribution with support operations team)
  - This approach became the template for help across all Walmart digital properties

**Decision 3: Design for Data Visibility, Not Process Efficiency**
- **Alternative**: Digitize existing manual merchandising processes
- **Why I chose data-first**: The processes were broken. Digitizing them would just automate inefficiency. Instead, fix the underlying problem: access to real-time data.
- **Execution**: I designed the interfaces to surface the right data. Then the team built the systems behind them.
- **Outcome**: This reframing unlocked $billions in operational efficiency.

**Decision 4: Lead With Design, Not Just Coordinate**
- **Alternative**: Hire an experienced designer to execute, I focus on leadership and coordination
- **Why I chose hands-on**: The design challenges were novel and urgent. I needed to personally understand the problems to make the right calls. Plus, the team needed to see design thinking in action during a crisis.
- **Outcome**: The team learned decision-making by watching. They could make decisions in my absence because they understood the *why*, not just the *what*.

---

### Lessons Learned

**1. Design Leadership in a Crisis Requires Hands-On Work**
People were scared. Teams were fragmented. The only way to stabilize things was to:
- Design the right solutions myself (not just directing)
- Show the team how to approach problems under pressure
- Make decisions fast and explain the reasoning

**2. Unified Ownership Creates Speed**
Silos slow things down because:
- Each team optimizes locally (their feature looks good, but the journey is broken)
- Coordination overhead increases with team count
- No one is accountable for the end-to-end experience

Journey-based ownership fixed all of this.

**3. Data Makes Design Better AND Faster**
When we made the right data visible in the merchandising platform:
- Decision-making improved
- Decisions got faster
- Confidence increased (buyers knew they were making informed choices)

This principle applies everywhere: Customer-facing design and internal systems both improve with better data visibility.

**4. Distributed Teams Can Execute Fast**
Working with US + India teams during a crisis could have been a bottleneck. Instead:
- Clear design processes and principles meant the team could execute autonomously
- I reviewed all major decisions, but didn't need to see every detail
- Time zone difference created overlapping working hours for continuous iteration
- The team grew capable of making decisions without me

**5. Design Systems Are Crisis-Busters**
When things are chaotic:
- Clear design principles keep everyone aligned
- A documented system prevents style debates during emergencies
- Reusable patterns speed up execution

The design system I established became the anchor that held everything together.

**What I'd Do Differently**:
- **Plan for scale earlier**: We built for current demand, then had to re-architect for larger scale. Building with 3x scale in mind from the start would have been better.
- **Invest more in team communication**: Leading distributed teams during crisis was hard. More explicit communication frameworks from the start would have helped.
- **Document decisions in real-time**: We made countless decisions under pressure. Better documentation would have made it easier for others to make similar calls independently.

---

### The Legacy

**Two years later**:
- The **journey-based team structure** became the standard for Walmart digital
- The **merchandising platform** became the backbone for inventory decisions across the company
- The **unified help framework** remains the template for all Walmart customer support
- **Walmart+** grew into a core business line (11M users)

Most importantly: **We proved that design leadership matters during crises.** We didn't just ship features—we:
- Stabilized a platform that was breaking under load
- Improved customer experience while scaling 3x
- Transformed internal operations (saving $billions)
- Built team capability that persists today

---

## Takeaways for Design Leadership

This project demonstrated that **design leaders who make an impact**:

1. **Get Hands-On During Critical Moments**: Don't just coordinate—design. Show the team how you approach problems.
2. **Own the Whole Experience**: Not features, not functions—journeys. End-to-end ownership creates accountability.
3. **Make Data Visible**: Both for customers (help them make decisions) and internally (help teams make decisions).
4. **Lead by Doing**: The team learned more from watching me design under pressure than from any instruction.
5. **Design for People and Organizations**: Good design helps users AND makes operations efficient.

---

**Project**: Walmart.com — Customer Journey & Merchandising Platform Transformation  
**Role**: Design Manager III (Hands-On Design Lead)  
**Timeline**: 2020–2021  
**Team Led**: 2 distributed teams, 20-30 people (US + India)  
**Impact**: $5-8B operational impact, unified customer experience, enabled Walmart+ launch (now 11M users)  
**Hands-On Contribution**: Personally designed search/browse, product pages, smart substitutions, help system, and merchandising platform interfaces
