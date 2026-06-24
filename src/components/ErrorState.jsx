import './ErrorState.css';

function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <i className="fas fa-exclamation-circle" aria-hidden="true" />
      <h2>Something went wrong</h2>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
