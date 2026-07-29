import { useState } from "react";
import { createAccessRequest } from "../services/accessRequestService";

const modules = [
  { value: "task", label: "Task Module" },
  { value: "todo", label: "Todo Module" },
];

const RequestModuleModal = ({ permissions, onRequestSent }) => {
  const [module, setModule] = useState("");

  const availableModules = modules.filter(
    (item) => !permissions[item.value]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createAccessRequest(module);

      alert(response.message);

      // Refresh requests
      await onRequestSent();

      setModule("");

      const modal = document.getElementById("requestModal");

      if (window.bootstrap) {
        const modalInstance =
          window.bootstrap.Modal.getOrCreateInstance(modal);

        modalInstance.hide();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="modal fade"
      id="requestModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                Request Module Access
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <label className="form-label">
                Select Module
              </label>

              <select
                className="form-select"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                required
              >
                <option value="">Select Module</option>

                {availableModules.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModuleModal;