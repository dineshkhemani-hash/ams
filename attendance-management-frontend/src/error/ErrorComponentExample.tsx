function ErrorComponentExample() {
  // Simulate an error
  throw new Error("This component crashed!");
  return <div>This will never render.</div>;
}

export default ErrorComponentExample;
