# Prettier Apex

This is a modified version of the Prettier Apex plugin to better suit our current coding conventions.

See the original documentation [here](https://github.com/dangmai/prettier-plugin-apex).

## Changes

These are the changes from the original project:

### Empty line at the start of a class

#### Before

```
public class Potato {
    private int size;

    ...
```

#### After

```
public class Potato {

    private int size;

    ...
```

### Still To Do

 - No newline before closing parenthesis, for statements with a body
 - Indent twice for continuation lines
 - Add curly braces in single-line if/where/for bodies
 - Newline after /* in block comments
 - Line breaks between methods

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

## Useful Links

 - [Prettier Commands](https://github.com/prettier/prettier/blob/main/commands.md)
