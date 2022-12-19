import { queueScheduler } from "rxjs"
import add from "utils/add"
import Stack from "utils/Stack"

const deltas: Array<[number, number, number]> = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

const solution1 = (lines: string[]) => {
  const cubes = new Map<string, string[]>()

  const getNeighbours = (cube: [number, number, number]) => {
    return deltas
      .map((delta) => delta.map((x, idx) => cube[idx] + x).join(","))
      .filter((id) => cubes.has(id))
  }

  lines.forEach((line) => {
    const cube = line.split(",").map(Number) as [number, number, number]

    const neighbours = getNeighbours(cube)

    cubes.set(line, neighbours)

    neighbours.forEach((x) => {
      cubes.get(x)!.push(line)
    })
  })

  return [...cubes.values()].map((x) => 6 - x.length).reduce(add)
}

const solution2 = (lines: string[]) => {
  const solid = new Set(lines)
  const air = new Set<string>()

  const limits: [[number, number], [number, number], [number, number]] = [
    [Infinity, -Infinity],
    [Infinity, -Infinity],
    [Infinity, -Infinity],
  ]

  const getSolidNeighbours = (
    cube: [number, number, number],
  ): Array<string> => {
    return deltas
      .map((delta) => delta.map((x, idx) => cube[idx] + x).join(","))
      .filter((id) => solid.has(id))
  }

  const solidPositions = lines.map(
    (line) => line.split(",").map(Number) as [number, number, number],
  )

  solidPositions.forEach((position) => {
    for (let i = 0; i < 3; i++) {
      if (position[i] < limits[i][0]) limits[i][0] = position[i]
      if (position[i] > limits[i][1]) limits[i][1] = position[i]
    }
  })

  const queue = new Stack<[number, number, number]>()
  const initialAir = [limits[0][0] - 1, limits[1][0] - 1, limits[2][0] - 1] as [
    number,
    number,
    number,
  ]
  queue.push(initialAir)
  air.add(initialAir.join(","))

  while (queue.peek()) {
    const from = queue.pop()!

    deltas
      .map((delta) => {
        const newPosition = delta.map((x, idx) => from[idx] + x) as [
          number,
          number,
          number,
        ]
        const id = newPosition.join(",")

        return { id, position: newPosition }
      })
      .filter(
        ({ id, position }) =>
          position[0] >= limits[0][0] - 1 &&
          position[0] <= limits[0][1] + 1 &&
          position[1] >= limits[1][0] - 1 &&
          position[1] <= limits[1][1] + 1 &&
          position[2] >= limits[2][0] - 1 &&
          position[2] <= limits[2][1] + 1 &&
          !air.has(id) &&
          !solid.has(id),
      )
      .forEach((x) => {
        air.add(x.id)
        queue.push(x.position)
      })
  }

  return [...air]
    .map((id) => id.split(",").map(Number) as [number, number, number])
    .map((x) => getSolidNeighbours(x).length)
    .reduce(add)
}

export default [solution1, solution2]
