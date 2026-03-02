---
number: '00009'
title: Emissions and Staking Multiplier Adjust
authors: Jack Chan (jack.chan@piplabs.xyz)
sponsors: Leo Chen (leo@piplabs.xyz)
created: 2026-01-18
type: Standard
status: Released
supersedes:
superseded-by:
extends:
---

## Summary

This proposal reduces annual token emissions from approximately 25 million to
15,315,000 IP tokens and decreases the locked token staking reward multiplier
from 0.5x to 0.025x. These changes intend to adjust the emissions resulting
from higher-than-expected block production under a per-block emissions
schedule and align incentives for long term sustainability of the network.

## Motivation

Story's original design targeted 20 million IP tokens emitted annually, based
on an expected 10,368,000 blocks per year. Engineering optimizations have
improved block production to approximately 13,140,000 blocks per year — a
testament to network performance gains. However, the per-block emission rate
remained unchanged, resulting in approximately 25 million tokens emitted
annually.

Story's 0.5x locked staking multiplier is a unique mechanism that allows
locked token holders to earn staking rewards at a reduced rate. As locked
tokens transition to unlocked status over time, aligning incentives toward
unlocked staking promotes healthier stake distribution across the validator
ecosystem. Reducing this multiplier to 0.025x aligns locked token holders with
the long term vision of Story while maintaining voting power for block
production and, when available, onchain governance voting. This new multiplier
change also redirects the majority percentage of staking rewards toward
unlocked token stakers.

With the locked staking multiplier change, and without a corresponding
reduction in total emissions, this shift would significantly inflate APY for
unlocked token stakers. To recalibrate this, annual emissions will need to be
updated from 20,000,000 IP tokens per 10,368,000 blocks, to 15,315,000 IP
tokens per 13,140,000 blocks. This achieves two goals: it maintains a
sustainable 6-7% APY for unlocked stakers rather than artificially boosting
yields, and it reduces overall inflationary pressure on circulating supply.

## Proposal

### Token Emissions Adjustment

| Parameter | Pre-launch | Actual | Proposed |
| --- | --- | --- | --- |
| IPs minted per block | 1.9290 IP | 1.9290 IP | 1.1655 IP |
| Blocks/year | 10,368,000 (est) | ~13,140,000 | 13,140,000 |
| Annual emissions | 20,000,000 IP (est) | ~25,347,060 IP | 15,315,000 IP |

The emissions per block is now recalculated to be 1.1655 IP tokens per block
produced to achieve the target annual emission of 15,315,000 IPs.

### Locked Staking Multiplier Adjustment

| Parameter | Current Value | New Value |
| --- | --- | --- |
| Locked flexible period multiplier | 0.5x | 0.025x |

### Rationale

Reducing the locked staking multiplier to 0.025x redirects rewards toward
unlocked token holders, promoting healthier stake distribution. The
corresponding emissions recalibration to 15,315,000 IP tokens per year ensures
this shift maintains a sustainable 6-7% APY rather than artificially inflating
yields.

Voting power remains 1:1 between locked and unlocked validators. Operators in
the active set choosing to continue running locked validators will retain
their governance participation capabilities.

### Drawbacks

Locked token stakers and locked validator operators will experience
significant reward reduction, potentially causing some Validators to exit the
active set and operate Unlocked Validators instead. This is an expected and
healthy outcome as locked tokens transition to unlocked status.

### Alternatives Considered

- **Complete elimination of locked staking rewards:** Rejected as too
  disruptive to existing locked validators
- **Gradual phase-out over multiple upgrades:** Rejected due to implementation
  complexity
- **Maintaining current emissions:** Rejected as it would not address
  long-term sustainability concerns

### User Impact

**For Unlocked Token Stakers:** Yields are expected to remain competitive in
the 6-7% APY range for flexible staking, with higher returns available through
fixed staking periods.

**For Locked Validators and Delegators:** Validators accepting locked
delegations will see significantly reduced rewards. Delegators to locked
validators will receive proportionally lower returns.

**Token Unlock Context:** As locked tokens transition to unlocked status,
stake distribution is expected to naturally shift toward the unlocked
validator set--a healthy evolution for network decentralization.
