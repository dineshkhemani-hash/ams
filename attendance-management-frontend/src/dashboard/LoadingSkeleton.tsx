// components/LoadingSkeleton.tsx
export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {/* Search Input Skeleton */}
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md w-full max-w-xs" />

    {/* Table Header */}
    <div className="grid grid-cols-4 gap-4 mb-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md" />
      ))}
    </div>

    {/* Table Rows */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, j) => (
          <div
            key={j}
            className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"
          />
        ))}
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    ))}

    {/* Pagination Skeleton */}
    <div className="flex justify-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md"
        />
      ))}
    </div>
  </div>
);
