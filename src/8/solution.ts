import { readGrid } from "utils/readGrid"

const solution1 = (lines: string[]) => {
  const grid = readGrid(lines, Number)

  const visible = new Set<string>()

  for (let y = 0; y < grid.N_ROWS; y++) {
    visible.add(`0-${y}`)
    visible.add(`${grid.N_COLS - 1}-${y}`)
  }

  for (let x = 0; x < grid.N_COLS; x++) {
    visible.add(`${x}-0`)
    visible.add(`${x}-${grid.N_ROWS - 1}`)
  }

  for (let y = 0; y < grid.N_ROWS; y++) {
    let max = grid.getCell(0, y)
    for (let x = 1; x < grid.N_COLS; x++) {
      if (grid.getCell(x, y) > max) {
        visible.add(`${x}-${y}`)
        max = grid.getCell(x, y)
      }
    }

    max = grid.getCell(grid.N_COLS - 1, y)
    for (let x = grid.N_COLS - 1; x >= 0; x--) {
      if (grid.getCell(x, y) > max) {
        visible.add(`${x}-${y}`)
        max = grid.getCell(x, y)
      }
    }
  }

  for (let x = 0; x < grid.N_COLS; x++) {
    let max = grid.getCell(x, 0)
    for (let y = 1; y < grid.N_ROWS; y++) {
      if (grid.getCell(x, y) > max) {
        visible.add(`${x}-${y}`)
        max = grid.getCell(x, y)
      }
    }

    max = grid.getCell(x, grid.N_ROWS - 1)
    for (let y = grid.N_ROWS - 1; y >= 0; y--) {
      if (grid.getCell(x, y) > max) {
        visible.add(`${x}-${y}`)
        max = grid.getCell(x, y)
      }
    }
  }

  return visible.size
}

const solution2 = (lines: string[]) => {
  const grid = readGrid(lines, Number)
  let best = 0

  grid.map((current, x, y) => {
    if (x === 0 || y === 0 || x === grid.N_COLS - 1 || y === grid.N_ROWS - 1)
      return 0

    let result = 1

    let nVisible = 1
    let xx = x - 1
    while (xx > 0 && grid.getCell(xx, y) < current) {
      nVisible++
      xx--
    }
    result *= nVisible

    nVisible = 1
    xx = x + 1
    while (xx < grid.N_COLS - 1 && grid.getCell(xx, y) < current) {
      nVisible++
      xx++
    }
    result *= nVisible

    nVisible = 1
    let yy = y - 1
    while (yy > 0 && grid.getCell(x, yy) < current) {
      nVisible++
      yy--
    }
    result *= nVisible

    nVisible = 1
    yy = y + 1
    while (yy < grid.N_ROWS - 1 && grid.getCell(x, yy) < current) {
      nVisible++
      yy++
    }
    result *= nVisible

    if (result > best) {
      best = result
    }

    return result
  })

  return best
}

export default [solution1, solution2]
