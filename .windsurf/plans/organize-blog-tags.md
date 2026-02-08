# Organize and Prioritize Blog Tags

Restructure the blog tags system to display organized, high-priority tags that help users navigate content more effectively, replacing the current alphabetically-sorted list of 35 tags with a curated, categorized approach.

## Current State Analysis

**Existing Tags (35 total)**:
- Core product tags: Push Chain, Universal Smart Contracts, Universal Apps, Shared State Blockchain, Donut Testnet
- Technical tags: Proof of Stake, Validators, Parallel Validators, Dynamic Sharding, Fee Abstraction, Intent Solvers
- Partnership tags: Partnerships (used by 13+ posts)
- Content type tags: Announcements, Deep dives, Insights, Case Study, Featured
- User-focused tags: Consumer Crypto, Consumer Tx, Content Creator, Wallet
- Program tags: Push Points, Rewards, Deployathon, Tokenomics
- Ecosystem tags: Community & Ecosystem, Ecosystem
- Duplicate/Similar tags: Universal App vs Universal Apps, Donut vs Donut Testnet, Testnet vs Donut Testnet

**Issues Identified**:
1. **Duplicates**: "Universal App" and "Universal Apps", "Donut" and "Donut Testnet"
2. **Too many tags**: 35 tags overwhelm users
3. **No hierarchy**: All tags treated equally (alphabetical sort)
4. **Inconsistent naming**: Some tags are plural, some singular
5. **No categorization**: Technical, business, and content tags mixed together

## Proposed Solution

### 1. Tag Consolidation & Cleanup

**Merge duplicates**:
- `Universal App` + `Universal Apps` → `Universal Apps`
- `Donut` + `Donut Testnet` → `Donut Testnet`
- `Community & Ecosystem` + `Ecosystem` → `Ecosystem`
- `Testnet` + `Donut Testnet` → Keep separate (Testnet is broader)

**Standardize naming**:
- Prefer plural forms for consistency where applicable
- Keep proper nouns as-is (Push Chain, Donut Testnet)

### 2. Tag Category System with Priority Order

Categories organized by display priority (1 = highest):

**Priority 1 - Product** (Core product features):
- Push Chain
- Universal Smart Contracts
- Universal Apps
- Shared State Blockchain
- Donut Testnet

**Priority 2 - Features** (Key capabilities):
- Fee Abstraction

0. **Featured** - Showcase important/highlighted blog posts
1. **Product** - Push Chain core product features and announcements
2. **Features** - Specific feature highlights and capabilities
3. **Technical** - Technical deep dives and architecture
4. **Programs** - Community programs, hackathons, rewards
5. **Thought Leadership** - Industry insights and vision pieces
6. **Case Studies** - Real-world implementation examples
7. **Ecosystem** - Ecosystem updates, tokenomics, community
8. **Partnerships** - Partnership announcements and integrations
9. **Maker Monday** - Builder/creator content (Twitter series)
10. **Deep Dives** - Educational deep-dive content (Twitter series)
11. **Push 101** - Beginner-friendly explanations (Twitter series)

### 3. Implementation Approach

**Phase 1: Update Tag Generation Script (`build.blogs.tags.mjs`)**:
- Add tag consolidation logic to merge duplicates:
  - `Insights` → `Thought Leadership`
  - `Universal App` + `Universal Apps` → `Universal Apps`
  - `Donut` + `Donut Testnet` → `Donut Testnet`
  - `Community & Ecosystem` + `Ecosystem` → `Ecosystem`
- Add priority metadata (1-11) to each tag based on category
- Add category field for grouping
- Add `count` field showing number of posts per tag
- Sort output by priority first, then alphabetically within category

**New JSON structure**:
```json
{
  "name": "Push Chain",
  "slug": "push-chain",
  "link": "/blog/tags/push-chain/",
  "priority": 1,
  "category": "Product",
  "count": 25
}
```

**Phase 2: Manual Retroactive Tagging**:
- Review existing blog posts and manually add new Twitter series tags:
  - `Maker Monday` - builder spotlights, creator features
  - `Thought Leadership` - trend analysis, industry commentary
  - `Push 101` - beginner-friendly explanations
- Update blog post frontmatter with appropriate new tags
- NOT automated - requires human review for accuracy

**Phase 3: Update Display Component (`BlogTags.js`)**:
- Sort and display tags by priority order
- Visual hierarchy based on category (handled later by user)
- Display logic for tag filtering (handled later by user)

## Files to Modify

1. **`build.blogs.tags.mjs`**:
   - Add tag consolidation logic
   - Add priority and category metadata
   - Count posts per tag
   - Sort by priority then alphabetically

2. **`src/components/Blog/BlogTags.js`**:
   - Filter to show only high-priority tags
   - Add visual hierarchy (size/color variations)
   - Optional "Show All" expansion

3. **New file: `blog-tags-config.json`** (optional):
   - Centralized tag configuration
   - Priority levels
   - Category assignments
   - Merge mappings

## Expected Outcomes

- **Organized tags**: 11 clear categories with priority-based ordering
- **Consolidated tags**: Merge duplicates (Insights→Thought Leadership, Universal App→Universal Apps, etc.)
- **Better navigation**: Users find content by category and priority
- **Twitter series integration**: New tags for Maker Monday, Thought Leadership, and Push 101
- **Maintainable**: Easy to adjust priorities as content strategy evolves
- **Extensible**: Manual retroactive tagging allows for accurate categorization

## Next Steps

1. **Implement Phase 1**: Update `build.blogs.tags.mjs` with priority/category system
2. **Run script**: Generate new `blogtags.json` with enhanced metadata
3. **Manual tagging**: Review and add new Twitter series tags to existing posts
4. **Display updates**: User will handle visual hierarchy and filtering later
