---
number: '00004'
title: Emit reward distribution events
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

This SIP propose adding a new event type to capture the staking reward 
distribution. It helps off-chain tools to better track the rewards. 

[forum discussion link](https://forum.story.foundation/t/emit-reward-distribution-events-with-validator-address/46)

## Motivation

Story uses cometbft as the consensus layer(CL) and geth as the execution 
layer(EL). The two layers communicate through EngineAPI. Users only interact 
with EL. The staking and unstaking of Story’s native IP token are triggered 
on EL and the actual logic is handled in CL.
When an unstaking or reward distribution is triggered, CL needs to send the 
withdrawn/distributed IP tokens back to EL through EngineAPI.

However, the current EngineAPI interface for withdrawals doesn’t allow for 
passing in the validator address. Because of this, users on EL side don’t know 
which validators the withdrawals come from and hence have no ways to calculate 
rewards APR per validator they stake.

## Proposal

We should emit an event on CL side to capture all withdrawals sent back to EL. 
The event should include a validator address field so that an indexing solution 
can pick up this event and calculate the correct reward APR.

### Drawbacks

No drawback knowns

### Alternatives Considered

N/A

### User Impact

N/!
