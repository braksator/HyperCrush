declare module 'hypercrush' {
  export interface HyperCrushOptions {
  }

  export function code(code: string): string;
  export function file(inputFile: string, outputFile: string): void;
  export function gulp(): any;
}