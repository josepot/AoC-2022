import graphDistinctSearch from "utils/graphDistinctSearch"

const solution1 = (lines: string[]) => {
  let current = ""
  let target = ""

  const positions = new Map<string, number>()
  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      const id = `${y},${x}`
      if (char === "S") {
        current = id
        return positions.set(id, 0)
      }
      if (char === "E") {
        target = id
        return positions.set(id, 25)
      }
      positions.set(id, char.charCodeAt(0) - 97)
    })
  })

  return graphDistinctSearch(
    {
      id: current,
      nSteps: 0,
    },
    (current) => {
      if (current.id === target) return true

      const [y, x] = current.id.split(",").map(Number)
      const nSteps = current.nSteps + 1
      const currentHeight = positions.get(current.id)!
      const deltas: Array<[number, number]> = [
        [1, 0],
        [-1, 0],
        [0, -1],
        [0, 1],
      ]

      const result = deltas
        .map(([yD, xD]) => `${y + yD},${x + xD}`)
        .filter((id) => {
          if (!positions.has(id)) return false
          return positions.get(id)! <= currentHeight + 1
        })
        .map((id) => ({ id, nSteps }))
      return result
    },
    (a, b) => b.nSteps - a.nSteps,
  ).nSteps
}

const solution2 = (lines: string[]) => {}

export default [solution1]
