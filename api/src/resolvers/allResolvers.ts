import userResolver from "./user";

const jsonType = {
  __parseValue(value: any) {
    return value;
  },
  __parseLiteral(ast: any) {
    return ast.value;
  },
  __serialize(value: any) {
    return value;
  }
};

export const allResolvers = [{ JSON: jsonType }, userResolver];
