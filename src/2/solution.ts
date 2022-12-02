import add from "utils/add"
import { circularLinkedList, CircularLinkedListNode } from "utils/linkedLists"

enum Hand {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const [rock, paper, scissors] = circularLinkedList([
  Hand.Rock,
  Hand.Paper,
  Hand.Scissors,
])

const aIdxs = { A: rock, B: paper, C: scissors }
const bIdxs = { X: rock, Y: paper, Z: scissors }

const calculateScore = (
  a: CircularLinkedListNode<Hand>,
  b: CircularLinkedListNode<Hand>,
): number => {
  const winnerScore = a.value === b.value ? 3 : a.next.value === b.value ? 6 : 0
  return winnerScore + b.value
}

const solution1 = (lines: string[]) =>
  lines
    .map((str) => {
      const [a, b] = str.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]
      return calculateScore(aIdxs[a], bIdxs[b])
    })
    .reduce(add)

const solution2 = (lines: string[]) =>
  lines
    .map((str) => {
      const [a, b] = str.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]
      const opponentsHand = aIdxs[a]
      const ourHand =
        b === "X"
          ? opponentsHand.next.next
          : b === "Y"
          ? opponentsHand
          : opponentsHand.next

      return calculateScore(opponentsHand, ourHand)
    })
    .reduce(add)

export default [solution1, solution2]
