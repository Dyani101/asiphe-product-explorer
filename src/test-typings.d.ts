declare function describe(description: string, spec: () => void): void;
declare function it(description: string, test: () => void | Promise<void>): void;
declare function beforeEach(fn: () => void | Promise<void>): void;
declare function afterEach(fn: () => void | Promise<void>): void;
declare function expect(actual: any): any;
