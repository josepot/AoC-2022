import add from "utils/add"

interface File {
  name: string
  size: number
}

interface Folder {
  name: string
  files: Array<File>
  parent: Folder | null
  children: Map<string, Folder>
  totalSize: number
}

const ls = (lines: string[], idx: number, current: Folder): number => {
  while (idx < lines.length && !lines[idx].startsWith("$")) {
    const line = lines[idx++]
    if (line.startsWith("dir")) {
      const [, dirName] = line.split(" ")
      const folder: Folder = {
        name: dirName,
        files: [],
        parent: current,
        children: new Map(),
        totalSize: 0,
      }
      current.children.set(dirName, folder)
    } else {
      const [rawSize, fileName] = line.split(" ")
      const size = Number(rawSize)
      current.files.push({ name: fileName, size })
      let tmp: Folder | null = current
      while (tmp) {
        tmp.totalSize += size
        tmp = tmp.parent
      }
    }
  }

  return idx
}

const parseLines = (lines: string[]): Folder => {
  const root: Folder = {
    name: "/",
    files: [],
    parent: null as any,
    children: new Map(),
    totalSize: 0,
  }

  let current: Folder = root

  let idx = 0

  while (idx < lines.length) {
    const line = lines[idx++]
    if (line.startsWith("$ cd")) {
      const [, , target] = line.split(" ")
      if (target === "/") {
        current = root
      } else if (target === "..") {
        current = current.parent!
      } else {
        current = current.children.get(target)!
      }
    } else {
      idx = ls(lines, idx, current)
    }
  }
  return root
}

const count = (folder: Folder): number =>
  (folder.totalSize >= 100_000 ? 0 : folder.totalSize) +
  [...folder.children.values()].map(count).reduce(add, 0)

const solution1 = (lines: string[]) => count(parseLines(lines))

const findSmallest = (missing: number, folder: Folder, best: Folder): Folder =>
  folder.totalSize < missing || folder.totalSize > best.totalSize
    ? best
    : [...folder.children.values()]
        .map((inner) => findSmallest(missing, inner, best))
        .reduce((a, b) => (b.totalSize < a.totalSize ? b : a), folder)

const solution2 = (lines: string[]) => {
  const root = parseLines(lines)

  const left = 70000000 - root.totalSize
  const missing = 30000000 - left

  return findSmallest(missing, root, root).totalSize
}

export default [solution1, solution2]
