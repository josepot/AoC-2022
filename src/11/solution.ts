interface Monkey {
  id: number
  items: Array<number>
  operation: (old: number) => number
  destination: (level: number) => number
}

const monkeys: Array<Monkey> = [
  {
    id: 0,
    items: [71, 56, 50, 73],
    operation: (prev) => prev * 11,
    destination: (x) => (x % 13 === 0 ? 1 : 7),
  },
  {
    id: 1,
    items: [70, 89, 82],
    operation: (prev) => prev + 1,
    destination: (x) => (x % 7 === 0 ? 3 : 6),
  },
  {
    id: 2,
    items: [52, 95],
    operation: (prev) => prev * prev,
    destination: (x) => (x % 3 === 0 ? 5 : 4),
  },
  {
    id: 3,
    items: [94, 64, 69, 87, 70],
    operation: (prev) => prev + 2,
    destination: (x) => (x % 19 === 0 ? 2 : 6),
  },
  {
    id: 4,
    items: [98, 72, 98, 53, 97, 51],
    operation: (prev) => prev + 6,
    destination: (x) => (x % 5 === 0 ? 0 : 5),
  },
  {
    id: 5,
    items: [79],
    operation: (prev) => prev + 7,
    destination: (x) => (x % 2 === 0 ? 7 : 0),
  },
  {
    id: 6,
    items: [77, 55, 63, 93, 66, 90, 88, 71],
    operation: (prev) => prev * 7,
    destination: (x) => (x % 11 === 0 ? 2 : 4),
  },
  {
    id: 7,
    items: [54, 97, 87, 70, 59, 82, 59],
    operation: (prev) => prev + 8,
    destination: (x) => (x % 17 === 0 ? 1 : 3),
  },
]

const solution1 = () => {
  const inspections = monkeys.map(() => BigInt(0))
  for (let r = 0; r < 20; r++) {
    monkeys.forEach((monkey, idx) => {
      while (monkey.items.length) {
        const item = monkey.items.shift()!
        inspections[idx]++
        const newScore = Math.floor(monkey.operation(item) / 3)
        monkeys[monkey.destination(newScore)].items.push(newScore)
      }
    })
  }

  const [a, b] = inspections.slice(0).sort((a, b) => Number(b - a))

  return (a * b).toString()
}

const mod = [13, 7, 3, 19, 5, 2, 11, 17].reduce((a, b) => a * b)

const solution2 = () => {
  const inspections = monkeys.map(() => BigInt(0))
  for (let r = 0; r < 10000; r++) {
    monkeys.forEach((monkey, idx) => {
      while (monkey.items.length) {
        const item = monkey.items.shift()!
        inspections[idx]++
        const newScore = monkey.operation(item) % mod
        monkeys[monkey.destination(newScore)].items.push(newScore)
      }
    })
  }

  const [a, b] = inspections.slice(0).sort((a, b) => Number(b - a))

  return (a * b).toString()
}

export default [solution1, solution2]
