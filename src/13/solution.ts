type Nested = Array<Nested> | Array<number> | number

const parseLine = (line: string): Nested => JSON.parse(line)

const compareNested = (a: Nested, b: Nested): boolean | null => {
  if (typeof a === "number" && typeof b === "number") {
    if (a < b) return true
    if (a > b) return false
    return null
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length === 0) {
      return b.length > 0 ? true : null
    }
    if (b.length === 0) return false

    const result = compareNested(a[0], b[0])
    return result === null ? compareNested(a.slice(1), b.slice(1)) : result
  }

  return typeof a === "number" ? compareNested([a], b) : compareNested(a, [b])
}

const solution1 = (lines: string[]) => {
  let result = 0
  for (let idx = 0; idx < lines.length; idx += 3) {
    if (compareNested(parseLine(lines[idx]), parseLine(lines[idx + 1])))
      result += idx / 3 + 1
  }
  return result
}

const solution2 = (lines: string[]) => {
  const a = [[2]]
  const b = [[6]]

  const sorted: Array<Nested> = [a, b]
  for (let idx = 0; idx < lines.length; idx += 3) {
    sorted.push(parseLine(lines[idx]))
    sorted.push(parseLine(lines[idx + 1]))
  }
  sorted.sort((a, b) => (compareNested(a, b) ? -1 : 1))

  return (sorted.indexOf(a) + 1) * (sorted.indexOf(b) + 1)
}

export default [solution1, solution2]
