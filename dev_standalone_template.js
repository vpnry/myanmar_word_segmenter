/**
 * Simple Word Segmenter
 * https://github.com/vpnry/myanmar_word_segmenter
 * File: MyWordSegmenter.js
 */

class MyWordSegmenter {
  /**
   * The MY_SYLLABLE_REGEX and method syllable_segment are adapted from
   * https://github.com/swanhtet1992/ReSegment/blob/master/Javascript/resegment.js
   */

  constructor() {
    this.puncSpecialChars = "…‘’!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "။၊";
    this.puncRegex = new RegExp(
      `^[${this.puncSpecialChars}]+|[${this.puncSpecialChars}]+$`,
      "g"
    );

    // The regular expression for syllable segmentation
    this.MY_SYLLABLE_REGEX =
      /(?:(?<!\u1039)([\u1000-\u102A\u103F\u104A-\u104F]|[\u1040-\u1049]+|[^\u1000-\u104F]+)(?![\u103E\u103B]?[\u1039\u103A\u1037]))/g;

    // Load all the words from the file into a Set
    this.MYWORDS = `a_Set_of_word_list_here`;
  }

  syllable_segment(text) {
    /**
     * @author Chan Mrate Ko Ko
     */
    var outArray = text.replace(this.MY_SYLLABLE_REGEX, "𝕊$1").split("𝕊");
    if (outArray.length > 0) {
      outArray.shift();
    }
    return outArray;
  }

  word_segment(word) {
    if (this.MYWORDS.has(word)) {
      return [word];
    }
    return this.theSegmenter(word);
  }

  word_segment_sentence(sentence) {
    let words = sentence.split(/\s+/);
    let segmentedWords = [];

    for (let word of words) {
      segmentedWords.push(...this.word_segment(word));
    }

    return segmentedWords;
  }

  theSegmenter(text) {
    text = text.trim();
    let syllables = this.syllable_segment(text);

    // filter punctuation, whitespace
    syllables = syllables
      .filter(
        (element) => element.replace(this.puncRegex, "").trim().length > 0
      )
      .map((element) => element.trim());

    // Split the word into its constituent syllables and look them up in the loaded words set
    let wordList = [];
    let i = 0;
    while (i < syllables.length) {
      for (let j = syllables.length; j > i; j--) {
        let word = syllables.slice(i, j).join("");
        if (this.MYWORDS.has(word)) {
          wordList.push(word);
          i = j;
          break;
        } else {
          if (j === i + 1) {
            let s = syllables[i];
            wordList.push(s);
            i++;
          }
        }
      }
    }
    return wordList;
  }
}

module.exports = MyWordSegmenter;
