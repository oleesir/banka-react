function camelCaseToSentence(word) {
  /* add space between strings by replacing capital
    letters with a space before them and the letter itself */
  const spacedString = word.replace(/([A-Z])/g,' $1');

  // convert first character to uppercase and join it to the final string
  return `${spacedString.charAt(0).toUpperCase()}${spacedString.slice(1)}`;
}

export default camelCaseToSentence;
