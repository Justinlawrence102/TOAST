
function TOSSentence(sentence, isHighlight, phraseID, phrase, UIType, imageName, confidence) {
    this.sentence = sentence;
    this.isHighlight =  isHighlight;
    this.phraseID = phraseID;
    this.phrase = phrase;
    this.UIType = UIType;
    this.imageName = imageName;
    this.confidence = confidence;
    
    this.getDetails = function() {
        console.log("Initial Sentence: "+this.sentence)
        if (this.isHighlight) {
            console.log("TOAST translation("+this.confidence+"): "+ this.phrase)
        }
        else {
            console.log("Not translated!")
        }
        console.log("\n")
    };
  };

module.exports = TOSSentence;
