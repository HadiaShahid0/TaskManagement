export const RequestButton = ({ module, requests, permissions = [] }) => {
  const request = requests.find(
    (item) => item.module === module && item.status === "Pending"
  );

  const hasTaskPermission = permissions.includes("task");
  const hasTodoPermission = permissions.includes("todo");
  const hasAllPermissions = hasTaskPermission && hasTodoPermission;

  if (hasAllPermissions) {
    return null;
  }

  if (request) {
    return (
      <button className="btn btn-secondary" disabled>
        Request Pending
      </button>
    );
  }

  return (
    <button
      className="btn btn-outline-success"
      data-bs-toggle="modal"
      data-bs-target="#requestModal"
    >
      Request Module Access
    </button>
  );
};