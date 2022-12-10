const solution1 = (lines: string[]) => {
  let currentCycle = 1
  let register = 1
  let targets = [20, 60, 100, 140, 180, 220]
  let currentTargetIdx = 0
  let result = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === "noop") {
      currentCycle++
      if (currentCycle === targets[currentTargetIdx]) {
        result += currentCycle * register
        currentTargetIdx++
      }
    } else {
      currentCycle += 2
      if (targets[currentTargetIdx] < currentCycle) {
        result += targets[currentTargetIdx] * register
        currentTargetIdx++
      }
      register += Number(line.split(" ")[1])
      if (currentCycle === targets[currentTargetIdx]) {
        result += currentCycle * register
        currentTargetIdx++
      }
    }
    if (currentTargetIdx === targets.length) return result
  }
}

const solution2 = (lines: string[]) => {
  const pixels = new Set<number>()
  let currentCycle = 0
  let spriteIdx = 0

  const addPixel = () => {
    const target = currentCycle % 40
    if (target >= spriteIdx && target < spriteIdx + 3) pixels.add(currentCycle)
  }

  lines.forEach((line) => {
    if (line === "noop") {
      addPixel()
      currentCycle++
    } else {
      addPixel()
      currentCycle++
      addPixel()
      currentCycle++
      spriteIdx += Number(line.split(" ")[1])
    }
  })

  const result = Array(6)
    .fill(null)
    .map((_, y) =>
      Array(40)
        .fill(null)
        .map((_, x) => (pixels.has(y * 40 + x) ? "#" : " "))
        .join(""),
    )
    .join("\n")

  return result
}

export default [solution1, solution2]
