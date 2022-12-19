import add from "utils/add"
import graphSearch from "utils/graphSearch"

enum Material {
  Ore = "ore",
  Clay = "clay",
  Obsidian = "obsidian",
  Geode = "geode",
}

interface Cost {
  type: Material
  quantity: number
}

interface Blueprint {
  id: number
  costs: Record<Material, Array<Cost>>
  maxCosts: Record<Material, number>
}

interface State {
  blueprint: Blueprint
  minute: number
  materials: Record<Material, number>
  robots: Record<Material, number>
  avoid: Set<Material>
}

const materials: Record<string, Material> = {
  ore: Material.Ore,
  clay: Material.Clay,
  obsidian: Material.Obsidian,
  geode: Material.Geode,
}

const parseBluePrint = (line: string): Blueprint => {
  const [idRaw, costsRaw] = line.split(": ")
  const id = Number(idRaw.slice(10))
  const costs: Record<Material, Array<Cost>> = {} as any

  costsRaw.split(". ").forEach((costRaw: string) => {
    let [part1Raw, part2Raw] = costRaw.slice(5).split(" costs ")
    const material = materials[part1Raw.split(" ")[0]]

    costs[material] = []

    part2Raw = part2Raw.endsWith(".") ? part2Raw.slice(0, -1) : part2Raw
    costs[material] = part2Raw.split(" and ").map((x) => {
      const [amountRaw, materialRaw] = x.split(" ")
      return { type: materials[materialRaw], quantity: Number(amountRaw) }
    })
  })

  const maxCosts: Record<Material, number> = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
  }

  Object.values(costs).forEach((needed) => {
    needed.forEach((x) => {
      maxCosts[x.type] = Math.max(maxCosts[x.type], x.quantity)
    })
  })

  return { id, costs, maxCosts }
}

const generatePurchases = (
  blueprint: Blueprint,
  materials: State["materials"],
  robots: State["robots"],
  notPurchase: Set<Material>,
): Array<{
  materials: State["materials"]
  newRobots: Array<Material>
  avoidRobots: Array<Material>
}> => {
  if (blueprint.costs.geode.every((x) => materials[x.type] >= x.quantity)) {
    const nextMaterials = { ...materials }
    blueprint.costs.geode.forEach((x) => {
      nextMaterials[x.type] -= x.quantity
    })

    return [
      {
        materials: nextMaterials,
        newRobots: [Material.Geode],
        avoidRobots: [],
      },
    ]
  }

  /*
  if (
    robots.obsidian < blueprint.maxCosts.obsidian &&
    blueprint.costs.obsidian.every((x) => materials[x.type] >= x.quantity)
  ) {
    const nextMaterials = { ...materials }
    blueprint.costs.obsidian.forEach((x) => {
      nextMaterials[x.type] -= x.quantity
    })

    return [
      {
        materials: nextMaterials,
        newRobots: [Material.Obsidian],
        avoidRobots: [],
      },
    ]
  }
  */

  const result: Array<{
    materials: State["materials"]
    newRobots: Array<Material>
    avoidRobots: Array<Material>
  }> = []
  const otherMaterials = [Material.Obsidian, Material.Clay, Material.Ore]
  const avoidRobots: Array<Material> = [...notPurchase]

  for (let i = 0; i < otherMaterials.length; i++) {
    const material = otherMaterials[i]
    if (
      notPurchase.has(material) ||
      robots[material] >= blueprint.maxCosts[material] ||
      !blueprint.costs[material].every((x) => materials[x.type] >= x.quantity)
    )
      continue

    const nextMaterials = { ...materials }
    blueprint.costs[material].forEach((x) => {
      nextMaterials[x.type] -= x.quantity
    })

    result.push({
      materials: nextMaterials,
      newRobots: [material],
      avoidRobots: [],
    })

    avoidRobots.push(material)
  }

  result.push({
    materials,
    newRobots: [],
    avoidRobots,
  })

  return result
}

const solution1 = (lines: string[]) => {
  const blueprints = lines.map(parseBluePrint)

  return blueprints
    .map((blueprint) => {
      const initialState: State = {
        blueprint,
        minute: 0,
        materials: {
          ore: 0,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
        robots: {
          ore: 1,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
        avoid: new Set(),
      }

      return graphSearch<State>(
        initialState,
        (current) => {
          if (current.minute === 24) return true

          const result = generatePurchases(
            blueprint,
            current.materials,
            current.robots,
            current.avoid,
          ).map((purchases) => {
            const nextMaterials = { ...purchases.materials }
            Object.entries(current.robots).forEach(([material, nRobots]) => {
              nextMaterials[material as Material] += nRobots
            })

            const nextRobots = { ...current.robots }
            purchases.newRobots.forEach((x) => {
              nextRobots[x]++
            })

            return {
              blueprint,
              minute: current.minute + 1,
              materials: nextMaterials,
              robots: nextRobots,
              avoid: new Set(purchases.avoidRobots),
            }
          })

          return result
        },
        (a, b) => {
          if (b.minute !== a.minute) return b.minute - a.minute

          if (a.materials.geode !== b.materials.geode) {
            return a.materials.geode - b.materials.geode
          }

          if (a.materials.obsidian !== b.materials.obsidian) {
            return a.materials.obsidian - b.materials.obsidian
          }
          if (a.materials.clay !== b.materials.clay) {
            return a.materials.clay - b.materials.clay
          }

          return a.materials.ore - b.materials.ore
        },
      )
    })
    .map((x) => {
      console.log(x)
      return x.materials.geode * x.blueprint.id
    })
    .reduce(add)
}

const solution2 = (lines: string[]) => {
  const blueprints = lines.map(parseBluePrint)

  return blueprints
    .slice(0, 3)
    .map((blueprint) => {
      const initialState: State = {
        blueprint,
        minute: 0,
        materials: {
          ore: 0,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
        robots: {
          ore: 1,
          clay: 0,
          obsidian: 0,
          geode: 0,
        },
        avoid: new Set(),
      }

      let lastMin = 0

      return graphSearch<State>(
        initialState,
        (current) => {
          if (current.minute === 32) return true

          if (current.minute !== lastMin) {
            console.log(current.minute)
            lastMin = current.minute
          }

          const result = generatePurchases(
            blueprint,
            current.materials,
            current.robots,
            current.avoid,
          ).map((purchases) => {
            const nextMaterials = { ...purchases.materials }
            Object.entries(current.robots).forEach(([material, nRobots]) => {
              nextMaterials[material as Material] += nRobots
            })

            const nextRobots = { ...current.robots }
            purchases.newRobots.forEach((x) => {
              nextRobots[x]++
            })

            return {
              blueprint,
              minute: current.minute + 1,
              materials: nextMaterials,
              robots: nextRobots,
              avoid: new Set(purchases.avoidRobots),
            }
          })

          return result
        },
        (a, b) => {
          if (b.minute !== a.minute) return b.minute - a.minute

          if (a.materials.geode !== b.materials.geode) {
            return a.materials.geode - b.materials.geode
          }

          if (a.materials.obsidian !== b.materials.obsidian) {
            return a.materials.obsidian - b.materials.obsidian
          }
          if (a.materials.clay !== b.materials.clay) {
            return a.materials.clay - b.materials.clay
          }

          return a.materials.ore - b.materials.ore
        },
      )
    })
    .map((x) => {
      return x.materials.geode
    })
    .reduce((a, b) => a * b)
}

export default [solution1, solution2]
