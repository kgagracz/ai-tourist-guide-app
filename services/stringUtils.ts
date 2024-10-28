export const capitalizeFirstLetterOfEachWord = (input: string): string => input
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

export const prepareDifferentLetterCaseExamples = (name: string) => {
  const lowerCase = name.toLowerCase()
  const upperCase = name.toUpperCase()
  const capitalized = capitalizeFirstLetterOfEachWord(name)
  return [lowerCase, upperCase, capitalized].join('|')
}
