const { match } = require('assert');
const fs = require('fs')
const readline = require('readline');
let wanakana = require('wanakana')

var status = ""
var matchedSentences = []
var ctr;
const file = fs.readFileSync('pairs.tsv', 'utf8')
var list = file.split('\r\n');

var map = new Map();

//create hash map - [kanji: arrayOfMatchingIndexes]
list.forEach((line, lineIndex) => {
    line.split('').forEach(char => {
        if (wanakana.isKanji(char)) {

            var lineSet = map.get(char) || [];
            lineSet.push(lineIndex);
            map.set(char, lineSet);
        }
    });

});


module.exports = {

    test: (kanjis) => {
        sentenceChars = kanjis.split('')
        matchedSentences = getSentences(sentenceChars)

        //grab one random sentence from the list of matched ones
        //format that random sentence
        randomVal = getRandomInt(0, matchedSentences.length)
        randomSentence = matchedSentences[randomVal]
        formattedSentence = formatSentence(randomSentence)
        
        function getSentences(userList) {
            var matchingSentences = [];
            userList.forEach(char => {
                var sentenceIdxArr = map.get(char);
                sentenceIdxArr.forEach(idx => {
                    var line = list[idx];

                    if (containsOnlyUserChars(getKanji(line), userList)) {
                        matchingSentences.push(list[idx]);
                    }
        
                });
            });
            return matchingSentences;
        }

        function formatSentence(sentence) {
            return sentence.replace(/[0-9]/g, '');
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }


        function getKanji(sentenceChars) {
            var kanjiList = []
            for (let x in sentenceChars) {
                if (wanakana.isKanji(sentenceChars[x])) {
                    kanjiList.push(sentenceChars[x])
                }
            }
            return kanjiList
        }

        function containsOnlyUserChars(kanji, userChars) {
            return kanji.every( k => userChars.includes(k) );
        }

        //checks if sentence had any kanji in it
        function containsKanji(kanji, userChars) {
            for (z = 0; z < kanji.length; z++) {
                if (userChars.includes(kanji[z])) {
                    return true
                }
            }
        }

        //reset 
        randomVal = 0;
        matchedSentences = []

        const splitSentence = formattedSentence.split('\t').filter(x => !!x)
        return {
            japanese: splitSentence[0],
            english: splitSentence[1]
        } 
    }
}