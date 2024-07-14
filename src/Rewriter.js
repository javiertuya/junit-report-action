import { glob } from "glob"
import fs from 'fs';
import path from 'path';

const rewriter = {
    debug: function (message) {
        //console.log(message);
    },

    processFiles: function (prefix, reportsPattern, diffsPattern) {
        const reports = glob.sync(reportsPattern);
        for (let report of reports) {
            this.debug(`Get replacements in report: ${report}`);
            let replacements = this.getNameReplacements(prefix, report, diffsPattern);
            this.debug(replacements);

            if (Object.keys(replacements).length > 0) {
                this.debug(`Perform replacement in report: ${report}`);
                let content = fs.readFileSync(report).toString();
                let newContent = this.getNewHtmlContent(prefix, content, replacements);
                console.log(`Updating report ${report} with ${Object.keys(replacements).length} replacements`);
                fs.writeFileSync(report, newContent);
            }
        }
    },

    // Returns a json with key=file name to be replaced, value=new name
    getNameReplacements: function (prefix, report, diffsPattern) {
        let content = fs.readFileSync(report).toString();
        const diffs = glob.sync(diffsPattern);
        this.debug(`Diffs to replace: ${diffs}`);
        let replacements = {};
        if (prefix.length > 0 && content.indexOf(prefix) < 0) {
            this.debug("  Any prefix found, no replacements");
            return replacements;
        }
        for (let diff of diffs) {
            let diffBase = path.basename(diff);
            this.debug(`  Processing diff file: ${diffBase}`);
            if (content.indexOf(prefix + diffBase) > -1) {
                // For html,the reference to the diff file must have relative path to the report file directory
                let reference = path.relative(path.dirname(report), diff);
                reference = reference.replace(/\\/g, '\/');
                this.debug(`    Found, relative path ${reference}`);
                // There can be more than one diffBase with same values (files with same name in different folders)
                // Both must be added to be displayed in the report
                if (replacements[diffBase] == undefined)
                    replacements[diffBase] = [reference];
                else
                    replacements[diffBase].push(reference);
            }
        }
        return replacements;
    },

    // Replaces the html content indicated by the replacements json
    getNewHtmlContent: function (prefix, content, replacements) {
        for (const diffs in replacements) {
            if (replacements[diffs].length == 1) { //by construction, not empty
                // General case, tere is ony a file to link
                let link = this.href(replacements[diffs][0], prefix + diffs);
                content = content.replaceAll(prefix + diffs, link);
            } else if (replacements[diffs].length > 1) {
                // edge case, there are files with the same name in different folders, we don't
                // know what is the right file, show all
                let links = "";
                for (let i = 0; i < replacements[diffs].length; i++)
                    links += " " + this.href(replacements[diffs][i], "file" + (i + 1));
                let replacedContent = `(multiple files with name ${prefix + diffs}:${links})`;
                content = content.replaceAll(prefix + diffs, replacedContent);
            }
        }
        return content;
    },
    href: function (link, text) {
        return `<a href="${link}">${text}</a>`;
    },
}

export { rewriter };
