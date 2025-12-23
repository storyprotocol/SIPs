---
number: '00008'
title: `personal_sign` Authorization for EIP-7702
authors: Kingter Wang (kingter@piplabs.xyz)
sponsors: Leo Chen (leo@piplabs.xyz)
created: 2025-12-22
type: Standard
status: Accepted
supersedes: 
superseded-by: 
extends: 
---

## Summary

This SIP formalizes support on the Story chain for EIP-7702 authorization signatures produced via `personal_sign`.

The change expands wallet compatibility for EIP-7702 type `0x04` transactions while preserving the existing
authorization semantics and security guarantees.


[forum discussion link](https://forum.story.foundation/t/proposal-support-personal-sign-for-eip-7702-authorization-signatures/37328)

## Motivation

EIP-7702 relies on off-chain authorization signatures to enable delegated execution.

In practice, many widely used wallets—especially modern browser wallets—do not support `eth_sign`, 
but do support `personal_sign`. Without accepting `personal_sign`-based authorizations, 
these wallets cannot participate in EIP-7702 flows on Story.

This SIP ensures that EIP-7702 remains usable with real-world wallet infrastructure.

## Proposal

The Story execution client SHOULD accept EIP-7702 authorization signatures generated via `personal_sign`.

Such signatures MUST represent a canonical, human-readable authorization message that unambiguously binds:

- the chain ID
- the authorized implementation address
- the authorization nonce

The execution client MUST treat `personal_sign` and `eth_sign` authorizations as semantically equivalent once verified.

Transactions containing `personal_sign` authorizations includes an explicit signaling 
mechanism allowing the execution client to distinguish the signature type during verification.


### Drawbacks

N/A

### Alternatives Considered

N/A

### User Impact

- Enables EIP-7702 usage for modern browser wallets
- Improves onboarding and developer experience
- Requires no changes to user transaction flows
- Does not affect existing users or transactions  

## Implementation Considerations

- The change is limited to authorization verification logic in the execution client
- No changes to transaction structure or consensus rules
- Backward compatibility is preserved
- Message construction details are considered implementation-specific  
