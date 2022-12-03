import add from "utils/add"

const getEffortNumber = (char: string) => {
  const code = char.charCodeAt(0)
  return code > 96 ? code - 96 : code - 38
}

const solveLine = (line: string): number => {
  const letters = new Set<string>(line.slice(0, line.length / 2).split(""))

  for (let i = line.length / 2; i < line.length; i++) {
    const char = line[i]
    if (letters.has(char)) return getEffortNumber(char)
  }

  return NaN
}

const solution1 = (lines: string[]) => lines.map(solveLine).reduce(add)

const solveLines = (lines: string[], groupNumber: number): number => {
  const startAt = groupNumber * 3
  const firstOnes = new Set<string>(lines[startAt].split(""))
  const secondOnes = new Set<string>(lines[startAt + 1].split(""))

  const thirdLine = lines[startAt + 2]
  const len = thirdLine.length
  for (let i = 0; i < len; i++) {
    const char = thirdLine[i]
    if (firstOnes.has(char) && secondOnes.has(char))
      return getEffortNumber(char)
  }

  return NaN
}

const solution2 = (lines: string[]) => {
  const nGroups = lines.length / 3
  let result = 0
  for (let i = 0; i < nGroups; i++) result += solveLines(lines, i)
  return result
}

export default [solution1, solution2]
