const solution = (nChars: number) => (line: string) => {
  const uniq = new Set<string>()

  for (let i = nChars; i <= line.length; i++) {
    for (let z = i - nChars; z < i; z++) {
      const char = line[z]
      if (uniq.has(char)) break
      uniq.add(char)
    }
    if (uniq.size === nChars) return i
    uniq.clear()
  }

  return Infinity
}

export default [solution(4), solution(14)]
