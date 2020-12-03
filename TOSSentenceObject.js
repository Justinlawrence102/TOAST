function TOSSentence(sentence, isHighlight, phraseID, phrase, UIType, imageName, sourceURL, confidence) {
    this.sentence = sentence;
    this.isHighlight =  isHighlight;
    this.phraseID = phraseID;
    this.phrase = phrase;
    this.UIType = UIType;
    this.imageName = imageName;
    this.sourceURL = sourceURL;
    this.confidence = confidence;
  }

module.exports = TOSSentence;
