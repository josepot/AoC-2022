interface Position {
  x: number
  y: number
}

enum Direction {
  U = "U",
  D = "D",
  L = "L",
  R = "R",
}

const parseLine = (line: string) => {
  const [d, n] = line.split(" ")
  const direction = d as Direction

  return {
    direction,
    n: Number(n),
  }
}

const move = (
  position: Position,
  direction: Direction,
  n: number,
): Position => {
  let delta: Partial<Position> = {}

  if (direction === Direction.D) {
    delta = {
      y: position.y + n,
    }
  } else if (direction === Direction.U) {
    delta = {
      y: position.y - n,
    }
  } else if (direction === Direction.R) {
    delta = {
      x: position.x + n,
    }
  } else {
    delta = {
      x: position.x - n,
    }
  }
  return { ...position, ...delta }
}

const moveNod = (head: Position, tail: Position): Position => {
  const distance = Math.abs(tail.x - head.x) + Math.abs(tail.y - head.y)

  if (
    distance < 2 ||
    (distance === 2 && tail.x !== head.x && head.y !== tail.y)
  )
    return tail

  if (distance === 2) {
    const x =
      head.x === tail.x ? head.x : head.x > tail.x ? head.x - 1 : head.x + 1
    const y =
      head.y === tail.y ? head.y : head.y > tail.y ? head.y - 1 : head.y + 1
    return { x, y }
  }

  if (distance === 3) {
    const x =
      Math.abs(head.x - tail.x) === 1
        ? head.x
        : head.x > tail.x
        ? head.x - 1
        : head.x + 1
    const y =
      Math.abs(head.y - tail.y) === 1
        ? head.y
        : head.y > tail.y
        ? head.y - 1
        : head.y + 1
    return { x, y }
  }

  return {
    x: head.x - tail.x > 0 ? head.x - 1 : head.x + 1,
    y: head.y - tail.y > 0 ? head.y - 1 : head.y + 1,
  }
}

const solution1 = (lines: string[]) => {
  let head: Position = { x: 0, y: 0 }
  let tail: Position = { ...head }
  const visited = new Set<string>()
  visited.add("0-0")

  lines.forEach((line) => {
    const { n, direction } = parseLine(line)
    for (let i = 0; i < n; i++) {
      head = move(head, direction, 1)
      tail = moveNod(head, tail)
      visited.add(`${tail.x}-${tail.y}`)
    }
  })

  return visited.size
}

const solution2 = (lines: string[]) => {
  const nods: Array<Position> = new Array(10)
  for (let i = 0; i < 10; i++) nods[i] = { x: 0, y: 0 }
  const visited = new Set<string>()
  visited.add("0-0")

  lines.forEach((line) => {
    const { n, direction } = parseLine(line)

    for (let i = 0; i < n; i++) {
      nods[0] = move(nods[0], direction, 1)
      for (let z = 1; z < 10; z++) nods[z] = moveNod(nods[z - 1], nods[z])

      visited.add(`${nods[9].x}-${nods[9].y}`)
    }
  })

  return visited.size
}

export default [solution1, solution2]
