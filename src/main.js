import { rewriter } from './Rewriter.js';

//console.log(process.argv)
if (process.argv.length != 5) {
    console.error("Usage: npm start diff-files-prefix report-files-glob diff-files-glob");
    process.exit(0)
}

//rewriter.processFiles("root/", "tmp/reports/**/*.html", "tmp/**/target/*.html");
// npm start  "root/"  "tmp/reports/**/*.html"  "tmp/**/target/*.html"
// npm start  "target/"  "petstore/reports/junit-*/**/*.html"  "petstore/**/target/*.html"
console.log(`diff-files-prefix: ${process.argv[2]}`);
console.log(`report-files-glob: ${process.argv[3]}`);
console.log(`diff-files-glob: ${process.argv[4]}`);
rewriter.processFiles(process.argv[2], process.argv[3], process.argv[4]);
