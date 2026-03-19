export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-accent-blue/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-accent-blue rounded-full animate-spin"></div>
      </div>
      <p className="mt-8 text-accent-blue font-bold uppercase tracking-[0.3em] text-xs animate-pulse">
        Loading Frequency...
      </p>
    </div>
  )
}
