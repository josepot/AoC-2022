const parseLine = (line: string) => {
  const [part1, part2] = line
    .split(",")
    .map((rawPart) => rawPart.split("-").map(Number)) as [
    [number, number],
    [number, number],
  ]
  return [part1, part2]
}

const doesOverlap = (part1: [number, number], part2: [number, number]) => {
  return (
    (part2[0] >= part1[0] && part2[1] <= part1[1]) ||
    (part1[0] >= part2[0] && part1[1] <= part2[1])
  )
}

const doesPartialOverlap = (
  part1: [number, number],
  part2: [number, number],
) => {
  return part2[1] >= part1[0] && part2[0] <= part1[1]
}

const solution1 = (lines: string[]) =>
  lines
    .map(parseLine)
    .map((x) => doesOverlap(x[0], x[1]))
    .filter(Boolean).length

const solution2 = (lines: string[]) =>
  lines
    .map(parseLine)
    .map((x) => doesPartialOverlap(x[0], x[1]))
    .filter(Boolean).length

export default [solution1, solution2]
