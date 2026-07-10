interface LoadingStateProps {
  text?: string;
}

export function LoadingState({ text = 'Loading content...' }: LoadingStateProps) {
  return (
    <div aria-live="polite" className="state-card state-card--loading" role="status">
      <div className="loading-dot" />
      <p>{text}</p>
    </div>
  );
}
