# Junit Report Action for Java and .NET

Generates junit html style reports from surefire test results and .NET .trx test results

## Inputs

On Java, to generate the reports you can specify:

- `report-title` *(Optional)*: The title of the test report.
- `surefire-files` *(Default `**/target/surefire-reports/TEST-*.xml`)*: Specification of the surefire test report files (can use * and  ** wildcards).
- `report-dir` *(Default `target/site`)*: Directory where the resulting junit html reports will be generated .

NOTE: All paths are relative to the workspace, even if a working dir has been specified.

On .NET you also need:
- `net-trx-report`: Specifies one or more result files (`.trx`) that
  will be splitted into a set of `TEST-*.xml` files in the folder `net-surefire-folder`.
  Multiple files are separated by comma.
- `net-surefire-folder` *(Default `target/surefire-reports`)*: Only if `net-trx-report` is specified: 
  folder where the splitted test report files will be stored.

When using [Visual Assert](https://github.com/javiertuya/visual-assert) to assert the content of large files
and show their differences in html, the junit html reports display the name of the html file with the diffs,
but do not link to the actual diff file.
To reprocess the reports to include  link to the diff files you may use these options (deactivated by default):
- `diff-links-enabled` *(default `false`)": Set to true to activate this reprocessing.
- `diff-links-prefix` *(default `target/`)": The path prefix to the diff file that you see in the report, 
  eg. *Visual diffs at: target/0.html* (must including the leading slash).
- `diff-links-reports` *(default `target/site/junit-*/**/*.html`)": A glob pattern of all html junit report files.
- `diff-links-files` *(default `**/target/*.html`)": A glob pattern of all diff files.

NOTE: When generating junit html reports from multimodule projects or a consolidated report from the results of all jobs
you should ensure that the names of each diff file are unique.
If not, the reprocessed report will include more than one link as the diff file.

## Outputs

The html reports at the `report-dir` folder:
- `junit-noframes/junit-noframes.html`: A single html file with the test reports.
- `junit-frames/index.html`: Reports in multiple html files.

## Example usage

On Java, this will generate the html the test report files from the test results produced by maven surefire:

```yaml
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          surefire-files: "**/target/surefire-reports/TEST-*.xml"
          report-dir: target/site/junit
```

On .NET, this will take two `.trx` files with the results of the tests, split it
into `reports/surefire-report` folder and generate the html test reports at `reports`:

```yaml
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          net-trx-report: "MyProject/MyProjectTestResult.trx,MyProject2/MyProject2TestResult.trx"
          net-surefire-folder: "reports/surefire-reports"
          surefire-files: "reports/surefire-reports/TEST-*.xml"
          report-dir: reports
```

To generate the test reports of a Java project (it can be single or multimodule project),
with their default values and links to the html diff files generated by 
[Visual Assert](https://github.com/javiertuya/visual-assert) (also with default values):

```yaml
      - name: Junit html report
        uses: javiertuya/junit-report-action@main
        with:
          diff-links-enabled: true
```
