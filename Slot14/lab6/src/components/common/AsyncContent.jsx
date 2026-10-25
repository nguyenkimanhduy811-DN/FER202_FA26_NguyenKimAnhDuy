
import LoadingSpinner from "./LoadingSpinner";
import ErrorAlert from "./ErrorAlert";
import EmptyState from "./EmptyState";

const defaultIsEmpty = (data) =>
  data == null ||
  (Array.isArray(data) && data.length === 0);

export default function AsyncContent({
  loading,
  error,
  data,
  onRetry,
  emptyText,
  isEmpty = defaultIsEmpty,
  keepPrevious = false,
  children,
}) {
  const empty = isEmpty(data);

  // 1. LOADING
  if (loading && (!keepPrevious || empty)) {
    return <LoadingSpinner />;
  }

  // 2. ERROR
  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={onRetry}
      />
    );
  }

  // 3. EMPTY
  if (empty) {
    return (
      <EmptyState
        text={emptyText}
      />
    );
  }

  // 4. SUCCESS
  return (
    <div className={loading ? "opacity-50" : ""}>
      {children(data)}
    </div>
  );
}
