# Junit Report Action for Java and .NET

Generates junit html style reports from surefire test results and .NET .trx test results

## Inputs

- `report-title` *(Optional)*: The title of the test report.
- `surefire-files` *(Default `**/target/surefire-reports/TEST-*.xml`)*: Specification of the surefire test report files (can use * and  ** wildcards).
- `report-dir` *(Default `target/site`)*: Directory where the resulting junit html reports will be generated .

On .NET you also need:
- `net-trx-report`: Specifies the .Net test result file (`.trx`) that
  will be splitted into a set of `TEST-*.xml` files in the folder `net-surefire-folder`.
  The resulting files can be specified in the `surefire-files` parameter to generate the html report.
- `net-surefire-folder` *(Default `target/surefire-reports`)*: Only if `net-trx-report` is specified: 
  folder where the splitted test report files will be stored.

NOTE: All paths are relative to the workspace, even if a working dir has been specified.

## Outputs

The html reports at the `report-dir` folder:
- `junit-noframes/junit-noframes.html`: A single html file with the test reports.
- `junit-frames/index.html`: Reports in multiple html files.

## Example usage

On Java, this will generate the html the test report files from the test results produced by maven surefire:

```
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          surefire-files: "**/target/surefire-reports/TEST-*.xml"
          report-dir: target/site/junit
```

On .NET, this will take single `.trx` file with the results of the test, split it
into `reports/surefire-report` folder and generate the html test reports at `reports`:

```
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          net-trx-report: "MyProject/MyProjectTestResult.trx"
          net-surefire-folder: "reports/surefire-reports"
          surefire-files: "reports/surefire-reports/TEST-*.xml"
          report-dir: reports
```
