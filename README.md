# Junit report action 

Generates junit html style reports from surefire test results

## Inputs

## `surefire-files`
Specification of surefire files (can use * and  ** wildcards).
Default: `**/target/surefire-reports/TEST-*.xml`

## `report-dir`
Directory where the junit html reports will be generated.
Default: `target/site`

## Example usage

```
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          surefire-files: "**/target/surefire-reports/TEST-*.xml"
          report-dir: target/site/junit
```
