function TOSSentence(sentence, isHighlight, phraseID, phrase, UIType, imageName, sourceURL, confidence, phraseTitle) {
    this.sentence = sentence;
    this.isHighlight =  isHighlight;
    this.phraseID = phraseID;
    this.phraseTitle = phraseTitle;
    this.phrase = phrase;
    this.UIType = UIType;
    this.imageName = imageName;
    this.sourceURL = sourceURL;
    this.confidence = confidence;
  }

module.exports = TOSSentence;
