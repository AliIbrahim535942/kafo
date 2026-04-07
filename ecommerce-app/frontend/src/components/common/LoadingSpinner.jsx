function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="loading-wrapper">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-hidden="true"
      />
      <span className="ms-2 text-muted">{label}</span>
    </div>
  );
}

export default LoadingSpinner;
