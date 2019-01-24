class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    let trx = this.transactions;
     if (trx === undefined) {
      return balance;
    }
    else {
      trx.forEach(function(transaction) {
        if (transaction instanceof Withdrawal) {
          balance -= transaction.amount;
        }
        else {
          balance += transaction.amount;
        }
      });
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
    else
      {
        console.log("Transaction is not valid");
      }
  }

}


class Withdrawal extends Transaction {

  value() {
    return this.amount * -1;
  }

  isAllowed () {
    if ((this.account.balance - this.amount) < 0 ) {
      return false;
      }
    else {
      return true;
    }
  }
}

class Deposit extends Transaction {

  value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  };

}





// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


const myAccount = new Account('billybob');

const t1 = new Deposit(10.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
