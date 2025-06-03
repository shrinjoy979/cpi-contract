import { test, expect } from "bun:test";
import { LiteSVM } from "litesvm";
import { Transaction, PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL, TransactionInstruction } from "@solana/web3.js";

test("CPI works as expected", async () => {
    let svm = new LiteSVM();

    let doubleContract = PublicKey.unique();
    let cpiContract = PublicKey.unique();

    svm.addProgramFromFile(doubleContract, "./double.so");
    svm.addProgramFromFile(cpiContract, "./cpi.so");

    let userAccount = new Keypair();
    let dataAcc = new Keypair();
    svm.airdrop(userAccount.publicKey, BigInt(LAMPORTS_PER_SOL));

    createDataAccOnChain(svm, dataAcc, userAccount, doubleContract);

    function doubleIt() {
        let ix = new TransactionInstruction({
            keys: [
                { pubkey: dataAcc.publicKey, isSigner: true, isWritable: true },
                { pubkey: doubleContract, isSigner: false, isWritable: false },
            ],
            programId: cpiContract,
            data: Buffer.from(""),
        });
    
        const blockhash = svm.latestBlockhash();
        let transaction = new Transaction().add(ix);
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = userAccount.publicKey;
        transaction.sign(userAccount, dataAcc);
    
        const res = svm.sendTransaction(transaction);
        console.log(res.toString());
        svm.expireBlockhash();
    }
    doubleIt();
    doubleIt();
    doubleIt();
    doubleIt();
    
    const dataAccountData = svm.getAccount(dataAcc.publicKey);
    expect(dataAccountData?.data[0]).toBe(8);
    expect(dataAccountData?.data[1]).toBe(0);
    expect(dataAccountData?.data[2]).toBe(0);
    expect(dataAccountData?.data[3]).toBe(0);
});

function createDataAccOnChain(svm: LiteSVM, dataAccount: Keypair, payer: Keypair, contractPubkey: PublicKey) {

    const blockhash = svm.latestBlockhash();
	const ixs = [
		SystemProgram.createAccount({
			fromPubkey: payer.publicKey,
			newAccountPubkey: dataAccount.publicKey,
			lamports: Number(svm.minimumBalanceForRentExemption(BigInt(4))),
			space: 4,
			programId: contractPubkey
		}),
	];
    
	const tx = new Transaction();
	tx.recentBlockhash = blockhash;
	tx.feePayer = payer.publicKey;
	tx.add(...ixs);
	tx.sign(payer, dataAccount);
	svm.sendTransaction(tx);


}
