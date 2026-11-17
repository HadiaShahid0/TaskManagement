const RequestStatus = ({ requests, module }) => {
  const request = requests.find(
    (item) => item.module === module
  );

  if (!request) return null;

  return (
    <div className="mt-2">
      <strong>Status:</strong>{" "}
      <span>{request.status}</span>
    </div>
  );
};

export default RequestStatus;