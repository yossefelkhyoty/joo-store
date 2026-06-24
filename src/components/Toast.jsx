import './Toast.css';

function Toast({ message, type = 'success' }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      <i
        className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}
        aria-hidden="true"
      />
      <span>{message}</span>
    </div>
  );
}

export default Toast;
