# myanmar_word_segmenter

In Myanmar sentences, words are often written without spaces between them. This can make it inconvenient for beginners to find them in dictionaries.

This script utilizes a simplistic approach by using a known Myanmar word list to split long words or phrases into smaller individual words, making it easier to locate them in the dictionary.

## Usage

The [MyWordSegmenter.js](./MyWordSegmenter.js) is **standalone** code file that can be used directly in a browser or as a NodeJs module. Check [example.js](./example.js) file.

```javascript

const MyWordSegmenter = require("./MyWordSegmenter");
const mSegmenter = new MyWordSegmenter();

const imagineTestWord =
  "123ညီအစ်ကိုမသိတသိအချိန်ညီအစ်ကိုမသိတသိအချိန်Singaporeမသေကောင်းမပျောက်ကောင်းမှုန်မှုန်မွှားမွှား";

console.log("\nTest input", imagineTestWord);
console.log("Test output", mSegmenter.word_segment(imagineTestWord));

Expected output:
[
  '123',
  'ညီအစ်ကိုမသိတသိအချိန်',
  'ညီအစ်ကိုမသိတသိအချိန်',
  'Singapore',
  'မသေကောင်းမပျောက်ကောင်း',
  'မှုန်မှုန်မွှားမွှား'
]

```

## Attributions

- Myanmar word list is from [myanmartools/myanmar-words](https://github.com/myanmartools/myanmar-words.git) - The MIT License Copyright (c) Myanmar Linguistics team.

- syllable_segment method is adapted from [swanhtet1992/ReSegment](https://github.com/swanhtet1992/ReSegment/blob/master/Javascript/resegment.js)

- Many code/text snippets are generated via [ChatGPT](https://chat.openai.com/chat)

---

## Developer notes

### 1. Download or update the myanmar-word list

Clone or download the [myanmar-words](https://github.com/myanmartools/myanmar-words) repository to the same directory with `prepareWordList.js` file. The relative path to `prepareWordList.js` should be `myanmar-words/json-files`.

```bash
git clone --depth=1 https://github.com/myanmartools/myanmar-words.git

# then run
node prepareWordList.js
```

It will use `dev_standalone_template` to generate `MYWORDS.json` and the standalone code file `MyWordSegmenter.js`.

## 2. Miscellaneous

- **Combine with dictionaries**

It is feasible to integrate Myanmar dictionaries within MyWordSegmenter.js to develop a basic Myanmar Popup dictionary browser extension for Myanmar learners.

- **Work with other languages**

The `theSegmenter` method in `MyWordSegmenter.js` can be easily adapted to work with many other languages with minor modifications.

Try yourself with the Pāḷi language.
