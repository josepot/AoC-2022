type Nested = Array<Nested> | Array<number> | number

const parseLine = (line: string): Nested => {
  return JSON.parse(line)
}

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

  if (typeof a === "number") return compareNested([a], b)
  return compareNested(a, [b])
}

const solution1 = (lines: string[]) => {
  let idx = 0
  let result = 0
  while (idx < lines.length) {
    if (compareNested(parseLine(lines[idx]), parseLine(lines[idx + 1]))) {
      result += idx / 3 + 1
    }
    idx += 3
  }
  return result
}

const solution2 = (lines: string[]) => {
  const sorted: Array<Nested> = []
  let idx = 0

  while (idx < lines.length) {
    sorted.push(parseLine(lines[idx]))
    sorted.push(parseLine(lines[idx + 1]))
    idx += 3
  }
  const a = [[2]]
  const b = [[6]]
  sorted.push(a)
  sorted.push(b)

  sorted.sort((a, b) => (compareNested(a, b) ? -1 : 1))

  let result = 1

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === a || sorted[i] === b) {
      if (result > 1) {
        return result * (i + 1)
      }
      result = i + 1
    }
  }

  return result
}

export default [solution1, solution2]
