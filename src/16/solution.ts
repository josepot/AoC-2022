import graphSearch from "utils/graphSearch"

interface Node {
  id: string
  flowRate: number
  connections: Array<string>
}

interface SearchNode {
  timeLeft: number
  total: number
  current: string
  open: Set<string>
  visisted: Map<string, string>
}

const solution1 = (lines: string[]) => {
  const nodes = new Map<string, Node>()

  lines.forEach((line) => {
    const [, from, flow, to] = line.match(
      /^Valve\s(\w\w)\shas\sflow\srate=(\d*);\stunnels?\sleads?\sto\svalves?\s(.*)/,
    )!
    nodes.set(from, {
      id: from,
      flowRate: Number(flow),
      connections: to.split(", "),
    })
  })

  return graphSearch<SearchNode>(
    {
      timeLeft: 30,
      total: 0,
      current: "AA",
      open: new Set(),
      visisted: new Map([["AA", ""]]),
    },
    (current) => {
      if (current.timeLeft === 0) return true
      const result: SearchNode[] = []
      const timeLeft = current.timeLeft - 1
      const currentNode = nodes.get(current.current)!
      if (currentNode.flowRate > 0 && !current.open.has(current.current)) {
        const state = [...current.open, current.current].sort()
        result.push({
          timeLeft,
          total: current.total + currentNode.flowRate * timeLeft,
          current: current.current,
          open: new Set(state),
          visisted: new Map([
            ...current.visisted,
            [current.current, state.join()],
          ]),
        })
      }
      const state = current.visisted.get(current.current)!
      currentNode.connections.forEach((id) => {
        if (current.visisted.get(id) === state) return
        result.push({
          timeLeft,
          total: current.total,
          current: id,
          open: current.open,
          visisted: new Map([...current.visisted, [id, state]]),
        })
      })
      return result.length > 0
        ? result
        : [
            {
              ...current,
              timeLeft,
            },
          ]
    },
    (a, b) => {
      if (a.timeLeft === b.timeLeft) {
        return a.total - b.total
      }
      return a.timeLeft - b.timeLeft
    },
  ).total
}

const solution2 = (lines: string[]) => {}

export default [solution1]
