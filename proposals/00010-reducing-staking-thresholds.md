---
number: '00010'
title: Reducing Staking Thresholds
authors: Jack Chan (jack.chan@piplabs.xyz)
sponsors: Ramtin Seraj (ramtin.seraj@piplabs.xyz)
created: 2026-01-18
type: Standard
status: Draft
supersedes:
superseded-by:
extends:
---

## Summary

This proposal reduces staking thresholds by lowering the minimum stake,
unstake, and redelegate amounts from 1024 IP to 32 IP, reducing the minimum
reward claim threshold from 8 IP to 1 IP, and decreasing all staking operation
fees from 1 IP to 0.1 IP. These changes make staking accessible to retail
participants while maintaining spam protection.

## Motivation

The current 1024 IP minimum stake represents a significant barrier for retail
investors seeking to participate in network staking. This threshold excludes
many potential participants who would otherwise contribute to network security
and decentralization.

The 8 IP minimum reward distribution threshold forces smaller stakers to wait
extended periods before seeing rewards in their accounts, creating a poor user
experience. Additionally, the 1 IP staking operation fee disproportionately
impacts smaller stakers — representing over 3% of a minimum stake under the
proposed 32 IP threshold.

Lowering these thresholds democratizes staking participation, improves user
experience for smaller holders, and encourages broader community engagement
with the network.

## Proposal

### Minimum Staking Amount

| Parameter | Current Value | New Value |
| --- | --- | --- |
| Minimum stake amount | 1024 IP | 32 IP |
| Minimum unstake amount | 1024 IP | 32 IP |
| Minimum redelegate amount | 1024 IP | 32 IP |

### Minimum Reward Distribution Threshold

| Parameter | Current Value | New Value |
| --- | --- | --- |
| Auto-reward distribution threshold | 8 IP | 1 IP |

Rewards will be automatically distributed when accumulated amount reaches 1 IP
or greater. The distribution queue (32 per block) remains unchanged.

### Staking Operation Fee Changes

| Operation Name | Function Name | Current Value | New Value |
| --- | --- | --- | --- |
| Set Operator | setOperator | 1 IP | 0.1 IP |
| Unset Operator | unsetOperator | 1 IP | 0.1 IP |
| Set Withdrawal Address | setWithdrawalAddress | 1 IP | 0.1 IP |
| Set Rewards Address | setRewardsAddress | 1 IP | 0.1 IP |
| Update Validator Commission | updateValidatorCommission | 1 IP | 0.1 IP |
| Redelegate | redelegate | 1 IP | 0.1 IP |
| Redelegate On Behalf | redelegateOnBehalf | 1 IP | 0.1 IP |
| Unstake | unstake | 1 IP | 0.1 IP |
| Unstake On Behalf | unstakeOnBehalf | 1 IP | 0.1 IP |
| Unjail | unjail | 1 IP | 0.1 IP |
| Unjail On Behalf | unjailOnBehalf | 1 IP | 0.1 IP |

### Rationale

The 32 IP minimum aligns with common proof-of-stake precedents while remaining
economically accessible. The 1 IP reward threshold ensures meaningful, regular
distributions without overwhelming the queue. The 0.1 IP unstaking fee
maintains spam deterrence while being proportionate to smaller stakes (~0.3%
of minimum).

### Drawbacks

Lower minimums may increase total delegation and reward distribution count,
leading to faster state growth. However, the 32 IP threshold for staking
amounts and 0.1 IP threshold for staking-related operations still provides
meaningful barrier against spam, and economic costs remain prohibitive for
attackers.

### Alternatives Considered

- **Delegator minimum = 1 IP (instead of 32 IP):** Suggested in the forum as
  the most inclusive option and closer to typical Cosmos delegator UX.
  Rejected for this SIP due to accelerated state-growth and the 32 IP minimum
  also needs devnet benchmarking to determine a safe floor before going that
  low.
- **Remove the minimum "top-up / additional stake" amount (allow immediate
  restaking of rewards):** Proposed to enable continuous compounding for
  delegators and validators and improve validator economics. Not included in
  this SIP because it is a separate parameter/design change and could increase
  operation frequency (which is effectively a spammy behavior); we focus here
  on the base minimums and fee/thresholds (see original post at
  <https://forum.story.foundation/t/proposal-discussion-reduce-the-1024-ip-staking-minimum/37190>)
- **Manual reward claiming at any amount (no forced threshold):** Discussed as
  a way to let small delegators claim accumulated rewards below the
  auto-distribution threshold via a manual transaction. Rejected due to spam
  concerns — adding fees for manual claims would be impractical given the
  small amounts involved, yet feeless claiming could be exploited. This SIP
  addresses the same UX concern by reducing the auto-distribution threshold to
  1 IP. Note that delegators receive all remaining unclaimed rewards upon
  unstaking, so no rewards are forfeited (see post reply at
  <https://forum.story.foundation/t/proposal-discussion-reduce-the-1024-ip-staking-minimum/37190/5>)
- **Guardrails instead of a higher minimum (rate limits / dust floor /
  batching):** Suggested as mitigations to support lower minimums while
  protecting performance (state growth, reward distribution throughput,
  latency). Not adopted in this SIP to keep scope limited and because these
  require additional implementation/testing (see post reply at
  <https://forum.story.foundation/t/proposal-discussion-reduce-the-1024-ip-staking-minimum/37190/19>)

### User Impact

Retail participants gain access to staking with lower capital requirements.
Smaller stakers receive more frequent reward distributions and face
proportionally lower fees across all staking operations.
