# WP1 · App function review

**22 November 2026 · WP1 release for the public app. Verified on the Desktop candidate before publication.** The live baseline was [GitHub Pages revision 6d0463b](https://github.com/roakesiv/Imagination-play-guide/commit/6d0463b67f9d523f3af6626b863e8bcd0d8f11c6). Before the repairs, its HTML, styles and loaded scripts matched the Desktop copies. Existing Desktop planning edits were present before this work.

## Repairs verified

| Action | Reproduced on the published version | Verified in the local version |
| --- | --- | --- |
| Generate an image and an activity, then edit the name or use Fill Example | Copy could return the old creature. Choosing a new activity could leave the image prompt and activity describing different creatures. | Visible image and selected activity prompts, summary and details reflect the same current form. An edit, age choice, style chip or accepted example refreshes existing results. |
| Tap Make Creature or a worksheet on an empty form | The maker produced a copyable prompt with empty creature details. | The maker asks for one detail or an example and focuses the first input. One answer is sufficient; the name and all other individual fields are optional. |
| Pick an age first and reload | A non-default age was saved but the maker reopened at preschool. | The chosen age returns even before a creature has a name or description. Older cards with no age load with the preschool default. |
| Copy when the device refuses automatic clipboard access | If both copy methods declined, the app could display a success message. | Successful copies show confirmation. When both methods decline or throw, the text stays selected and the app gives manual-copy instructions. |
| Reopen and export existing cards when browser storage is full | The app performed a test write before reading. A refused write hid readable cards and blocked backup. | Existing cards still appear and export. If the current edit cannot be saved, the download includes the on-screen draft plus the stored list. The test confirmed that the original stored card and draft were preserved. |
| Choose Story or Adventure | Both buttons were visible and disabled. Adventure Journal worked. | The two paused buttons are hidden from parents. Adventure Journal remains available. The retained story templates are available for future work. |

## Parent controls and results

Browser checks used independent disposable sessions at 390 × 844 and 1280 × 800. Tests exercised the published baseline and the repaired local app. A separate check opened the Desktop HTML directly with an older-format test card. Clipboard failure and storage-at-quota cases were deliberately simulated. The tests used invented cards only.

| Route and controls | Result / disposition |
| --- | --- |
| Home: Join the World of Rhea, Build your own, Parent tutorial | **Keep.** Each opened the intended screen at both sizes. Back to home, browser Back and all three tutorial links worked. |
| Rhea shelf: Open PDF and Download | **Keep.** All 17 Open/Download pairs target their catalog files. All 17 public PDFs were fetched, matched the Desktop editions byte for byte and matched their catalog page counts. Open PDF was exercised on Volume 1. A binder download was captured and compared with the local PDF. The volumes contain 69 and 76 pages. |
| Gallery: character headings, More from the stories, View illustration and related books | **Keep.** Opened all 14 profiles and decoded their 14 portraits. All had matching open/download book targets. Opened a full illustration and returned using Back. |
| Parent tips, nine editable fields, six character presets and Use Character | **Keep.** Parent tips opened, all six selections previewed and loaded, and all fields accepted edits. The picker description now specifies that it offers the six party members. The gallery still shows 14 characters. |
| Ten style chips and eleven age choices | **Keep with repairs above.** All choices worked. Clicking the same style twice did not duplicate it. Checked that an already generated output uses the updated style or age when applicable. |
| Fill Example, Make Creature, summary, details and Copy Prompt | **Repair.** Confirmed the replacement dialog, empty-form feedback, current results and clipboard behavior. |
| Activity Book Packet | **Keep.** Generated and copied a prompt with the test creature, ten-page sequence and NEXT instruction. |
| Creature Card, Coloring Page, Find-It Game, Maze, Letter Tracing, Count the Objects, Find the Letter | **Keep.** Selected and copied each output independently. Each produced text for the current creature. |
| Draw the Missing Detail, Trace the Path, Matching Page, Finish the Pattern, Adventure Journal | **Keep.** Selected and copied each output independently, including the journal. |
| Story and Adventure | **Hide.** Previously paused choices. See the repair table. |
| Save Creature, Load, Delete, Reset, route changes and reload | **Keep with repairs above.** Empty saves explained what to enter. Created a named card, edited the draft separately, navigated away, reloaded, loaded the named card, and checked cancel/confirm paths. Reset cleared the draft while preserving the saved card. Delete removed only the chosen test card. |
| Export Saved Data | **Repair.** Downloaded and read the version-1 JSON, checking the current draft and saved card independently. An older card retained its ID and original contents. The tutorial explains the one-way export. |

Actual printing, a physical iPhone/iPad or Android browser, and generation in an external image tool remain unverified. Physical printing remains a separate family check. [App overview](../00_README.md) · [Product roadmap](../01_03_PRODUCT_ROADMAP.md)
