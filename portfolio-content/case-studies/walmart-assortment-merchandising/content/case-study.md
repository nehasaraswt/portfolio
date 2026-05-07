# Designing the 0→1 Assortment & Merchandising Platform
## Walmart — Enterprise Operations System for Buyers & Assortment Teams

### The Challenge

COVID-19 exposed a critical operational bottleneck: Walmart's assortment and merchandising teams operated on legacy manual processes—spreadsheets, email chains, and paper-based approval workflows. These systems, designed for a stable inventory environment, completely collapsed under pandemic demand volatility.

**The Problem**:
- Buyers needed to make inventory and assortment decisions without real-time data
- Pricing adjustments took days when response needed to happen in hours
- Approval workflows created bottlenecks during peak crisis periods
- Manual processes couldn't scale with 3x traffic and demand volatility
- Decision cycle time: 5-7 days (needed to be 1-2 days)

**Impact**: Millions of dollars in lost efficiency daily. Wrong assortments stocked. Pricing unable to respond to demand.

**My Mandate**: Design and lead the 0→1 creation of a modern platform to digitize assortment management, pricing optimization, and approval workflows. This meant hands-on design of complex data interfaces while coordinating with merchandising, engineering, and finance teams.

![Assortment & Merchandising Strategy](../../images/process/process-strategy.png)

---

### The Approach

#### Phase 1: Discovery & Strategic Positioning (Weeks 1-4)

I started with a critical insight: digitizing broken processes would just automate inefficiency. Instead, I needed to **redesign the underlying decision-making framework**.

**Discovery Work**:
- Shadowed 20+ buyers to understand their decision workflows
- Mapped data sources (inventory systems, demand signals, competitive pricing)
- Interviewed merchandising leadership on bottlenecks and criteria
- Analyzed what data was *available* vs. what was actually being *used*

**Key Insight**: Buyers had access to less than 10% of the data they needed. The problem wasn't workflow—it was **visibility**.

**Strategic Decision**: Build a data-first platform. Surface the right information, and decisions get faster and better.

#### Phase 2: Core Interface Design (Weeks 4-16)

I personally designed three core interfaces:

**1. Assortment Management Dashboard** (I designed this)

*Problem*: Buyers needed to decide which products to carry by region, category, and season—all without clear visibility into what was selling, what was trending, or what was out of stock.

*My Design Challenge*: How do you present a multi-dimensional decision problem (product × region × season × demand) without overwhelming the user?

*My Design Solution*:
- **Data-driven recommendations**: AI surfaced what should be added/removed based on current trends
- **Clear metrics**: What's selling, what's trending, what's at risk of stockout
- **Drill-down capability**: Start macro (category level), dive into details as needed
- **Visual indicators**: Color-coded performance (green = strong, yellow = at-risk, red = failing)

![Assortment Management Interface](../../images/solution/solution-assortment-dashboard.png)

**2. Price Optimization Interface** (I designed this)

*Problem*: Pricing needed to respond to demand, supply, competitor prices, and seasonal factors in real-time. But pricing algorithms are complex—how do you make buyers *trust* the recommendations?

*My Design Challenge*: Make algorithmic pricing transparent without exposing complex math.

*My Design Solution*:
- **Factor visualization**: Show what's driving the price (demand up 20%, competitor price down, inventory surplus)
- **Confidence indicators**: How sure is the system? (95% confident vs. 60% confident)
- **Easy overrides**: Buyers can adjust with a single reason (e.g., "strategic pricing")
- **Impact preview**: "If you change this price, here's the estimated revenue impact"

![Price Optimization Interface](../../images/solution/solution-pricing-interface.png)

**3. Approval Workflows** (I designed this)

*Problem*: Enterprise governance requires approvals. But during a crisis, approvals create friction. How do you maintain control while enabling speed?

*My Design Challenge*: Fast approval paths that don't sacrifice oversight.

*My Design Solution*:
- **Clear hierarchies**: Who approves what? (Manager approves category changes, Director approves >20% price changes, CFO approves >$1M impact)
- **Emergency fast-track**: Crisis decisions get expedited approval
- **Smart notifications**: Approvals appear where buyers work, not buried in email
- **Visible status**: Buyers know exactly where their request is in the approval pipeline

![Approval Workflow Design](../../images/solution/solution-approval-workflow.png)

#### Phase 3: Design System & Team Enablement (Ongoing)

While designing the core interfaces, I established:
- **Design system** for data visualization (charts, metrics, indicators)
- **Pattern library** for complex forms and decision interfaces
- **Design specifications** detailed enough that engineering could build without ambiguity
- **Mentorship**: Junior designers on the team learned by working through these high-complexity problems

---

### The Results

#### Operational Impact
- **Decision cycle time**: 5-7 days → 1-2 days (2-5x faster)
- **Pricing flexibility**: Weekly price updates → hourly adjustments (enabled real-time response to demand)
- **Data-driven decisions**: Buyers now make assortment decisions with 90%+ of available data (vs. <10% before)
- **Approval throughput**: 300% increase in approval capacity without adding staff

#### Business Impact
- **~$2-3B in operational savings** (FY2021) — my design contribution to faster assortment decisions
- Part of **$5-8B total operational efficiency** (shared with merchandising and engineering teams)
- **Inventory optimization**: Reduced stockouts while decreasing overstock (balanced supply-demand better)
- **Markdown reduction**: Better assortment decisions = fewer excess markdowns

#### Scale & Sustainability
- Platform scaled to handle **3x traffic** during peak COVID periods
- Extended to manage **100,000+ SKUs** across regions and seasons
- System remains in use 3+ years later as core operational tool

---

### Key Design Decisions & Why

**Decision 1: Data-First, Not Workflow-First**
- **Alternative**: Digitize existing spreadsheet workflows
- **Why I chose data-first**: The real bottleneck was information access, not process. Fixing the data layer fixed everything downstream.
- **Outcome**: Buyers made better decisions faster because they could finally *see* what was actually happening.

**Decision 2: Transparency Over Simplicity**
- **Alternative**: Hide the complexity, show only final recommendations
- **Why I chose transparency**: Buyers needed to trust the system. Showing the "why" behind recommendations built that trust.
- **Outcome**: Adoption rates were high because buyers understood and agreed with the recommendations.

**Decision 3: Algorithmic Confidence**
- **Alternative**: Present all recommendations as equally confident
- **Why I chose confidence indicators**: Not all data is equally reliable. In March 2020, demand patterns were chaotic.
- **Outcome**: Buyers knew when to trust the system and when to override it—critical during crisis.

---

### Lessons Learned

**1. Design for the Data, Not Just the Interface**
The best interface design can't fix bad data. Understanding what data exists and what's missing is as important as interface design.

**2. Make Algorithmic Decisions Explainable**
When AI drives recommendations, designers must surface the reasoning. "Because the algorithm says so" doesn't build trust.

**3. Crisis Decisions Need Special Paths**
Normal approval workflows break down under extreme conditions. Designing for crisis (fast-track approvals, emergency overrides) is a form of resilience.

**4. Operational Design Has Multiplicative Impact**
Small efficiency gains in buyer workflows compound across thousands of decisions. A 10% faster decision-cycle on 10,000 weekly decisions = massive impact.

---

### The Legacy

Three years later, the assortment and merchandising platform remains:
- **Core operational tool** for all inventory and pricing decisions
- **Competitive advantage**: Real-time pricing flexibility is now a capability Walmart marketing highlights
- **Evolved system**: Engineering team continues to enhance and scale
- **Design standard**: The interface patterns became templates for other Walmart operational tools

**More importantly**: This work proved that **operational design matters**. The difference between a data-first and process-first approach was measurable in dollars, speed, and decision quality.

---

## Takeaways for Design Leaders

**Operational Systems Need Designers Too**

Enterprise operations tools don't get the design attention that consumer products do. But:
- A 5% efficiency gain across thousands of users = massive business impact
- Data visualization and decision interface design is high-leverage
- The best operational designers understand both the domain AND the interface design

**Design What Gets Used, Not Just What Looks Good**

Internal tools live or die by adoption. If buyers don't trust the system or understand the recommendations, they'll go back to spreadsheets. That means:
- Transparency > simplicity
- Clear reasoning > hidden complexity
- Explainability > pure elegance

---

**Project**: Walmart — Assortment & Merchandising Platform  
**Role**: Group Design Lead (Hands-On Design, Crisis Leadership)  
**Timeline**: 2020–2021 (crisis response + stabilization)  
**Team**: Cross-functional (merchandising, engineering, finance, analytics)  
**Impact**: $2-3B operational savings, 2-5x faster decision cycles, enabled real-time pricing  
**Legacy**: Core system in use 3+ years later; design patterns became standard across Walmart operations
