import { JSONNode } from './toJSON';

const strAttr = (name: string, value: string, depth = 0): string => {
  return `${'  '.repeat(depth)}${name}: ${value};\n`;
};

const strNode = function (
  name: string,
  value: JSONNode,
  depth = 0
): string {
  let cssString = `${'  '.repeat(depth)}${name} {\n`;
  cssString += toCSS(value, depth + 1);
  cssString += `${'  '.repeat(depth)}}\n`;
  return cssString;
};

export const toCSS = function (
  node: JSONNode,
  depth = 0
): string {
  let cssString = '';
  if (node.attributes) {
    const attributes = Object.entries(node.attributes);
    attributes.forEach(([key, value]) => {
      cssString += strAttr(key, value, depth);
    });
  }
  if (node.children) {
    const children = Object.entries(node.children);
    children.forEach(([key, value]) => {
      cssString += strNode(key, value, depth);
    });
  }

  return depth === 0 ? cssString.trimEnd() : cssString;
};