import {
  doubleCircularLinkedList,
  DoubleLinkedListNode,
} from "utils/linkedLists"

const solution1 = (lines: string[]) => {
  const items = doubleCircularLinkedList(lines.map(Number))

  let zero: DoubleLinkedListNode<number> = {} as any
  for (let i = 0; i < items.length; i++) {
    let current = items[i]
    if (current.value === 0) zero = current

    const diff = current.value > 0 ? 1 : -1
    const val = current.value % (items.length - 1)

    for (let z = 0; z !== val; z += diff) {
      if (diff > 0) {
        current.prev!.next = current.next
        current.next!.prev = current.prev

        const prev = current.next!
        const next = current.next!.next!

        prev.next = current
        next.prev = current
        current.prev = prev
        current.next = next
      } else {
        current.prev!.next = current.next
        current.next!.prev = current.prev

        const next = current.prev!
        const prev = current.prev!.prev!

        prev.next = current
        next.prev = current
        current.prev = prev
        current.next = next
      }
    }
  }

  let result = 0
  let current = zero

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  return result
}

const solution2 = (lines: string[]) => {
  const items = doubleCircularLinkedList(lines.map(Number))
  console.log(items.length)
  items.forEach((item) => {
    item.value *= 811589153
  })

  let zero: DoubleLinkedListNode<number> = {} as any
  for (let xx = 0; xx < 10; xx++) {
    for (let i = 0; i < items.length; i++) {
      let current = items[i]
      if (current.value === 0) zero = current

      const diff = current.value > 0 ? 1 : -1
      const val = current.value % (items.length - 1)

      for (let z = 0; z !== val; z += diff) {
        if (diff > 0) {
          current.prev!.next = current.next
          current.next!.prev = current.prev

          const prev = current.next!
          const next = current.next!.next!

          prev.next = current
          next.prev = current
          current.prev = prev
          current.next = next
        } else {
          current.prev!.next = current.next
          current.next!.prev = current.prev

          const next = current.prev!
          const prev = current.prev!.prev!

          prev.next = current
          next.prev = current
          current.prev = prev
          current.next = next
        }
      }
    }
  }

  let result = 0
  let current = zero

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  for (let i = 0; i < 1000; i++) current = current.next!
  result += current.value

  return result
}

export default [solution1]
