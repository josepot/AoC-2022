import add from "utils/add"

const groupAndAdd = (lines: string[]) => {
  const result: number[] = []
  let current = 0
  lines.forEach((line) => {
    if (line === "") {
      result.push(current)
      current = 0
    } else {
      current += Number(line)
    }
  })
  if (current) result.push(current)
  return result
}

const solution1 = (lines: string[]) =>
  groupAndAdd(lines).reduce((a, b) => (a > b ? a : b))

const solution2 = (lines: string[]) =>
  groupAndAdd(lines)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(add)

export default [solution1, solution2]
