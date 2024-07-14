import assert from 'assert';
import { rewriter } from "../src/Rewriter.js"
import fs from 'fs';

describe("Test url rewriting in junit test htl reports", async function () {

    //note: this is run from parent project (test data file paths relative to parent)

    it("Main report with single and duplicated html files", function () {
        let report = "test-data/reports/report-1.html";
        let diffs = "test-data/**/target/*.html";
        let replacements = rewriter.getNameReplacements("root/", report, diffs);
        console.log(`Test report: ${report} - diffs: ${diffs} - Actual replacement:`);
        console.log(replacements);
        let expected = {
            'diffs-1.html': ['../module1/target/diffs-1.html'],
            'diffs-2-sub.html': ['../module2/submodule/target/diffs-2-sub.html'],
            'diffs-repeated.html': ['../module2/submodule/target/diffs-repeated.html', '../module1/target/diffs-repeated.html']
        }
        assert.deepEqual(expected, replacements);

        // This also checks the resulting html for these replacements
        let newHtml = rewriter.getNewHtmlContent("root/", fs.readFileSync(report).toString(), replacements);
        console.log(`Replaced content\n${newHtml}`);
        let expectedHtml = `<p>One and two diffs in different folders, one repeated (same name in different folders)</p>
<p>Diffs at: <a href="../module1/target/diffs-1.html">root/diffs-1.html</a></p>
<p>Diffs at: <a href="../module2/submodule/target/diffs-2-sub.html">root/diffs-2-sub.html</a></p>
<p>Diffs at: <a href="../module1/target/diffs-1.html">root/diffs-1.html</a></p>
<p>One repeated (same name in different folders)</p>
<p>Diffs at: (multiple files with name root/diffs-repeated.html: <a href="../module2/submodule/target/diffs-repeated.html">file1</a> <a href="../module1/target/diffs-repeated.html">file2</a>)</p>`
        assert.equal(expectedHtml.replaceAll("\r", ""), newHtml.replaceAll("\r", ""));
    });

    it("Second report in another folder should return different relative paths for replacement links", function () {
        let report = "test-data/reports/subdir/report-subdir.html";
        let diffs = "test-data/**/target/*.html";
        let replacements = rewriter.getNameReplacements("root/", report, diffs);
        console.log(`Test report: ${report} - diffs: ${diffs} - Actual replacement:`);
        console.log(replacements);
        let expected = {
            'diffs-1.html': ['../../module1/target/diffs-1.html'],
            'diffs-2-sub.html': ['../../module2/submodule/target/diffs-2-sub.html']
        }
        assert.deepEqual(expected, replacements);
    });

    it("Report with no replacements", function () {
        let report = "test-data/reports/report-0.html";
        let diffs = "test-data/**/target/*.html";
        let replacements = rewriter.getNameReplacements("root/", report, diffs);
        console.log(`Test report: ${report} - diffs: ${diffs} - Actual replacement:`);
        console.log(replacements);
        let expected = {};
        assert.deepEqual(expected, replacements);
    });

});
