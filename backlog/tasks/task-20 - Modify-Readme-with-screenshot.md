---
id: TASK-20
title: Modify Readme with screenshot
status: Ready
assignee: []
created_date: '2026-08-16 20:56'
updated_date: '2026-08-16 21:13'
labels: []
milestone: m-0
dependencies: []
priority: high
type: enhancement
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Modify the readme.md page for github: remove all fake images and create a presentation with images from real screen shots using until web and until pwa.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Hero banner image exists (PNG format) and visually communicates the product's purpose (deadline/event management)
- [ ] #2 Screenshots capture home screen in both mobile and desktop views in light theme
- [ ] #3 Screenshots capture timers list in both mobile and desktop views in light theme
- [ ] #4 Screenshots capture timer detail view in both mobile and desktop views in light theme
- [ ] #5 Screenshots document PWA setup flow (installation/activation sequence)
- [ ] #6 New 'About' section added to README.md with hero image and screenshots
- [ ] #7 All screenshots are PNG format, light theme only, properly sized for GitHub rendering
- [ ] #8 All images have descriptive alt text and are stored in docs/img/
- [ ] #9 Original badges and existing README sections remain intact and functional
- [ ] #10 README renders correctly on GitHub with all image links valid
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 All new images (hero and screenshots) are saved as PNG to docs/img/ with descriptive filenames
- [ ] #2 README.md updated with new 'About' section positioned after the Abstract and before 'Technical overview'
- [ ] #3 Screenshots are arranged in a clear, readable grid or carousel layout with labels (e.g., Desktop/Mobile)
- [ ] #4 All images have semantic alt text describing the UI state and user action (not just 'screenshot')
- [ ] #5 No broken image links; all references in README use relative paths from repository root
- [ ] #6 README passes formatting and linting checks per project standards
- [ ] #7 Verified on GitHub.com that all images render correctly in both light and dark (system) modes
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Implementation Plan

### Phase 1: Capture Screenshots
1. Start frontend dev server (`npm run dev` from frontend directory)
2. Open browser to dev URL (typically http://localhost:5173)
3. Configure browser DevTools to show mobile viewport (375px width for mobile, desktop at full width)
4. Ensure light theme is active (disable dark mode in system settings or via app UI toggle if available)
5. Take screenshots in sequence:
   - Home screen (desktop): Initial state with sample events if any
   - Home screen (mobile): Same content at 375px viewport
   - Timers list view (desktop): List of events with remaining time
   - Timers list view (mobile): Same at mobile viewport
   - Timer detail view (desktop): Single event detail/edit state
   - Timer detail view (mobile): Same at mobile viewport
   - PWA setup flow (desktop): Series showing installation prompt → installation confirmation (if discoverable in current state)
   - PWA setup flow (mobile): Same flow at mobile viewport
6. Export all screenshots as PNG format with descriptive names (e.g., `home-desktop.png`, `timers-list-mobile.png`)

### Phase 2: Create Hero/Banner Image
7. Design or generate a hero/banner image that communicates the product's purpose (deadline/event management)
   - Consider compositing a key screenshot or using a design tool
   - Ensure PNG format and light theme aesthetic
   - Dimensions should fit GitHub README (recommend 1200x400 or 1200x600 for banner aspect ratio)
   - Name: `hero.png` (replace existing placeholder)

### Phase 3: Update Repository
8. Create task branch and commit image changes:
   - Save all screenshot PNGs to `docs/img/` directory
   - Verify file sizes are reasonable (optimize if necessary)
9. Update README.md:
   - Add new "About" section after Abstract, before "Technical overview"
   - Include hero banner image with alt text
   - Create visual showcase section with screenshots:
     - Group desktop and mobile views for each workflow
     - Add clear labels and brief captions explaining each view
   - Preserve all existing badges and sections
10. Verify formatting and markdown syntax

### Phase 4: Validation & Testing
11. Local testing:
    - Run `npm run build` and `npm run preview` to ensure build succeeds
    - Test README links locally using a markdown viewer
12. GitHub verification:
    - Push branch and view on GitHub.com
    - Verify all images display correctly
    - Test in both light and dark system modes (if GitHub respects system preference)
    - Confirm badges and existing sections render correctly
13. Manual verification:
    - Screenshot descriptions match actual UI state
    - All alt text is descriptive and accurate
    - No typos or formatting issues
    - README flows logically from Abstract → About (with visuals) → Technical overview

### Risks & Notes
- If PWA setup flow is not easily reproducible in dev environment, document current state and note this limitation
- Screenshot quality depends on browser resolution and DPI; ensure consistent scaling across captures
- Hero image design is discretionary; recommend keeping it simple and on-brand with existing logo/styling
<!-- SECTION:PLAN:END -->

## Comments

<!-- COMMENTS:BEGIN -->
created: 2026-08-16 21:11
---
$## Analysis\n\n**Clarifications recorded (2026-08-16):**\n\nQ: Scope of screenshots - which README sections?\nA: Add a new "About" section to visually demonstrate the product.\n\nQ: What workflows to showcase?\nA: Home screen, timers list, timer detail, PWA setup flow.\n\nQ: Web vs. PWA representation?\nA: Include different views for mobile and desktop.\n\nQ: Hero image handling?\nA: Create a new hero/banner image for the README; keep all existing badges intact.\n\nQ: Screenshot specifications?\nA: PNG format, light theme only.\n\nQ: Dependencies?\nA: None - can proceed independently.\n\n**Summary:** Task requires adding real screenshots to demonstrate core workflows (home screen, timers list, timer detail, PWA setup) across desktop and mobile views in light theme PNG format.
---
<!-- COMMENTS:END -->
