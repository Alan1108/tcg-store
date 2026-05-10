export default function Loading() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 flex flex-col gap-8 animate-pulse">
      {/* Hero banner skeleton */}
      <div className="h-[220px] md:h-[320px] rounded-2xl bg-bg-elevated" />

      {/* Game grid skeleton */}
      <div className="flex gap-4">
        <div className="flex-1 h-[180px] rounded-xl bg-bg-elevated" />
        <div className="flex-1 h-[180px] rounded-xl bg-bg-elevated" />
      </div>

      {/* Carousel skeleton */}
      <div className="flex flex-col gap-3">
        <div className="h-5 w-40 rounded bg-bg-elevated" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[175px] h-[260px] rounded-xl bg-bg-elevated shrink-0" />
          ))}
        </div>
      </div>
    </div>
  )
}
