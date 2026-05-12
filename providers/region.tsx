"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { Region } from "@/types"
import { sdk } from "@/lib/sdk"

type RegionContextType = {
  region: Region | undefined
}

const RegionContext = createContext<RegionContextType | null>(null)

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region | undefined>()

  useEffect(() => {
    const cached = localStorage.getItem('medusa_region')
    if (cached) {
      try { setRegion(JSON.parse(cached)) } catch { /* ignore corrupt cache */ }
    }

    sdk.store.region.list().then(({ regions }) => {
      if (regions.length > 0) {
        setRegion(regions[0])
        localStorage.setItem('medusa_region', JSON.stringify(regions[0]))
      }
    })
  }, [])

  return (
    <RegionContext.Provider value={{ region }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (!context) throw new Error("useRegion must be used within a RegionProvider")
  return context
}
