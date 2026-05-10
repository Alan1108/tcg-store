export default function Loading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Breadcrumb */}
      <div className="px-4 py-3">
        <div className="h-3 w-48 rounded bg-bg-elevated" />
      </div>

      {/* Image */}
      <div className="w-full h-[300px] md:h-[390px] bg-bg-elevated" />

      <div className="max-w-[1280px] mx-auto w-full px-4 flex flex-col gap-3 py-4">
        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded bg-bg-elevated" />
          <div className="h-5 w-20 rounded bg-bg-elevated" />
        </div>
        {/* Title */}
        <div className="h-7 w-3/4 rounded bg-bg-elevated" />
        {/* Subtitle */}
        <div className="h-4 w-1/2 rounded bg-bg-elevated" />
        {/* Price */}
        <div className="h-9 w-28 rounded bg-bg-elevated" />
        {/* Buttons */}
        <div className="h-11 w-full rounded-lg bg-bg-elevated" />
        <div className="h-11 w-full rounded-lg bg-bg-elevated" />
      </div>
    </div>
  )
}
