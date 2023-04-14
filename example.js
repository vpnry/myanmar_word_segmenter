/**
 * Simple Word Segmenter
 * https://github.com/vpnry/myanmar_word_segmenter
 * File: example.js
 */

// const MyWordSegmenter = require("./dev_NodeJs_MyWordSegmenter.js");
// const mSegmenter = new MyWordSegmenter("./MYWORDS.json");

const MyWordSegmenter = require("./MyWordSegmenter");
const mSegmenter = new MyWordSegmenter();

const imagineTestWord =
  "123ညီအစ်ကိုမသိတသိအချိန်ညီအစ်ကိုမသိတသိအချိန်Singaporeမသေကောင်းမပျောက်ကောင်းမှုန်မှုန်မွှားမွှား";

console.log("\nTest input", imagineTestWord);
console.log("Test output", mSegmenter.word_segment(imagineTestWord));

// Actually the method `word_segment` also work with sentences thanks to is syllable regex.
// `word_segment_sentence` is added for other languages
console.log(
  "\nTest sentence output",
  mSegmenter.word_segment_sentence(imagineTestWord + " " + imagineTestWord)
);

/* 
[
  '123',
  'ညီအစ်ကိုမသိတသိအချိန်',
  'ညီအစ်ကိုမသိတသိအချိန်',
  'Singapore',
  'မသေကောင်းမပျောက်ကောင်း',
  'မှုန်မှုန်မွှားမွှား'
]
*/

// const syllables = mSegmenter.syllable_segment(imagineTestWord);
// console.log("syllables", syllables);
