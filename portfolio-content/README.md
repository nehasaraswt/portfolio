# Portfolio Content Organization
## Neha Saraswat — Director of Design

---

## Overview

This folder (`portfolio-content/`) contains all content, assets, and materials needed to build your new portfolio website. It's organized by content type and case study to make it easy to manage, update, and deploy.

---

## Folder Structure

```
portfolio-content/
├── case-studies/
│   ├── walmart-enterprise-redesign/
│   ├── 247-ai-product/
│   ├── case-study-4/                   ← [Select 3rd project]
│   ├── case-study-5/                   ← [Optional backup]
│   └── [README guides in each folder]
│
├── assets/
│   ├── hero-images/                    ← Homepage hero, about page image
│   ├── project-thumbnails/             ← Small card images for "all work"
│   ├── favicon/                        ← Browser tab icon
│   └── social-images/                  ← Open Graph/social preview images
│
├── resources/
│   ├── resume-highlights/              ← Bullet points, metrics for about section
│   ├── speaking-publications/          ← Talks, articles, thought leadership
│   ├── testimonials/                   ← Client/manager feedback
│   └── background-research/            ← Research & data for case studies
│
└── README.md                           ← This file
```

---

## Quick Start Guide

### Step 1: Organize Your Case Studies
**What to do**:
1. Review the PDFs in `/leaves/` folder
2. Select 3 projects for featured case studies:
   - **Project 1**: Walmart Enterprise (recommended — enterprise transformation narrative)
   - **Project 2**: 247.ai (recommended — design systems + emerging tech narrative)
   - **Project 3**: One of 01-06.pdf (TBD based on your choice)

**How to organize**:
- Walmart → `case-studies/walmart-enterprise-redesign/` ✅ (already set up)
- 247.ai → `case-studies/247-ai-product/` ✅ (already set up)
- Third project → Rename `case-study-4/` to match project (e.g., `case-study-design-systems/`)

**Reference**:
- Read `walmart-enterprise-redesign/README.md` for detailed guidance
- Read `247-ai-product/README.md` for systems-focused example
- Use `case-study-4/README.md` to decide on your third project

---

### Step 2: Gather Content from Original PDFs

**For each case study**:

1. **Extract Images**:
   - Hero image: Cover page or key team/org diagram
   - Process images: Research, workshops, iteration, team photos (4-6 images)
   - Solution images: Final designs, components, systems (4-6 images)
   - Results images: Metrics, adoption charts, impact visualization (2-4 images)

2. **Gather Written Content**:
   - Business context: What was the situation when you started?
   - Team details: Size, roles, scope of influence
   - Timeline: How long did this take? What were phases?
   - Metrics: Any quantified impact you have data for
   - Key decisions: What were pivotal decisions? Why did you make them?
   - Lessons learned: What would you do differently?

3. **Place in Folders**:
   ```
   case-studies/[project-name]/
   ├── images/
   │   ├── hero/project-hero.jpg
   │   ├── process/process-01.jpg through process-06.jpg
   │   ├── solution/solution-01.jpg through solution-06.jpg
   │   └── results/results-01.jpg through results-04.jpg
   └── supporting-docs/
       ├── research-findings.pdf
       ├── testimonials.txt
       └── quantified-impact.csv
   ```

---

### Step 3: Write Case Study Content

**Structure for each case study** (`/content/case-study.md`):

```markdown
# [Case Study Title]
## Subtitle emphasizing leadership/strategic impact

### Challenge
[300-400 words]
- Business/org context
- The problem
- Stakeholder situation
- Your mandate/goal

### Approach
[400-500 words]
- Your strategic thinking
- Key decisions and why
- Phases or timeline
- Team/org implications

### Process
[400-500 words with images]
- Discovery/research
- How you iterated
- Stakeholder alignment
- Team collaboration

### Results
[300-400 words]
- Quantified outcomes
- Business impact
- Team impact
- Lasting legacy

### Key Decisions
[200-300 words]
- 2-3 pivotal decisions
- Why you made them
- What you learned

### Lessons Learned
[200-300 words]
- What worked
- What you'd do differently
- Insights for your philosophy
```

**Total length per case study**: 2000-2500 words

**Writing tips**:
- **Lead with strategy**: "Here's why I made this choice" not just "Here's what we designed"
- **Emphasize leadership**: "I led X people through Y process" not "I designed Z"
- **Quantify everything**: 89% adoption, +34% velocity, -28% support tickets
- **Show your thinking**: Key decisions section is critical for director positioning
- **Be honest**: What didn't work? What did you learn?

---

## Image Management

### Image Organization

```
case-studies/[project-name]/images/

├── hero/
│   ├── project-hero.jpg              (1200x675px)
│   └── project-hero-@2x.jpg          (2400x1350px retina)
│
├── process/
│   ├── process-01.jpg                (1000x600px)
│   ├── process-02.jpg
│   ├── process-03.jpg
│   ├── process-04.jpg
│   ├── process-05.jpg
│   └── process-06.jpg
│
├── solution/
│   ├── solution-01.jpg               (1000x600px)
│   ├── solution-02.jpg
│   ├── solution-03.jpg
│   ├── solution-04.jpg
│   ├── solution-05.jpg
│   └── solution-06.jpg
│
└── results/
    ├── results-01.jpg                (800x400px)
    ├── results-02.jpg
    ├── results-03.jpg
    └── results-04.jpg
```

### Image Specifications

| Type | Dimensions | Format | Max Size | Source |
|------|-----------|--------|----------|--------|
| Hero | 1200x675px (16:9) | JPG | 200KB | Original PDFs |
| Process | 1000x600px | JPG | 150KB | PDFs, photos, photos |
| Solution | 1000x600px | JPG | 150KB | Design files, PDFs |
| Results | 800x400px | JPG | 100KB | Figma/Illustrator |
| Thumbnails | 400x400px | JPG | 80KB | Hero scaled down |

### Image Optimization
- Use TinyPNG (https://tinypng.com) to compress without quality loss
- Test images on both standard and retina displays (2x)
- Use WebP with JPG fallback for web deployment

### Best Sources for Images

1. **Original PDFs** (`/leaves/` folder) — Extract screenshots, diagrams
2. **Design files** — Export components, patterns, before/afters
3. **Team photos** — Workshops, critiques, team collaboration
4. **Process artifacts** — Research synthesis, explorations, documentation
5. **Figma/Illustrator** — Create clean metric visualizations

---

## Assets Folder

### `/assets/hero-images/`
Place images for:
- Homepage hero background (or use description text)
- About page hero image (your photo or workspace)
- Contact section background
- Any full-width page hero images

### `/assets/project-thumbnails/`
Place thumbnail versions (400x400px) of project images for:
- "All Work" page if you create one
- Social media cards
- Anywhere projects need to be displayed in grid

### `/assets/favicon/`
Place:
- `favicon.ico` (32x32px)
- `apple-touch-icon.png` (180x180px)
- These appear in browser tab and when someone bookmarks your site

### `/assets/social-images/`
Place Open Graph images for:
- Homepage share image (1200x630px)
- Individual case study share images (1200x630px)
- Used when portfolio is shared on LinkedIn, Twitter, etc.

---

## Resources Folder

### `/resources/resume-highlights/`
Create a `HIGHLIGHTS.md` with:
```markdown
## Resume Highlights

### Key Metrics
- Teams Led: 50+ people across 3+ organizations
- Products Shipped: 25+
- Design Systems Established: 3
- Designers Mentored to Leadership: 8+

### Experience Highlights
- Fortune 500 enterprise design leadership
- AI/ML product design and systems
- Design organization scale from 0→50+ people
- [Add your specific highlights]

### Recognition
- [Speaking engagements, awards, publications]
- [Where you've been mentioned or quoted]
- [Industry recognition]
```

### `/resources/testimonials/`
Create `TESTIMONIALS.md`:
```markdown
## Testimonials & Recognition

### Manager/Executive Testimonials
[Quotes about your leadership, impact, skills]

"[Manager Name] — [Title]"
"Working with Neha transformed how our organization thinks about design..."

### Peer Recognition
[Feedback from collaborators, designers]

"[Colleague Name] — [Role]"
"Neha's ability to build design systems while scaling teams is exceptional..."
```

Get these by:
- Reaching out to former managers, executives
- Asking team members you've mentored
- Pulling from LinkedIn recommendations

### `/resources/speaking-publications/`
Create `THOUGHT_LEADERSHIP.md` with links to:
- Conference talks you've given
- Articles you've written
- Interview appearances
- Design frameworks you've published

Example:
```markdown
## Speaking & Publications

### Talks
- "Design Leadership in Enterprise" — Conference Name, 2024
- "Building Sustainable Design Systems" — Podcast Name, 2023

### Articles
- "How to Scale a Design Team from 0 to 50"
- "Design Patterns for AI-First Products"

### Frameworks
- Design Maturity Model (5 levels)
- Design System Sustainability Checklist
```

### `/resources/background-research/`
Keep here:
- Original research or data you gathered
- Competitive analysis (if you did any)
- User research findings
- Industry reports you referenced
- Any supporting documents

---

## Content Integration Guide

### How Content Flows to Website

**Case Study → HTML Page**:
```
case-studies/walmart-enterprise-redesign/
├── content/case-study.md
└── images/ (hero, process, solution, results)

        ↓ [During website build]
        
portfolio-template.html 
→ /work/enterprise-design-culture-walmart.html
  (with embedded images and formatted content)
```

**Assets → Website**:
```
assets/
├── hero-images/homepage-hero.jpg
│   ↓
│   Used as: <img src="assets/hero-images/homepage-hero.jpg">
│
├── project-thumbnails/walmart-thumb.jpg
│   ↓
│   Used as: Card images on "All Work" page
│
└── social-images/case-study-og.jpg
    ↓
    Used as: <meta property="og:image">
```

**Resources → About/Contact**:
```
resources/
├── resume-highlights/HIGHLIGHTS.md
│   ↓
│   Creates: About section metrics & background
│
├── testimonials/TESTIMONIALS.md
│   ↓
│   Creates: Optional "What others say" section
│
└── speaking-publications/THOUGHT_LEADERSHIP.md
    ↓
    Creates: Optional "Thought leadership" section
```

---

## Next Steps Checklist

### Week 1: Organize & Decide
- [ ] Review all PDFs in `/leaves/` folder
- [ ] Select your 3 featured case studies
- [ ] Rename `case-study-4` and `case-study-5` folders appropriately
- [ ] Decide on third case study narrative (use template guidance)

### Week 2: Extract & Organize Images
- [ ] Extract images from each PDF
- [ ] Place in appropriate folders (hero, process, solution, results)
- [ ] Resize and optimize all images
- [ ] Create hero images if needed

### Week 3: Gather Written Content
- [ ] Collect metrics and quantified impact for each project
- [ ] Gather testimonials from managers/collaborators
- [ ] Organize timeline and team information
- [ ] Identify key decisions for each project

### Week 4: Write Case Studies
- [ ] Write Challenge section for each case study
- [ ] Write Approach section (strategic thinking)
- [ ] Write Process section (with image callouts)
- [ ] Write Results section (with metrics)

### Week 5: Fill Supporting Materials
- [ ] Create resume highlights
- [ ] Gather testimonials
- [ ] Document speaking/thought leadership (if any)
- [ ] Create metadata.json for each case study

### Week 6: Build Website
- [ ] Adapt PORTFOLIO_TEMPLATE.html with your content
- [ ] Test on mobile, tablet, desktop
- [ ] Optimize images and performance
- [ ] Deploy (Vercel, Netlify, or GitHub Pages)

---

## File Naming Conventions

### Case Study Folders
- ✅ `walmart-enterprise-redesign` (kebab-case, descriptive)
- ✅ `247-ai-product` (project name + category)
- ✅ `design-systems-scale` (capability + context)
- ❌ `Project 1` (use kebab-case, not spaces)
- ❌ `walmart` (too vague)

### Image Files
- ✅ `process-01.jpg`, `process-team-workshop.jpg`
- ✅ `results-velocity-metric.jpg`
- ❌ `img1.jpg`, `screenshot.jpg` (non-descriptive)
- ❌ `Screen Shot 2024-05-05 at 3.45.12 PM.png` (keep it simple)

### Content Files
- ✅ `case-study.md`, `challenge.md`, `results.md`
- ✅ `metadata.json` (for SEO data)
- ❌ `CS1.md`, `case_study_walmart.docx`

---

## Metadata Template

Create `metadata.json` in each case study's `/content/` folder:

```json
{
  "title": "Scaling Design Leadership in Enterprise Organizations",
  "subtitle": "Walmart — Enterprise Product Design Transformation",
  "description": "Built design practice from zero in Fortune 500 org. Grew team from 1 to 12 designers, established design governance, shifted organizational culture.",
  "slug": "enterprise-design-culture-walmart",
  "role": "Design Director",
  "timeline": "2023–2024",
  "tags": ["Enterprise Design", "Team Building", "Design Systems", "Organizational Transformation"],
  "metrics": {
    "design_system_adoption": "89%",
    "velocity_improvement": "+34%",
    "team_growth": "1 → 12",
    "support_ticket_reduction": "-28%"
  },
  "featured": true,
  "order": 1
}
```

---

## Design System Reference

When writing content and organizing images, reference:
- **Color Scheme**: See `DESIGN.md` or `PORTFOLIO_STYLE_GUIDE.md`
- **Typography**: Newsreader (headlines), Inter (body), Space Grotesk (labels)
- **Spacing**: 16px, 24px, 32px, 48px (use multiples of 8px)
- **Components**: Cards, buttons, grids all defined in `PORTFOLIO_STYLE_GUIDE.md`

---

## Common Questions

**Q: Where do I put my resume PDF?**
A: Keep it in `resources/resume-highlights/` as markdown bullets, OR upload final PDF to `/assets/` for download link in contact section.

**Q: Should I include all 8 projects from `/leaves/`?**
A: No. Select 3 for featured case studies. Optionally create a "Selected Work" section with 2-3 brief project descriptions (300-500 words each) instead of full case studies.

**Q: What if I don't have metrics for some projects?**
A: Be honest. You can still tell a compelling story without metrics. Focus on qualitative impact: "Established design culture," "Mentored 8 designers," "Created foundations for future growth." Quantify what you can; be narrative-focused for the rest.

**Q: Can I add more case studies later?**
A: Absolutely. Create new folders in `/case-studies/` following the same structure. The template is designed to scale.

**Q: What if I want to hide some projects?**
A: Create a `/archive/` folder for projects you're not featuring. You can always add them back later.

---

## Resources & References

- **Design System Guide**: `/PORTFOLIO_STYLE_GUIDE.md`
- **Content Strategy**: `/PORTFOLIO_CONTENT_STRATEGY.md`
- **HTML Template**: `/PORTFOLIO_TEMPLATE.html`
- **Case Study Examples**: 
  - `/case-studies/walmart-enterprise-redesign/README.md`
  - `/case-studies/247-ai-product/README.md`

---

## Support & Questions

If you need help:
1. Check the **README in each case study folder** for specific guidance
2. Review **PORTFOLIO_CONTENT_STRATEGY.md** for detailed examples
3. Reference **PORTFOLIO_STYLE_GUIDE.md** for design decisions

---

**Portfolio Structure Created**: May 5, 2026  
**For**: Neha Saraswat — Director of Design  
**Status**: Ready for content population
