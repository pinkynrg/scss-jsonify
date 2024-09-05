import { toCSS } from './toCSS';
import { JSONNode } from './toJSON';

export const strNode = function (
  name: string,
  value: JSONNode,
  depth = 0
): string {
  let cssString = `${'  '.repeat(depth)}${name} {\n`;
  cssString += toCSS(value, depth + 1);
  cssString += `${'  '.repeat(depth)}}\n`;
  return cssString;
};