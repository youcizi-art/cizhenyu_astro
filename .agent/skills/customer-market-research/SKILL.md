
---
name: customer-market-research
description: Research a B2B export client's company, products, target markets, buyer needs, industry and competitors. Use in workflow Step 1 before website positioning or keyword research.
---

# Customer, Industry, Market and Competitor Research

## Objective

Produce a verifiable research dossier for a B2B export website project.

This skill covers only:
1. Client and product research
2. Industry and target-market research
3. Buyer and procurement research
4. Competitor discovery and comparison
5. Evidence-based conclusions and handoff

Do not start keyword clustering, website positioning, sitemap design, page planning, copywriting or development.

## Operating rules

1. Use the currently available web search, browser, file-reading and website-fetching tools. Use Firecrawl MCP when configured and available.
2. Do not assume any tool, API key, website access or paid subscription exists. Verify tool availability before use.
3. Search in the languages used by the target market. For international B2B research, include English queries and the target country's language when relevant.
4. Prefer primary sources: client documents, manufacturer pages, technical specifications, government sources, standards bodies, industry associations and official competitor websites.
5. Use industry publications, buyer discussions, reviews and directories as supporting evidence, not as unquestionable facts.
6. Every material factual claim must have a source URL, page title and publication/update date when available. Record the access date.
7. Distinguish:
   - Verified fact
   - Company or competitor claim
   - Third-party report
   - Inference
   - Unknown / requires confirmation
8. Never fabricate market size, revenue, traffic, sales volume, search volume, customer counts, rankings, certifications or pricing.
9. A competitor's public website proves what it publishes, not that its claims are independently verified.
10. Do not treat search-result counts as market size or demand.
11. If sources conflict, record both sources, explain the conflict and do not silently choose one.
12. If a page cannot be accessed, record the failure and use another source. Do not pretend to have read inaccessible content.
13. Do not contact companies, submit forms, register accounts, or make purchases.
14. Save research artifacts in the current project. Reuse existing client documents rather than duplicating them.

## Research workflow

### A. Client and product baseline

Inspect all provided client materials and the client's official website.

Record:
- Company name, official domain, location and business model
- Manufacturer, trading company, brand owner or unknown
- Product categories and specific models
- Specifications, applications, materials, options and accessories
- Certifications and regulatory claims, with evidence
- MOQ, production capacity, lead time, warranty and customization, if published
- Packaging, shipping and after-sales information, if published
- Existing target countries, customer types and sales channels
- Existing website structure and publicly visible trust signals

For every missing commercial fact, add a question to `client-questions.md`.

Never infer that the client has a factory, certification, stock, patent, low MOQ or export experience without evidence.

### B. Industry and market research

Research the product category and candidate target markets.

Investigate:
- Product terminology and common industry classifications
- Main applications and use cases
- Buyer types and purchasing roles
- Procurement criteria and common objections
- Relevant standards, certifications and import requirements
- Established sales channels and distribution models
- Competitor types and market structure
- Published market-size estimates, only when the methodology and source can be checked
- Evidence of buyer interest, such as procurement discussions, industry events, tenders or category-specific reports

For market-size claims, record the publisher, report date, geography, definition, unit and methodology if available.

Do not extrapolate a global market figure into the client's addressable market without explaining assumptions.

### C. Competitor discovery

Discover candidates using several distinct searches:
- Product category + manufacturer / supplier / OEM / wholesale
- Product category + target country
- Product category + distributor / importer / retailer
- Product category + alternatives or competing solutions
- Competitors named by the client

Build an initial candidate list, then verify each candidate's actual product category and relevance.

Classify each as:
- Direct competitor
- Indirect competitor
- Distributor / reseller
- Marketplace seller
- Unverified candidate

Do not label a company a direct competitor based only on a similar name or one search snippet.

### D. Competitor evidence collection

For each verified direct competitor, inspect its homepage and relevant product, application, industry, about, certification, shipping, warranty and contact pages when available.

Record:
- Company and website
- Product range and target buyer
- Publicly stated positioning and differentiators
- Technical and commercial information
- Trust signals and supporting evidence
- Content types and visible site structure
- Calls to action and inquiry methods
- Public case studies, customer evidence and certifications
- Weaknesses or gaps that are directly observable
- Sources and access dates

Do not claim a competitor has high traffic, high conversion or strong SEO performance without reliable data that directly supports the claim.

### E. Evidence review

For every important conclusion:
- Attach at least one source URL.
- Seek a second independent source for high-impact claims where practical.
- Mark source freshness and evidence strength.
- Separate observed facts from interpretations.
- Record missing data and unresolved contradictions.

Use these evidence labels:
A = primary source or official record
B = credible industry source or corroborated evidence
C = indirect signal or uncorroborated secondary source
D = hypothesis or unverified lead

These labels describe evidence quality, not the overall truth of an entire company or report.

## Required deliverables

Create the following files:

1. `research/client-profile.md`
   Client facts, product details, evidence and missing information.

2. `research/market-industry.md`
   Industry structure, target-market evidence, buyer types, procurement criteria and regulatory research leads.

3. `research/competitor-list.csv`
   Company, URL, classification, target market, product fit, verification status and source URL.

4. `research/competitor-comparison.md`
   Evidence-backed comparison of verified competitors, with source links.

5. `research/evidence-register.csv`
   Claim, source title, URL, source type, publication date, access date, evidence grade, confidence, limitations and verification status.

6. `research/client-questions.md`
   Only the questions that materially affect later decisions, grouped by product, market, compliance, commercial capability and customer profile.

7. `research/step-1-summary.md`
   Executive summary, strongest findings, evidence-backed opportunities, unresolved risks, research limitations and handoff notes for Step 2.

## Completion criteria

Do not declare completion until:
- Client and product facts are separated from assumptions.
- Market claims have traceable sources or are marked unverified.
- Competitor candidates have been checked for relevance.
- The comparison includes source URLs.
- Missing data and client questions are documented.
- All required files exist and are internally consistent.

If available tools or source coverage are insufficient, report the limitation explicitly and deliver a partial dossier. Never fabricate completion.
