const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p12nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount);
    });

    it('output the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
        .toEqual(amount);
    });

    it('input the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe('transacting with an amount that exceeds the balance', () => {
        
        beforeEach(() => {
            amount = 50000;
            wallet = new Wallet();
            console.log(wallet)
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });
})

