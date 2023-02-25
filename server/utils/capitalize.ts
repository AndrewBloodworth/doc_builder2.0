export default (word: string): string => {
  const [firstLetter, ...remainingLetters] = word;

  return (
    firstLetter.toUpperCase() +
    remainingLetters.map((letter) => letter.toLowerCase()).join("")
  );
};
