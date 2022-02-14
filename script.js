const Account = require('./Account');
const CommandLine = require('./CommandLine');

async function main() {
  try {
    const accountName = await CommandLine.ask(
      'which account would you like to connect'
    );
    const account = await Account.find(accountName);
    if (account == null) account = await promptCreateAccount(accountName);
    if (account != null) await promptTask(account);
  } catch (err) {
    CommandLine.print('ERROR: PLEASE TRY AGAIN');
  }
}
async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    'that account does not exist.would you like to create it? (yes/no)'
  );
  if (response === 'yes') {
    return await Account.create(accountName);
  }
}
async function promptTask(account) {
  const response = await CommandLine.ask(
    'what would you like to do? (view, deposit, withdraw)'
  );
  if (response === 'deposit') {
    const amount = parseFloat(await CommandLine.ask('how much?'));
    await account.deposit(amount);
    CommandLine.print(`your balance is ${account.balance}ron`);
  } else if (response === 'withdraw') {
    const amount = parseFloat(await CommandLine.ask('how much?'));
    try {
      await account.withdraw(amount);
    } catch (err) {
      CommandLine.print(
        'unable to make the withdrawal.your balance: not enough founds'
      );
    }
    CommandLine.print(`your balance is ${account.balance}ron`);
  } else {
    CommandLine.print(`your balance is ${account.balance}ron`);
  }
}
main();
