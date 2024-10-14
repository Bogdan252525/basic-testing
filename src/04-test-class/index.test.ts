import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(80);
    expect(account.getBalance()).toBe(80);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(70);
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(150);
    expect(() => account.transfer(40, account)).toThrow(TransferFailedError);
  });

  test('should throw error when transferring to the same account', () => {
    const account1 = getBankAccount(80);
    const account2 = getBankAccount(40);
    expect(() => account1.transfer(120, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should deposit money', () => {
    const account = getBankAccount(80);
    account.deposit(40);
    expect(account.getBalance()).toBe(120);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(90);
    account.withdraw(30);
    expect(account.getBalance()).toBe(60);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(40);
    account1.transfer(80, account2);
    expect(account1.getBalance()).toBe(20);
    expect(account2.getBalance()).toBe(120);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(90);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(70);

    const balance = await account.fetchBalance();
    expect(balance).toBe(70);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(70);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(120);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(120);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(80);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
