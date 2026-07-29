export const RequestButton = ({ module, requests }) => {
  const request = requests.find(
    (item) => item.module === module && item.status === "Pending",
  );

  if (request) {
    return (
      <button className="btn btn-secondary" disabled>
        Request Pending
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#requestModal"
    >
      Request Module Access
    </button>
  );
};
