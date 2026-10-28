---
name: opportunity-discovery
description: Identify and evaluate practical SEO/GEO customer-acquisition opportunities for the client's existing products, business model, manufacturing capabilities, target buyers, and target markets. Use in Step 2 of the workflow after Step 1 research.
---

# Opportunity Discovery

## 1. Mission and boundaries

The goal is to identify and evaluate practical SEO/GEO customer-acquisition opportunities for the client's existing products, business model, manufacturing capabilities, target buyers, and target markets.

Do not assume the client can change product specifications, manufacturing capabilities, certifications, cost structure, delivery times, pricing, or commercial positioning.

Do not treat competitor weaknesses or content gaps as the primary basis for strategy. They are optional supporting references.

This Skill governs Step 2 only. It does not perform the full keyword expansion, clustering, search-intent classification, and page mapping reserved for Step 3. It must not start website development, full content production, or off-site campaigns.

## 2. Read existing research first

Read the available Step 1 files:

* research/client-profile.md
* research/market-industry.md
* research/competitor-list.csv
* research/competitor-comparison.md
* research/evidence-register.csv
* research/client-questions.md
* research/step-1-summary.md

Read only files that actually exist. Record missing files and do not claim to have reviewed them.

Extract:

* Existing products and product constraints
* Target buyers and buying process
* Target countries, regions, and languages
* Current commercial objectives
* Known differentiators and limitations
* Existing website and marketing assets
* Known competitors
* Unresolved questions and uncertain claims

Reuse Step 1 findings when they remain relevant. Revalidate important claims if new evidence contradicts them.

## 3. Research stages

Execute the stages in order. Do not skip the data-sufficiency gate.

### Stage A: Independent research

Before asking the user for additional data, use the tools and information already available.

Research relevant areas:

1. Existing product and category demand
2. Buyer search language and purchasing questions
3. Commercial and supplier-selection intent
4. Application, industry, and use-case demand
5. Product specifications, comparisons, and procurement requirements
6. Website content, product information, trust evidence, and inquiry paths
7. Public search results and relevant competitor pages
8. Public trend information where accessible
9. Existing first-party analytics and advertising data, if authorized and connected

Create research/step-2/initial-research.md.

Record what was actually inspected, the source URLs, access dates, market and language settings, findings, and unresolved questions.

Do not infer search volume, conversion rates, traffic, revenue, or market share from the number of search results or from general reasoning.

### Stage B: Data-sufficiency gate

After Stage A, assess whether current evidence is sufficient for the decisions that matter.

For each material uncertainty, record:

* The question that remains unanswered
* The decision affected by the uncertainty
* The available evidence
* The missing dataset, if any
* Whether that dataset could materially change the conclusion or opportunity ranking
* Whether an existing connected tool or a free source can obtain it
* Whether asking the user is worthwhile
* The fallback if the data cannot be obtained

Do not request a dataset merely because it would be interesting to have.

Request additional data only if it is likely to materially improve the decision and cannot reasonably be obtained through available authorized tools or other practical sources.

Create research/step-2/data-sufficiency-assessment.md.

#### Decision rules

* If existing evidence is sufficient, proceed to Stage D.
* If more evidence is needed and an authorized tool can obtain it, proceed to Stage C and obtain it.
* If more evidence is needed but the user must supply it, create a specific request using Stage C. Pause at this checkpoint and wait for the user's response.
* If the user declines, cannot provide the data, or explicitly asks to continue without it, use the fallback strategy in Stage C.
* Never claim that an unanswered request has been fulfilled.

### Stage C: Data acquisition, user requests, and fallback

#### C1. Check available tools first

Inspect the tools that are actually connected and usable.

Possible sources include:

* Search and webpage retrieval tools
* Authorized Google Ads account data or exports
* Google Ads Keyword Planner
* Public Google Trends pages and exports
* Authorized Google Search Console or Bing Webmaster Tools data
* Client-provided analytics, inquiry, or sales summaries

Do not assume a connector is available just because the product or API exists.

Do not use a different advertiser's historical search-term or conversion results as proof of the client's own performance.

#### C2. Google Ads search-term data

If relevant advertising data is accessible through an authorized account, inspect the available Search terms report or relevant search-term insights.

Useful fields may include:

* Actual search term or aggregated search category
* Matched keyword, where available
* Campaign and ad group
* Date range
* Impressions
* Clicks
* Cost
* Conversions and conversion value, if configured
* Relevant targeting settings, where available

Use only fields that the actual report contains.

Check whether the account, campaign, products, target countries, and conversion definitions are relevant to the client.

Search-term reports do not necessarily expose every query. Treat the visible queries as an incomplete view of the account's advertising traffic.

If no relevant historical campaign data exists, do not ask the user to export an empty or irrelevant report. Consider Keyword Planner and public research instead.

#### C3. Google Ads Keyword Planner

When historical campaign data is insufficient and search-demand estimates could change the decision, generate a client-specific candidate keyword list first.

The agent, not the user, must determine the seed terms using the existing product information, target buyers, target markets, and initial research.

If Keyword Planner is available through an authorized account or API, obtain the relevant metrics directly.

Otherwise, request a targeted export only if it is worth the effort. The request must state:

* Which generated keyword list to use
* Which country or region to target
* Which language to select
* Which report or feature to open
* Which metrics and date range to include
* Which file format to export
* Where to provide the resulting file

Relevant metrics may include average monthly searches, monthly historical volume where available, advertising competition, and top-of-page bid ranges.

These are estimates or advertising-market metrics, not the client's actual organic traffic or organic ranking difficulty.

#### C4. Google Trends

Try accessible public Google Trends pages before asking the user to perform manual work.

Choose relevant product terms, synonyms, buyer terminology, target country or region, time range, and search type based on Stage A.

Record the query, comparison terms, market, time range, search type, access date, and observations.

If a CSV export is available, preserve it and its query settings.

Trends indices are normalized relative-interest measures, not absolute search counts. Related queries and rising queries are discovery signals, not proof of commercial demand.

Do not depend on an unofficial Trends API or MCP unless it has been verified for reliability, access, and permitted use. If automated access fails, use manual export only when it materially improves the decision.

#### C5. Other client data

Request a client-provided inquiry, sales, or website dataset only if it answers a material question that available sources cannot resolve.

Prefer aggregated or redacted information over personal customer records.

State exactly which fields are needed and why. Do not ask the client to upload passwords, access tokens, or unnecessary personal information.

#### C6. Generate specific user instructions

Every user data request must be tailored to the client's actual research.

Create research/step-2/user-data-request.md.

The request must explain:

1. What is missing and why it matters
2. What exact data is requested
3. Why it is relevant to the client's products and markets
4. Where to find the data
5. The exact filters, dates, countries, languages, and fields to use
6. How to export and submit the file
7. What the agent will do with the data
8. What will happen if the user skips the request

Do not ask a non-technical user to decide which SEO metrics or keywords are important.

If multiple datasets are requested, prioritize them and explain which are essential versus optional.

Pause after presenting the request when user input is genuinely required. Resume the workflow when the user supplies data, declines, or asks to continue without it.

#### C7. Fallback when data is unavailable

If data is missing, unavailable, or declined:

* Use the strongest remaining evidence sources.
* Continue with the research that can still be completed.
* Separate verified findings from estimates, inferences, and unknowns.
* Reduce confidence where evidence is weaker.
* Record the missing data and its likely effect on the conclusions.
* Do not invent substitute numbers.
* Do not block the entire Step 2 workflow because optional data is missing.

Create research/step-2/data-validation-report.md when data is supplied, retrieved, or otherwise evaluated. If no additional data was needed, explain this in the report.

### Stage D: Evaluate opportunities for the existing business

Evaluate practical opportunities such as:

* Improving the discoverability of existing products
* Expanding relevant buyer terminology and use-case coverage
* Improving existing product pages and purchase information
* Making specifications, certifications, OEM/ODM capabilities, MOQ, lead time, and other relevant purchasing details clearer where accurate and available
* Addressing buyer concerns and supplier-selection questions
* Improving trust evidence and inquiry paths
* Improving content clarity and factual completeness
* Identifying relevant industry, application, and regional opportunities
* Improving how the client's existing expertise and product capabilities are communicated
* Investigating observed AI-search mentions and cited sources where direct checks are available

Only recommend claims about certifications, capabilities, performance, delivery, or product benefits when supported by evidence or confirmed by the client.

Do not require the client to change products or manufacturing capabilities to fit an SEO recommendation.

#### Competitor analysis policy

Competitor analysis is supporting evidence.

It may identify:

* Competitor strengths worth learning from
* Weak or missing buyer information
* Potential content gaps
* Ways to communicate the client's actual advantages more clearly
* Areas where competitors appear stronger and where the client may face difficulty

Do not automatically prioritize a competitor gap.

A gap is not necessarily a business opportunity. Validate relevance, demand evidence, fit with the existing product, feasibility, and business value.

Do not recommend abandoning a relevant market or query merely because competitors are stronger.

Create research/step-2/competitor-opportunity-reference.md.

#### Opportunity evaluation

For each meaningful opportunity, record:

* Opportunity ID
* Buyer or business problem
* Proposed opportunity
* Product and target market fit
* Evidence supporting demand or relevance
* Data source and evidence quality
* Potential customer-acquisition value
* Practical feasibility and dependencies
* Resource or implementation cost, where reasonably known
* Risks and unresolved assumptions
* Recommended next action

Prioritize opportunities qualitatively as High, Medium, Low, or Uncertain. Explain each priority with evidence and business reasoning.

Do not manufacture precise numerical rankings or conversion forecasts where the data cannot support them.

Present strategic alternatives when the best direction depends on client preferences or constraints. Let the client decide between these alternatives.

### Stage E: Final synthesis

Create the required outputs listed in Section 4.

The final summary must distinguish:

* Verified observations
* Third-party or company claims
* Estimates
* Agent inferences
* Unknowns and unresolved decisions

State which findings can be used directly in Step 3 and which need further validation.

Do not begin the full keyword clustering and page mapping assigned to Step 3.

## 4. Required deliverables

Create files under research/step-2/:

1. initial-research.md
   * Independent research, sources inspected, preliminary findings, and open questions.
2. data-sufficiency-assessment.md
   * Missing evidence, decisions affected, data value, availability, and whether user input is needed.
3. user-data-request.md
   * Specific instructions for requested files, or a clear statement that no additional user data was needed.
4. data-validation-report.md
   * Files and datasets received or accessed, fields, coverage, quality checks, relevance, and limitations.
5. opportunity-register.csv
   * One row per opportunity with ID, description, product fit, target market, evidence, priority, feasibility, risks, and next action.
6. opportunity-evidence.csv
   * Opportunity ID, source URL or dataset identifier, source title, source type, access date or date range, market, language, evidence observed, evidence classification, and limitations.
7. buyer-needs-map.md
   * Buyer groups, needs, purchasing questions, decision criteria, and supporting evidence.
8. competitor-opportunity-reference.md
   * Competitor strengths, weaknesses, potential gaps, and optional learning opportunities. Keep these separate from the main prioritization logic.
9. growth-strategy-options.md
   * Practical options for improving customer acquisition without assuming the client's products or business model can change. Include benefits, trade-offs, feasibility, dependencies, and unresolved decisions.
10. data-limitations.md
    * Missing datasets, source limitations, estimates, uncertainty, and the effect on conclusions.
11. step-2-summary.md
    * Main findings, strongest opportunities, important limitations, data request status, client decisions needed, and handoff to Step 3.

If a dataset or section is not applicable, state why. Never fabricate content to make the deliverables appear complete.

## 5. Evidence and data-quality rules

For every material conclusion:

* Preserve a source URL, dataset identifier, or explicit evidence reference.
* Record when the source was accessed or the period covered by the data.
* Record the target market and language where relevant.
* Quote or summarize the evidence actually observed.
* Distinguish direct observations, company claims, third-party claims, estimates, and inferences.
* Check that the source supports the conclusion being made.
* Record conflicting evidence rather than silently choosing one source.
* Do not infer absolute search volume from Google Trends indices.
* Do not infer organic ranking difficulty from Google Ads competition.
* Do not infer customer conversion value from clicks alone.
* Do not present data from an unrelated advertiser as the client's actual performance.
* Do not fabricate traffic, search volume, ranking, conversions, revenue, market share, or AI visibility.
* If evidence is weak, state the limitation and reduce confidence.

## 6. Completion and acceptance criteria

Step 2 passes only when:

1. Step 1 research has been used correctly.
2. Independent research has been completed using actual available sources and tools.
3. The data-sufficiency gate has been documented.
4. Any requested data has either been evaluated or explicitly remains pending.
5. The fallback strategy has been used where necessary.
6. Verified observations are separated from estimates and hypotheses.
7. Competitor gaps are treated as optional references rather than mandatory strategic directions.
8. Recommendations respect the client's existing product and business constraints.
9. Opportunity priorities have explicit reasons and supporting evidence.
10. Required deliverables exist and are consistent with the underlying evidence.
11. The report clearly states what remains uncertain and what should be investigated in Step 3.

A complete-looking report is not sufficient for acceptance. Source accuracy, decision relevance, transparent limitations, and practical usefulness take precedence over report length.


## Mandatory Workflow: Research Before Requesting User Data

### 1. Non-negotiable rule

Never ask the user to identify, select, or export keywords before the agent has completed its own initial research and data-sufficiency assessment.

The agent is responsible for:

* Discovering candidate keywords from client information, web research, buyer terminology, product use cases, industry sources, and available trend data.
* Determining which uncertainties matter to the business decision.
* Determining whether additional data is necessary, useful but optional, or unnecessary.
* Specifying the exact data, keyword groups, markets, date ranges, fields, and export instructions when requesting data.

The user is not responsible for deciding which keywords deserve investigation.

Do not assume Google Ads account access, API credentials, connectors, or report permissions exist. Verify actual tool availability and access before claiming that account data can be retrieved.

### 2. Mandatory execution sequence

**Phase A — Read prior research**

Read the available Step 1 outputs and extract the client's actual products, target buyers, markets, business model, known capabilities, and commercial constraints.

If required files are missing, report this and continue using available evidence. Never claim to have read missing files.

**Phase B — Independent research**

Before requesting data:

1. Search relevant public web results and industry sources.
2. Identify actual buyer terminology, product use cases, purchasing concerns, and relevant market differences.
3. Attempt to access public trend information and available exports.
4. Review available, authorized first-party data and project files.
5. Build a preliminary candidate-keyword register, grouped by topic and business intent.
6. Record sources, observations, assumptions, and unresolved questions.

Save `initial-research.md`.

Do not request user data during this phase.

**Phase C — Data-sufficiency gate**

For each unresolved question, record:

* The decision affected.
* Existing evidence and its quality.
* The exact missing information.
* Whether obtaining it could materially change the recommendation or opportunity ranking.
* Whether the agent can obtain it using existing tools, public sources, or available files.
* The specific data source and report required.
* The fallback if the data cannot be obtained.

Save `data-sufficiency-assessment.md`.

Classify each data need as:

* NOT_REQUIRED: Existing evidence is sufficient for the decision.
* OPTIONAL: Additional data would improve confidence but is unlikely to change the decision materially.
* DECISION_CRITICAL: Missing data could materially change an important decision and cannot reasonably be obtained through available means.

Do not request data merely to make the report more detailed.

**Phase D — Verify data access**

Check whether the current environment actually provides usable access to the required data source and report.

For Google Ads:

* Check available authorized connectors, tools, permissions, and report capabilities.
* If account-level access is unavailable, do not imply that account data was retrieved.
* If access exists, verify that the account and campaign data are relevant to the current client and research question.
* Never treat unrelated account performance as the current client's actual performance.

For Google Trends:

* Attempt public-page access and available CSV export before requesting user assistance.
* Record the terms, market, timeframe, search type, and limitations.
* Never interpret normalized trend indices as absolute search volumes.

For Keyword Planner:

* Generate and refine the candidate-keyword list before requesting an export.
* Use available authorized access if genuinely available.
* Otherwise, request a user-assisted export only when the data has meaningful decision value.

Save access findings in `data-sufficiency-assessment.md`.

**Phase E — Data-request decision**

Apply these rules:

1. If no DECISION_CRITICAL data needs remain, do not block execution. Continue to synthesis.
2. If only OPTIONAL data is useful, continue the research. A clearly labeled optional request may be offered at the end of the preliminary findings, but the user must not be forced to provide it.
3. If DECISION_CRITICAL data remains and the agent cannot obtain it, generate `user-data-request.md`.
4. Complete all research that can reasonably be completed before pausing.
5. The request must identify the precise decision, required report, candidate keywords or relevant campaigns, geographic and language settings, date range, required fields, export format, and verified instructions.
6. Never ask the user to independently decide which keywords to export.
7. If the user must choose among several independent data sources, explain the difference and identify the minimum useful option.

At this gate, pause final strategy synthesis only when decision-critical information is genuinely missing. Do not repeatedly ask for additional data that is unlikely to change the recommendation.

**Phase F — Pause and resume**

When a decision-critical request is issued:

* Save the current research state and unresolved questions.
* Tell the user exactly which file or report to provide and where to place it.
* Wait for the user to upload the data, decline, or explicitly instruct the agent to continue without it.
* On receiving files, validate their contents, dates, market, fields, relevance, and source.
* If the data is missing, unusable, irrelevant, or insufficient, explain the problem and request clarification only when necessary.
* If the user declines or says to continue, switch to the fallback strategy and do not keep blocking progress.

Do not claim to have analyzed data that has not been received or accessed.

**Phase G — Fallback and final synthesis**

When data is unavailable or declined:

* Continue with the strongest available public and project evidence.
* Separate direct observations, third-party claims, estimates, inferences, and unknowns.
* Do not invent search volumes, conversions, keyword performance, or account data.
* Lower confidence where appropriate and state which conclusions could change with better data.
* Do not abandon relevant markets or keywords solely because competitors are stronger.
* Do not recommend changing product specifications, manufacturing capabilities, certifications, pricing, or positioning without evidence that the client can and wants to do so.

Complete the opportunity analysis and Step 3 handoff.

### 3. Required data-request document

`user-data-request.md` must include:

1. The business question that remains unresolved.
2. Why the missing data matters and how it could change the decision.
3. The exact report required: Keyword Planner metrics, Google Ads Search Terms, or another clearly identified dataset.
4. The agent-generated candidate keyword list, grouped by topic, for keyword-planning exports.
5. For Search Terms exports, the relevant campaign scope and report filters. Do not imply that arbitrary candidate keywords will appear in an actual Search Terms report.
6. Required countries/regions, languages, date ranges, metrics, and file format.
7. Step-by-step export instructions verified against current official documentation where possible.
8. The minimum acceptable data if a complete export is unavailable.
9. A clear fallback if the user cannot or does not wish to provide the data.
10. A status field: PENDING, PROVIDED, DECLINED, or UNAVAILABLE.

### 4. Completion requirements

Step 2 cannot be marked complete until:

* Independent research and candidate-keyword discovery have been performed.
* The data-sufficiency gate and access check have been documented.
* Any decision-critical data request has been resolved by receiving usable data, or by the user declining or instructing the agent to continue.
* Fallback limitations are documented where applicable.
* Recommendations are traceable to evidence and respect client constraints.
* The final report distinguishes validated findings from estimates and hypotheses.

A pending decision-critical data request is a PAUSED state, not a completed Step 2.
