import Stack from "utils/Stack"

const parseMove = (line: string) => {
  const [, n, , from, , to] = line.split(" ").map(Number)
  return { n, from: from - 1, to: to - 1 }
}

const parseLines = (lines: string[]) => {
  const emptyLineIdx = lines.findIndex((x) => !x)
  const stacks: Array<Stack<string>> = new Array(9)
  for (let i = 0; i < 9; i++) stacks[i] = new Stack()

  for (let i = emptyLineIdx - 2; i > -1; i--) {
    const line = lines[i]
    for (let c = 0; c < 9; c++) {
      const char = line[c * 4 + 1]
      if (char !== " ") stacks[c].push(char)
    }
  }

  return { stacks, moves: lines.slice(emptyLineIdx + 1).map(parseMove) }
}

const solution1 = (lines: string[]) => {
  const { stacks, moves } = parseLines(lines)

  moves.forEach(({ n, from, to }) => {
    for (let i = 0; i < n; i++) stacks[to].push(stacks[from].pop()!)
  })

  return stacks.map((s) => s.peek()).join("")
}

const solution2 = (lines: string[]) => {
  const { stacks, moves } = parseLines(lines)

  moves.forEach(({ n, from, to }) => {
    const tmpStack = new Stack<string>()
    for (let i = 0; i < n; i++) tmpStack.push(stacks[from].pop()!)
    while (tmpStack.peek()) stacks[to].push(tmpStack.pop()!)
  })

  return stacks.map((s) => s.peek()).join("")
}

export default [solution1, solution2]
