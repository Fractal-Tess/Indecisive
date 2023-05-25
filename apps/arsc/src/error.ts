class CustomError {
  public type: 'network' | 'parse' | 'csrf';
  public message: string;
  constructor(type: CustomError['type'], message: CustomError['message']) {
    this.type = type;
    this.message = message;
  }
}

export { CustomError };
