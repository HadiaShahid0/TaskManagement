const card = ({ title, value }) => {
  return (
    <div className="card p-3 mb-3 shadow-sm rounded-3 d-flex align-items-center">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{value}</p>
    </div>
  );
};
export default card;