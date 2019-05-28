/* eslint no-param-reassign: 0 */

const { isApexDocComment } = require("./comments");
const constants = require("./constants");

const apexTypes = constants.APEX_TYPES;

function isBinaryish(node) {
  return (
    node["@class"] === apexTypes.BOOLEAN_EXPRESSION ||
    node["@class"] === apexTypes.BINARY_EXPRESSION
  );
}

// The metadata corresponding to these keys cannot be compared for some reason
// or another, so we will delete them before the AST comparison
const METADATA_TO_IGNORE = [
  "loc",
  "location",
  "lastNodeLoc",
  "text",
  "rawQuery",
  "@id",
  // It is impossible to preserve the comment AST. Neither recast nor
  // prettier tries to do it so we are not going to bother either.
  "apexComments",
  "$",
  "leading",
  "trailing",
  "hiddenTokenMap",
  "trailingEmptyLine",
  "isLastNodeInArray",
];

/**
 * Massaging the AST node so that it can be compared. This gets called by
 * Prettier's internal code
 * @param ast the Abstract Syntax Tree to compare
 * @param newObj the newly created object
 */
function massageAstNode(ast, newObj) {
  // Handling ApexDoc
  if (
    ast["@class"] &&
    ast["@class"] === apexTypes.BLOCK_COMMENT &&
    isApexDocComment(ast)
  ) {
    newObj.value = ast.value.replace(/\s/g, "");
  }
  if (ast.scope && typeof ast.scope === "string") {
    // Apex is case insensitivity, but in sone case we're forcing the strings
    // to be uppercase for consistency so the ASTs may be different between
    // the original and parsed strings.
    newObj.scope = ast.scope.toUpperCase();
  } else if (
    ast.dottedExpr &&
    ast.dottedExpr.value &&
    ast.dottedExpr.value.names &&
    ast.dottedExpr.value["@class"] === apexTypes.VARIABLE_EXPRESSION &&
    ast.names
  ) {
    // This is a workaround for #38 - jorje sometimes groups names with
    // spaces as dottedExpr, so we can't compare AST effectively.
    // In those cases we will bring the dottedExpr out into the names.
    newObj.names = newObj.dottedExpr.value.names.concat(newObj.names);
    newObj.dottedExpr = newObj.dottedExpr.value.dottedExpr;
  }
  METADATA_TO_IGNORE.forEach(name => delete newObj[name]);
}

/**
 * Helper function to find a character in a string, starting at an index.
 * It will ignore characters that are part of comments.
 */
function findNextUncommentedCharacter(
  sourceCode,
  character,
  fromIndex,
  commentNodes,
  backwards = false,
) {
  let indexFound = false;
  let index;
  while (!indexFound) {
    if (backwards) {
      index = sourceCode.lastIndexOf(character, fromIndex);
    } else {
      index = sourceCode.indexOf(character, fromIndex);
    }
    indexFound =
      // eslint-disable-next-line no-loop-func
      commentNodes.filter(comment => {
        return (
          comment.location.startIndex <= index &&
          comment.location.endIndex >= index
        );
      }).length === 0;
    if (backwards) {
      fromIndex = index - 1;
    } else {
      fromIndex = index + 1;
    }
  }
  return index;
}

// One big difference between our precedence list vs Prettier's core
// is that == (and its precedence equivalences) has the same precedence
// as < (and its precedence equivalences).
// e.g. a > b == c > d:
// in Javascript, this would be parsed this as: left (a > b), op (==), right (c > d)
// instead, jorje parses this as:
// left (a > b == c), op (>), right (d)
// The consequence is that formatted code does not look as nice as Prettier's core,
// but we can't change it because it will change the code's behavior.
const PRECEDENCE = {};
[
  ["||"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!==", "<>", "<", ">", "<=", ">="],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"],
].forEach((tier, i) => {
  tier.forEach(op => {
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op) {
  return PRECEDENCE[op];
}

module.exports = {
  findNextUncommentedCharacter,
  getPrecedence,
  isBinaryish,
  massageAstNode,
};
