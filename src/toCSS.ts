import { strAttr } from './strAttr';
import { strNode } from './strNode';
import { JSONNode } from './toJSON';

/**
 * @param node
 *            A JSON node.
 * @param depth
 *            The depth of the current node; used for indentation and
 *            optional.
 * @param breaks
 *            Whether to add line breaks in the output.
 */
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