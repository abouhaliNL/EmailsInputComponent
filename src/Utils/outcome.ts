export class Outcome<T> {
  public succeeded: NonNullable<boolean>;
  public failed: NonNullable<boolean>;
  public error: string;
  private _value: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(`Initialization void, an outcome cannot have both an error and success.`);
    }
    if (!isSuccess && !error) {
      throw new Error(`Initialization void, an error must contain a message.`);
    }
    this.succeeded = isSuccess;
    this.failed = !isSuccess;
    this.error = error!;
    this._value = value!;
    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.succeeded) {
      throw new Error(`Outcome has failed, can not retrieve value`);
    }
    return this._value;
  }

  public static approved<U>(value?: U): Outcome<U> {
    return new Outcome<U>(true, null!, value);
  }

  public static decline<U>(error: string): Outcome<U> {
    return new Outcome<U>(false, error);
  }
}
