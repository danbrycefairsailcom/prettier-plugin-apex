# Notes

The Prettier API is not always intuitive, so these notes are intended to document some of the quirks encountered during development of this plugin.

## Dedenting

Dedenting only seems to apply to the _next_ newline. So, trying to dedent a closing bracket is futile, since the line will have already been indented by that point. Instead, the dedent must be applied to the newline _before_ the closing bracket.
