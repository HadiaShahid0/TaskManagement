const footer = () => {
  return (
    <footer className="footer fixed-bottom bg-dark text-center py-3">
      <p className="text-muted">
        © {new Date().getFullYear()} Task Management. All rights reserved.
      </p>
    </footer>
  );
};
export default footer;
