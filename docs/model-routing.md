# Model routing and cost

Principle: scripts do everything deterministic (cutting, rendering, loudness, QA numbers); models only judge. The strongest model is used once, where a wrong decision wastes the most (the creative plan). Anything that only runs a command uses the cheapest model. The reviewer is a different model from the author so it does not grade its own work.

| Stage | Who | Model | Why |
|---|---|---|---|
| Inspect, silence/scene detection, audio matching, contact sheets | `scripts/` | none | deterministic, free |
| Footage analysis (is the take usable, blur, face in frame) | footage-analyst | Sonnet 5.5 | needs vision; test Haiku 5.5 as a downgrade |
| Hook, shot order, captions, claims check (first draft) | creative-director | Fable 5.2 | the decision that shapes the whole video; Georgian wording quality |
| Revisions after human feedback | creative-director (override) | Sonnet 5.5 | small edits to an existing plan |
| Cut, caption, render, loudness | video-editor + `render.py` | Haiku 5.5 | only runs one script and reports |
| Independent review of plan and output frames | quality-reviewer | Sonnet 5.5 | different model from the author |
| Approval, consent, publishing | a person | n/a | never automated |

## Estimated model cost per video

Assumptions are estimates, not measurements: about 9 clips, a 45 s result, one draft and one revision round. Thinking tokens are counted as output.

| Stage | Tokens in / out |
|---|---|
| Analyst | 20k / 3k |
| Director draft | 20k / 5k + thinking (Fable 12k, Sonnet 8k) |
| Revision | 25k / 6k |
| Reviewer | 15k / 2k |
| Editor | 8k / 1k |

Prices per million tokens (input / output), from third-party price trackers read 2026-11-17: Haiku 5.5 $0.10 / $0.50, Sonnet 5.5 $2 / $10, Fable 5.2 $8 / $40. Confirm on Anthropic's pricing page before budgeting.

| Setup | Per video | 30 videos | 100 videos |
|---|---|---|---|
| Budget (Haiku analyst, Sonnet director) | about $0.33 | about $10 | about $34 |
| Recommended (Fable director only) | about $1.07 | about $32 | about $107 |
| Everything on Fable | about $1.86 | about $56 | about $186 |

Not included: Georgian speech-to-text (no reliable option yet), hosting, storage, render compute, music licensing.

## How to decide whether Fable earns its place

Run the same raw clips through the director with Sonnet and with Fable and compare the plans side by side. If a person cannot tell them apart, use the budget setup.
