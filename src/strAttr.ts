export const strAttr = (name: string, value: string, depth = 0): string => {
  return `${'  '.repeat(depth)}${name}: ${value};\n`;
};
