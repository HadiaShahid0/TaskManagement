const PermissionCheckbox = ({ checked, onChange, disabled = false }) => {
  return (
    <input
      type="checkbox"
      className="form-check-input"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default PermissionCheckbox;