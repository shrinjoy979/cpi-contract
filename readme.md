# CPI Contract (Solana + Rust)

A Solana smart contract written in Rust that demonstrates **Cross Program Invocation (CPI)**.  
This program shows how one Solana program can securely call another program on-chain.

CPI is a core concept in Solana development and is widely used for interacting with programs such as the Token Program.

---

## Features

- Demonstrates Cross Program Invocation (CPI)
- Interacts with another on-chain program
- Secure instruction handling
- Example of program-to-program communication
- Beginner-friendly Solana Rust project

---

## Built With

- Rust
- Solana Program Library
- Solana CLI
- Cargo

---

## Installation & Setup

### 1. Install Solana CLI

Follow the official guide:

https://docs.solana.com/cli/install-solana-cli-tools

Verify installation:

```bash
solana --version
```

---

### 2. Clone the repository

```bash
git clone https://github.com/your-username/cpi-contract.git
cd cpi-contract
```

---

### 3. Build the program

```bash
cargo build-bpf
```

---

### 4. Deploy the program

```bash
solana program deploy target/deploy/cpi_contract.so
```

---

## How It Works

1. A user sends a transaction to the CPI program.
2. The program processes the instruction.
3. The program invokes another Solana program using **Cross Program Invocation**.
4. The invoked program executes its logic and returns the result.

---

## Project Structure

```
cpi-contract/
│
├── src/
│   ├── lib.rs
│   ├── instruction.rs
│   ├── processor.rs
│   └── state.rs
│
├── Cargo.toml
└── README.md
```

---

## Concepts Used

- Cross Program Invocation (CPI)
- Solana Accounts
- Program Instructions
- Rust Enums and Structs
- Solana Runtime
- Program-to-Program Communication

---

## Future Improvements

- Add support for Token Program CPI
- Add more example instructions
- Write integration tests
- Build a frontend interface
- Add Anchor-based implementation

---

## Contributing

Pull requests are welcome.  
Feel free to fork the project and improve it.
