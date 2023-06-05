# Junit report action 

TODO.

## Inputs

## `surefire-files`
Specification of surefire files (can use * and  ** wildcards).
Default: `**/target/surefire-reports/TEST-*.xml`

## `report-dir`
Directory where the reports will be generated.
Default: `target/site`

## Example usage

```
uses: javiertuya/junit-report-action@main
with:
  project-dir: 'src/main/java'
  sharpen-args: '@sharpen-all-options.txt'
```
