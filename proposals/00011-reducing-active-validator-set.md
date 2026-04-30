---
number: '00011'
title: Reducing the Active Validator Set
authors: Vinod Tiwari (vinod.tiwari@piplabs.xyz)
sponsors: Vinod Tiwari (vinod.tiwari@piplabs.xyz)
created: 2026-04-28
type: Standard
status: Draft
supersedes: 
superseded-by: 
extends: 
---

## Summary

This proposal reduces the Story network's active validator set from
80 to 21. A smaller, more focused validator set improves consensus
performance, raises the quality bar for validator operations, and
strengthens the economic model for remaining validators.

## Motivation

Story launched with an active validator set size of 64, which was
later expanded to 80 as part of the Polybius upgrade. With the
network now established, maintaining 80 active validators incurs
consensus and operational overhead that outweighs the marginal
benefit of the additional validators.

**Consensus performance.** CometBFT consensus messaging scales
quadratically with the number of validators. Reducing the set from
80 to 21 significantly lowers the number of consensus messages per
round, resulting in faster block finality and reduced bandwidth
requirements for each validator.

**Validator commitment.** A larger set dilutes the economic incentive
per validator, making it harder for operators to justify the
infrastructure investment needed to run high-quality nodes. A
smaller set concentrates rewards among committed, well-resourced
operators who can deliver higher uptime and better performance.

**Operational focus.** Coordination, governance communication, and
upgrade rollouts become more manageable with fewer active
participants. This is especially important as Story moves toward
more frequent protocol upgrades.

**Economic sustainability.** With staking rewards distributed across
fewer validators, each validator earns a larger share, making
operations more economically viable. This reduces the risk of
validator churn due to insufficient returns.

**Industry alignment.** Many high-performance L1 networks operate
successfully with validator sets of similar or smaller size.
A set of 21 is well-established as a practical number that
balances decentralization with performance.

A successful implementation means:

- All exiting validators and their delegators transition smoothly
  with no loss of delegated funds.
- Network consensus performance improves measurably after the
  reduction.
- The remaining 21 validators are well-capitalized and
  operationally strong.

## Terminology

- **Active validator set**: The maximum number of validators that
  participate in consensus and earn staking rewards at any given
  time.
- **Locked validator**: A validator whose stake or delegations
  are subject to a fixed lock-up period and cannot be immediately
  withdrawn.
- **Unlocked validator**: A validator whose stake or delegations
  are flexible and can be withdrawn or redelegated without a
  lock-up period.

## Proposal

### Parameter Change

The `MaxValidators` consensus parameter MUST be changed from `80`
to `21`. This change will be activated via a coordinated network
upgrade.

After activation, only the top 21 validators by total stake will
participate in consensus. Validators ranked 22nd and below will
become inactive and stop earning staking rewards.

### Transition Plan

To protect delegators and give exiting validators time to wind
down operations in an orderly fashion, a structured exit process
will be followed for all validators. The Foundation may provide
additional transition support to eligible exiting validators who
complete the structured exit process and maintain node operations
through the applicable notice period. Further details will be
communicated directly to affected validators. The exit process
distinguishes between locked and unlocked validators:

- **Locked validators** MUST provide 3 weeks' notice before
  exiting. Affected delegators will be notified so they can
  unstake during the notice period. The validator SHOULD keep
  its node running until all delegations are removed.

- **Unlocked validators** MUST provide 1 week's notice before
  exiting. Because unlocked validators may have retail or public
  delegators, the validator MUST also publish a public
  redelegation notice. The validator SHOULD keep its node running
  until all delegations are removed.

In both cases, if a validator chooses to stop its node before
all delegations have cleared, it accepts the risk of loss of
principal on its own self-delegation.

### Drawbacks

- **Validator displacement.** Up to 59 currently active validators
  will lose their active status and associated staking rewards.
  This may cause friction with existing validator partners.

- **Delegator disruption.** Delegators staked with exiting
  validators must take action (unstake or redelegate), creating
  a temporary period of user friction. The transition plan
  mitigates this but does not eliminate it entirely.

- **Barrier to entry.** A smaller set raises the minimum stake
  required to enter the active set, potentially discouraging new
  validators from joining the network.

- **Reduced decentralization.** Fewer active validators means
  consensus authority is concentrated among fewer entities. This
  increases the theoretical risk of collusion, though 21
  validators with a BFT threshold still requires compromising 7+
  independent operators and is thus not considered a risk factor.

### User Impact

**Validators.** Validators ranked outside the top 21 by stake
will become inactive after the upgrade. They will no longer earn
staking rewards and should follow the structured exit process
to wind down operations if they choose not to compete for a
top-21 position.

**Delegators.** Delegators staked with validators that fall
outside the top 21 will need to redelegate to an active
validator to continue earning rewards. The transition plan
provides notice periods (3 weeks for locked, 1 week for
unlocked validators) to allow delegators to take action
without loss of funds.

### Validator Acknowledgement

The Foundation recognizes and appreciates the work of all
validators who have supported the Story network to date. Many
operators have contributed time, infrastructure, operational
support, and ecosystem participation during an important phase
of the network’s development.

While this proposal would reduce the number of active validator
slots, that change should not be read as a dismissal of the
contributions made by validators who may no longer remain in the
active set. The transition plan is intended to help affected
validators and delegators move through the change in an orderly
way, with minimal disruption and no loss of delegated funds.

### Rollout plan

1. SIP accepted and upgrade release date announced.
2. Validators expected to exit the active set are identified and
   notified per the transition plan.
3. Notice periods begin (3 weeks for locked, 1 week for
   unlocked validators).
4. Network upgrade activates the new `MaxValidators` parameter.
5. Post-upgrade monitoring confirms network stability and all
   delegator transitions are complete.

### Performance Implications

Consensus round-trip time is expected to improve due to the
reduction in the number of prevote and precommit messages
exchanged per block. With 80 validators, each consensus round
requires up to 6,320 messages (80 x 79). With 21 validators,
this drops to 420 messages (21 x 20), a ~93% reduction in
consensus messaging overhead.

Block finality latency, network bandwidth per validator, and
overall chain throughput should all improve measurably.
Benchmarks should be run before and after the upgrade to
quantify the improvement.

## Prior Art

- **BNB Smart Chain (BSC):** Operates with 21 active validators,
  demonstrating that a set of this size can support a
  high-throughput EVM-compatible chain.
- **EOS / Antelope:** Uses 21 block producers as its active
  consensus set, one of the earliest examples of this model.
- **Cosmos Hub:** While currently at 180 validators, ongoing
  governance discussions have proposed reductions to improve
  performance, reflecting similar motivations.
- **Solana:** Although it has a large validator set, its
  performance challenges have prompted community discussion about
  the trade-offs of large validator sets versus consensus
  efficiency.
