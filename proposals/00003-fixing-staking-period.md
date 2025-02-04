---
number: '00003'
title: Fixing the 90 days staking period config
authors: Ze Huang (ze.huang@piplabs.xyz)
sponsors: Ramtin Seraj (ramtin.seraj@piplabs.xyz)
created: 2025-01-04
type: Standard
status: Draft
supersedes: 
superseded-by: 
extends: 
---

## Summary

Story supports native staking periods. Users stake their IP tokens 
for longer staking periods will get higher reward multipliers.

Based on the staking spec, the initial staking periods and the 
corresponding reward multipliers should be:

- 90 days - 1.051
- 360 days - 1.16
- 540 days - 1.34

However, due to a misconfiguration on the genesis file, the current 
90-day period is configured as 30 days. This may result in stakers 
always preferring staking 30 days period since it yields the best 
rewards overall and makes 360 days and 540 days staking periods 
unattractive.

[Community discussion:](https://forum.story.foundation/t/increase-the-30-days-staking-period-to-90-days/43/1)

## Motivation

Fixing this issue unlocks staking for 90 days option for users.

## Proposal

Change of config from 30 days (wrong value) to 60 days.

### Drawbacks

No drawback knowns

### Alternatives Considered

N/A

### User Impact

N/!
