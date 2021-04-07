# Prettier Apex

This is a modified version of the Prettier Apex plugin to better suit our current coding conventions.

See the original documentation [here](https://github.com/dangmai/prettier-plugin-apex).

## Changes

These are the changes from the original project. Each one is configurable with an option in `.prettierrc`.

### Empty line at the start of a class / interface / trigger

**Option:** `apexBeginClassWithEmptyLine` (_boolean_)

#### Before

```
public class Potato {
    private int size;

    ...
}
```

#### After

```
public class Potato {

    private int size;

    ...
}
```

### Use additional indent for continuation lines

**Option:** `apexUseContinuationIndent` (_boolean_)

#### Before

```
doSomething(paramA,
    paramB,
    paramC);
```

#### After

```
doSomething(paramA,
        paramB,
        paramC);
```

### No newline before conditional expressions, in if-statements and loops

**Option:** `apexSkipNewlineBeforeCondition` (_boolean_)

#### Before

```
if(
        conditionA
        && conditionB
        && conditionC) {
    ...
}
```

#### After

```
if(conditionA
        && conditionB
        && conditionC) {
    ...
}
```

### No newline before closing parenthesis, for statements with a body

**Option:** `apexSkipNewlineBeforeClosingParenthesis` (_boolean_)

#### Before

```
private void doSomething(
        Potato p1,
        Potato p2,
        Potato p3
) {
    ...
}
```

#### After

```
private void doSomething(
        Potato p1,
        Potato p2,
        Potato p3) {
    ...
}
```

> Note that the "Before" style is still permitted for statements without a body,
> e.g. return / assignment statements.

### Still To Do

- Support continuation lines before ternary operators
- Newline after `/*` in block comments
- Line breaks between methods
- Line breaks BEFORE operators

## Developing the Plugin

### Setup

1. From the `prettier-plugin-apex` repo:

   ```
   npm link
   ```

2. From the repo to be formatted:

   ```
   npm link prettier-plugin-apex
   ```

3. Enable "Format on Save".

   > You can also format manually using: Ctrl + Shift + P => Format Document

### Testing Changes

After making a change to the Prettier plugin, it must be reloaded using:

    Ctrl + Shift + P => Reload Window

Note that it can take some time for Prettier to initialise.

### Unit Tests

To run linting and unit tests:

```
npm test
```

To run just the unit tests:

```
npx jest
```

## Useful Links

- [Dev Notes](/docs/dev_notes.md)
- [Developing Prettier Plugins](https://prettier.io/docs/en/plugins.html#developing-plugins)
- [Prettier Commands](https://github.com/prettier/prettier/blob/main/commands.md)
- [AstPath Class](https://github.com/prettier/prettier/blob/main/src/common/ast-path.js) (`path` parameter supplied to print functions)
