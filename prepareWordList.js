/**
 * Simple Word Segmenter
 * https://github.com/vpnry/myanmar_word_segmenter
 * File: prepareWordList.js
 */

const fs = require("fs");
const path = require("path");

const codeTemplate = "dev_standalone_template.js";
const wordListJsonFile = "MYWORDS.json";
const allInOneFile = "MyWordSegmenter.js";

const folderPath = path.join(__dirname, "myanmar-words", "json-files");
const mergedFilePath = path.join(__dirname, wordListJsonFile);

const files = fs
  .readdirSync(folderPath)
  .filter((file) => path.extname(file).toLowerCase() === ".json");

const mergedData = new Set();

for (const file of files) {
  const filePath = path.join(folderPath, file);
  const fileData = require(filePath);
  for (const word of fileData) {
    mergedData.add(word);
  }
}

const mergedArray = Array.from(mergedData).sort((a, b) => b.length - a.length);

// const mergedJSON = JSON.stringify(mergedArray, null, 2);
const mergedJSON = JSON.stringify(mergedArray);
fs.writeFileSync(mergedFilePath, mergedJSON);

console.log(`[V] Merged data saved to ${mergedFilePath}`);

// Prepare standalone code
const appTemplatePath = path.join(__dirname, codeTemplate);
const appJSContent = fs.readFileSync(appTemplatePath, "utf8");

const MYWORDSPath = path.join(__dirname, wordListJsonFile);
const MYWORDSContent = fs.readFileSync(MYWORDSPath, "utf8");

const myWordListLicense = `/*
    The below Myanmar word list is adapted from: https://github.com/myanmartools/myanmar-words.git

    The MIT License

    Copyright (c) Myanmar Linguistics team.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    */
`;

const minJSContent = appJSContent.replace(
  "this.MYWORDS = `a_Set_of_word_list_here`;",
  `${myWordListLicense}
    const mergedData = ${MYWORDSContent};
    const MYWORDS = new Set(mergedData);
    console.log(\`Words in your word list Set: \${MYWORDS.size}\`);
    this.MYWORDS = MYWORDS;`
);

const minJSPath = path.join(__dirname, allInOneFile);
fs.writeFileSync(minJSPath, minJSContent, "utf8");
console.log(`[V] Generated ${allInOneFile} in ${minJSPath}`);
