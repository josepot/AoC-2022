enum RockOrSand {
  Rock,
  Sand,
}

interface Position {
  id: string
  x: number
  y: number
}

const idToPosition = (id: string) => {
  const [x, y] = id.split(",").map(Number)
  return {
    x,
    y,
    id,
  }
}

const lineToPositions = (line: string) => line.split(" -> ").map(idToPosition)

const solution1 = (lines: string[]) => {
  const map = new Map<string, RockOrSand>()

  lines.map(lineToPositions).forEach((positions) => {
    for (let idx = 1; idx < positions.length; idx++) {
      if (positions[idx - 1].x === positions[idx].x) {
        const x = positions[idx].x
        const delta = positions[idx].y > positions[idx - 1].y ? 1 : -1
        let y = positions[idx - 1].y
        do {
          map.set(`${x},${y}`, RockOrSand.Rock)
          y += delta
        } while (y !== positions[idx].y)
        map.set(`${x},${y}`, RockOrSand.Rock)
      } else {
        const y = positions[idx].y
        const delta = positions[idx].x > positions[idx - 1].x ? 1 : -1
        let x = positions[idx - 1].x
        do {
          map.set(`${x},${y}`, RockOrSand.Rock)
          x += delta
        } while (x !== positions[idx].x)
        map.set(`${x},${y}`, RockOrSand.Rock)
      }
    }
  })

  const maxY = Math.max(...[...map.keys()].map(idToPosition).map((p) => p.y))

  const dropSand = (): boolean => {
    let sand: Position = {
      id: `500,0`,
      x: 500,
      y: 0,
    }

    do {
      while (sand.y < maxY && !map.has(`${sand.x},${sand.y + 1}`)) {
        sand.y++
      }

      if (sand.y === maxY) return true

      if (!map.has(`${sand.x - 1},${sand.y + 1}`)) {
        sand.x--
        sand.y++
        continue
      }

      if (!map.has(`${sand.x + 1},${sand.y + 1}`)) {
        sand.x++
        sand.y++
        continue
      }
      map.set(`${sand.x},${sand.y}`, RockOrSand.Sand)
      break
    } while (true)

    return false
  }

  while (!dropSand()) {}
  return [...map.values()].filter((p) => p === RockOrSand.Sand).length
}

const solution2 = (lines: string[]) => {}

export default [solution1]
