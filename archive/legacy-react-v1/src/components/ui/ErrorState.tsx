interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="state-card state-card--error" role="alert">
      <h2>Unable to load this view</h2>
      <p>{message}</p>
      {onRetry ? (
        <button className="button button--secondary" onClick={onRetry} type="button">
          Try again
        </button>
      ) : null}
    </div>
  );
}
