# Introduction to ERC-20 Tokens

The **ERC-20** token standard is a set of rules and guidelines in Solidity that developers must follow to create fungible tokens on the Ethereum blockchain. ERC stands for *Ethereum Request for Comments*, and “20” is simply the proposal identifier.

## Key Features of ERC-20 Tokens

- **Fungibility**: Each token is exactly the same as every other token.
- **Interoperability**: ERC-20 tokens can be used across many different Ethereum applications.
- **Compatibility**: Wallets and exchanges support ERC-20 tokens by default.

## Standard ERC-20 Functions

Every ERC-20 token must implement the following functions:

```solidity
function totalSupply() public view returns (uint256);
function balanceOf(address _owner) public view returns (uint256 balance);
function transfer(address _to, uint256 _value) public returns (bool success);
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
function approve(address _spender, uint256 _value) public returns (bool success);
function allowance(address _owner, address _spender) public view returns (uint256 remaining);
```

### Optional Metadata Functions

```solidity
function name() public view returns (string memory);
function symbol() public view returns (string memory);
function decimals() public view returns (uint8);
```

These functions help display token details in wallets and UIs.

## Required Events

ERC-20 tokens must emit these events for off-chain tracking:

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);
```

## Real-World Analogy

Think of an ERC-20 token like casino chips:
- All chips of the same value are interchangeable.
- You can transfer chips to others.
- You can approve someone to spend chips on your behalf (e.g., give a friend permission to gamble for you).

## Best Practices

- Use SafeMath (in older versions of Solidity) or built-in overflow checks (Solidity 0.8+) to avoid overflows.
- Emit events properly to keep dApp UIs and analytics tools updated.
- Follow the standard strictly to ensure compatibility across the ecosystem.
