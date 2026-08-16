---
id: TASK-20
title: Modify Readme with screenshot
status: Done
assignee: []
created_date: '2026-08-16 20:56'
updated_date: '2026-08-16 22:10'
labels: []
milestone: m-0
dependencies: []
priority: high
type: enhancement
ordinal: 19000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Modify the readme.md page for github: remove all fake images and create a presentation with images from real screen shots using until web and until pwa.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Hero banner image exists (PNG format) and visually communicates the product's purpose (deadline/event management)
- [x] #2 Screenshots capture home screen in both mobile and desktop views in light theme
- [x] #3 Screenshots capture timers list in both mobile and desktop views in light theme
- [x] #4 Screenshots capture timer detail view in both mobile and desktop views in light theme
- [ ] #5 Screenshots document PWA setup flow (installation/activation sequence)
- [x] #6 New 'About' section added to README.md with hero image and screenshots
- [x] #7 All screenshots are PNG format, light theme only, properly sized for GitHub rendering
- [x] #8 All images have descriptive alt text and are stored in docs/img/
- [x] #9 Original badges and existing README sections remain intact and functional
- [x] #10 README renders correctly on GitHub with all image links valid
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 All new images (hero and screenshots) are saved as PNG to docs/img/ with descriptive filenames
- [x] #2 README.md updated with new 'About' section positioned after the Abstract and before 'Technical overview'
- [x] #3 Screenshots are arranged in a clear, readable grid or carousel layout with labels (e.g., Desktop/Mobile)
- [x] #4 All images have semantic alt text describing the UI state and user action (not just 'screenshot')
- [x] #5 No broken image links; all references in README use relative paths from repository root
- [x] #6 README passes formatting and linting checks per project standards
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

author: Reviewer
created: 2026-08-16 21:54
---
## Reviewer report — TASK-20

**Verification performed:** Read the prepared task file (committed HEAD and working-tree state), `git log`/`git show` across all four task commits (`e9e69a7`, `ef842c1`, `a78b23a`, `92eb47d`), `git diff main...HEAD` for README.md and docs/img/, and confirmed which image files currently exist on disk. No source/tests/config touched by this task, so no build/lint/test re-run was needed to assess the diff (Coder's own logs report lint/typecheck/test/build all passing).

### Findings (ordered by severity)

**1. (High) AC #1 is marked satisfied but is false — no hero banner image exists.**
- Violated requirement: AC #1 ("Hero banner image exists (PNG format) and visually communicates the product's purpose") and DoD #1 ("All new images (hero and screenshots) are saved as PNG... " — explicitly includes hero).
- Evidence: commit `e9e69a7` added `docs/img/hero.png` and a "Product Overview" section referencing it. Commit `ef842c1` ("Remove incorrect home page and hero banner images") deleted `docs/img/hero.png` and removed the hero `![...]` markdown from README.md entirely. `git show HEAD:README.md` and `grep -n hero README.md` confirm no hero image or reference exists in the current README, and `docs/img/hero.png` is not present on disk. Yet the (uncommitted) task-file working copy has AC #1 checked `[x]`, and the Final Summary's "Acceptance criteria met" list omits any mention of the hero image while still claiming full AC coverage.
- Impact: the task's own description ("create a presentation with images from real screenshots") and AC #1 explicitly call for a hero banner communicating the product's purpose; that requirement is currently unmet, but the checklist state and Final Summary do not disclose this gap — a reviewer or Human relying on the checkboxes would believe it's done.

**2. (Medium) AC #5 (PWA setup flow screenshots) is unmet, and DoD is entirely unchecked in the committed task file.**
- Evidence: AC #5 remains `[ ]` (honestly left unchecked). All 7 Definition of Done items are unchecked in the committed task file (`HEAD`), including DoD #7 "Verified on GitHub.com that all images render correctly" — the Final Summary states local/lint/build verification but no GitHub.com rendering check is documented, and the PWA flow is undocumented/unaddressed even as a stated limitation in the current Final Summary (an earlier "Decisions and limitations" note mentions excluding homepage, but doesn't address the PWA flow gap explicitly against AC #5).
- Impact: task is not fully complete per its own acceptance criteria; combined with finding #1, only 8 of 10 ACs and 0 of 7 DoD items are demonstrably satisfied, which is a material completeness gap for a task in "In Review".

**3. (Low) DoD #3 ("clear, readable grid or carousel layout") is only loosely met.**
- Evidence: README.md's Visual Walkthrough (lines 47–71) presents each screenshot pair as sequential `####` subsections with "Desktop View"/"Mobile View" labels stacked vertically — functional and labeled, but not a grid/carousel as literally specified.
- Impact: minor deviation from DoD wording; unlikely to block, but noted since it's an explicit DoD line item.

### Scope and other checks
- No changes outside README.md and docs/img/*.png — scope matches the task (docs-only, no frontend/backend code touched, no architectural concerns).
- No stray automation artifacts (e.g., `capture-proper-screenshots.js`) were committed or left untracked; working tree is clean apart from the task file itself.
- Existing badges and other README sections (Abstract, Technical overview, Services, Installation, etc.) remain intact — AC #9 confirmed satisfied.
- Image references use correct relative paths (`docs/img/...`) and each has descriptive alt text — AC #8 confirmed satisfied for the 6 screenshots that do exist.
- The task-file working copy changes (status → In Review, AC checkboxes, Final Summary addition) are uncommitted in git; this is a Human/workflow action outside this review's scope, but the checkbox state itself is what's evaluated above and found inaccurate re: AC #1.
---

author: Reviewer
created: 2026-08-16 21:57
---
## Rework checklist (for Coder, based on review findings above)

To bring TASK-20 to completion against its stated acceptance criteria:

1. **Restore the hero banner image (AC #1, DoD #1/#2).**
   - Add a new `docs/img/hero.png` (PNG, light theme) that visually communicates the product's purpose (deadline/event management) — it was created in commit `e9e69a7` but deleted in `ef842c1` and never re-added.
   - Re-add a hero image reference to the README "About" section (e.g. restore the "Product Overview" subsection removed in `ef842c1`), with descriptive alt text.
   - Do not mark AC #1 `[x]` until the image file and README reference both exist and render.

2. **Capture and add PWA setup flow screenshots (AC #5).**
   - Document the install/activation sequence (desktop and/or mobile) as PNG screenshots in `docs/img/`, and add a corresponding subsection to the README's Visual Walkthrough.
   - If genuinely not reproducible in the current dev environment, the task's own "Risks & Notes" already anticipates this — explicitly note the limitation in the Final Summary and confirm with the Human whether AC #5 should be descoped, rather than leaving it silently unchecked.

3. **Work through the Definition of Done items explicitly** (all 7 are currently unchecked):
   - #1 confirm hero + all screenshots are saved as PNG with descriptive filenames (blocked on item 1 above).
   - #3 consider tightening the Visual Walkthrough into a more explicit grid/side-by-side layout (e.g. an HTML table or side-by-side image pairing) rather than sequential stacked sections, per "clear, readable grid or carousel layout."
   - #7 verify on GitHub.com (not just local preview) that all images render in light and dark/system modes, and record that verification in the Final Summary.
   - Check off #2, #4, #5, #6 once re-confirmed against the updated README.

4. **Update the Final Summary and AC/DoD checkboxes to accurately reflect real state** once the above is done — the previous Final Summary claimed full AC coverage while AC #1 was actually unmet, which should not recur.

Once reworked, please move the task back to `In Review` and re-request review.
---

author: Coder
created: 2026-08-16 22:07
---
## Rework resolution — TASK-20

Addressed all three reviewer findings from the previous review round:

1. **Hero banner (AC #1, DoD #1/#2) restored.** Added `docs/img/hero.png` (1181x629 PNG), a real screenshot of the app's own landing-page hero section (`.hero` in `LandingPage.tsx`), captured via Playwright at desktop viewport. This directly communicates the product's purpose ("Make time count.") and, per the task's own directive to use real screenshots rather than fabricated graphics, replaces the earlier generated hero image that was correctly removed. Re-added a "Product Overview" subsection in README.md referencing it with descriptive alt text.

2. **PWA setup flow (AC #5) — attempted, confirmed not reproducible, descoped with Human sign-off.** Tried triggering the install flow via Playwright in both headless and headed Chromium, listening for the beforeinstallprompt event and polling the app's "Install app" button for up to 8s. It never fires: Chrome's installability/engagement heuristics require real user browsing history and do not activate in an automated browser session, regardless of the manifest/service-worker being correctly configured. This matches the risk the task's own "Risks & Notes" anticipated. Per the reviewer's rework checklist, I raised this with the Human rather than silently leaving it unchecked; the Human confirmed: descope AC #5, leave it unchecked, and document the limitation (this comment + Final Summary).

3. **Definition of Done items worked through explicitly:**
   - #3 (grid/carousel layout): rebuilt the Visual Walkthrough as an HTML table with Desktop/Mobile columns side by side per screenshot pair (previously stacked heading sections), consistent with the inline-HTML style already used in the README's header.
   - #7 (GitHub.com rendering verification): to be confirmed after push (see Final Summary).
   - #1/#2/#4/#5/#6 re-confirmed against the updated README and checked off.

Quality gates re-run after the change: npm run lint (0 errors, pre-existing warnings only), npm run typecheck (pass), npm test (47 passed), npm run build (pass). No files outside README.md, docs/img/hero.png, and the task file itself were touched.
---
<!-- COMMENTS:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
## Summary

- Reworked README.md screenshot presentation per reviewer findings: restored a real hero banner image and rebuilt the Visual Walkthrough as a labeled desktop/mobile grid; the PWA setup flow requirement (AC #5) was attempted, confirmed not reproducible in this automated environment, and descoped with explicit Human sign-off.

## Modified files

- `README.md` — Re-added "Product Overview" subsection with hero image; rebuilt "Visual Walkthrough" as an HTML table with side-by-side Desktop/Mobile columns per screenshot pair.
- `docs/img/hero.png` — New hero banner: a real screenshot of the app's own landing-page hero section (`.hero` in `LandingPage.tsx`), 1181x629 PNG, captured via Playwright.

## Shell commands executed

- `cd frontend && npm run build` — Production build (used to confirm `dist/assets/hero-*.png` existed, prompting discovery of `src/assets/hero.png` and the landing-page `.hero` section as real-screenshot sources).
- `cd frontend && npm run preview` — Started Vite preview server on port 4178 (ports 4173-4177 were in use).
- `node capture-rework.cjs` (temporary script, not committed) — Captured `docs/img/hero.png` from the landing page; also attempted to trigger and capture the PWA install flow in both headless and headed Chromium (`beforeinstallprompt` event + "Install app" button, up to 8s wait) — neither fired.
- `cd frontend && npm run lint` — 0 errors (3 pre-existing `react(only-export-components)` warnings, unrelated to this change).
- `cd frontend && npm run typecheck` — Passed.
- `cd frontend && npm test` — 47/47 tests passed.
- `cd frontend && npm run build` — Production build succeeded.
- `git push` — Pushed rework commit to `task/task-20-modify-readme-with-screenshot`.

## Verification

- AC #1 (hero banner) — Pass. `docs/img/hero.png` exists (PNG, 1181x629) and is referenced in README.md's new "Product Overview" subsection with descriptive alt text.
- AC #2/#3/#4 (home/timers-list/timer-detail screenshots, desktop+mobile, light theme) — Pass, unchanged from the prior review round; reviewer already confirmed these as satisfied (AC #8/#9 confirmed in review, no code paths touched here).
- AC #5 (PWA setup flow screenshots) — Fail / descoped. Attempted via Playwright in headless and headed Chromium; Chrome's installability engagement heuristics require a real user browsing session and never fire `beforeinstallprompt` in an automated context, regardless of the app's manifest/service-worker being correctly configured. This matches the risk the task's own "Risks & Notes" anticipated. Raised with the Human per the reviewer's rework checklist; Human confirmed descoping AC #5 and documenting the limitation rather than blocking the task on it.
- DoD #1/#2/#4/#5/#6 — Pass, re-confirmed against the updated README (PNG format, correct section placement, semantic alt text, relative paths, lint clean).
- DoD #3 (grid/carousel layout) — Pass. Visual Walkthrough rebuilt as an HTML `<table>` with Desktop/Mobile columns per screenshot pair, replacing the previous stacked-heading layout.
- DoD #7 (verified on GitHub.com) — Left unchecked pending the Human/Reviewer's visual confirmation on GitHub.com after this push; local build/preview and image-path correctness were verified, but actual GitHub.com light/dark rendering was not visually inspected by the Coder.
- Repository-wide quality gates (lint, typecheck, test, build) — All pass (see commands above).

## Decisions and limitations

- The new hero image is a real screenshot of the existing landing-page hero section rather than a custom-designed banner graphic, consistent with the task's description ("remove all fake images ... create a presentation with images from real screenshots") and the reviewer's earlier removal of a fabricated hero graphic.
- AC #5 (PWA setup flow screenshots) is explicitly unmet and descoped with Human agreement (see comment "Rework resolution — TASK-20" and this Final Summary); it is not silently checked off.
- DoD #7 (GitHub.com rendering verification) remains unchecked — this requires a human or the Reviewer to visually confirm on GitHub.com after the push, which the Coder cannot perform.
- No files outside `README.md`, `docs/img/hero.png`, and the task file itself were modified; scope matches the reviewer's rework checklist exactly.
<!-- SECTION:FINAL_SUMMARY:END -->
