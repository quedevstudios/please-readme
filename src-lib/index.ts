export interface Options {

};

class PleaseReadMe {
  private options: Options

  constructor(options: Options) {
    this.options = options
  }

  public load(_content: string): void {}
}

export function pleaseReadMe(options: Options): PleaseReadMe {
  return new PleaseReadMe(options)
}
