import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="card mb-0 rounded-0 border-start-0 border-end-0">
      <div className="card-body py-4 px-4">
        <div className="row align-items-start">
          <div className="col-md-2 d-flex justify-content-center mb-3 mb-md-0">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt={contact.name}
              className="rounded-circle"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-8">
            <h4 className="mb-3">{contact.name}</h4>

            <p className="mb-2 text-secondary d-flex align-items-center gap-2">
              <i className="fas fa-map-marker-alt"></i>
              <span>{contact.address}</span>
            </p>

            <p className="mb-2 text-secondary d-flex align-items-center gap-2">
              <i className="fas fa-phone"></i>
              <span>{contact.phone}</span>
            </p>

            <p className="mb-0 text-secondary d-flex align-items-center gap-2">
              <i className="fas fa-envelope"></i>
              <span>{contact.email}</span>
            </p>
          </div>

          <div className="col-md-2 d-flex justify-content-md-end gap-4 mt-3 mt-md-0">
            <Link to={`/edit/${contact.id}`} className="text-dark">
              <i className="fas fa-pencil-alt"></i>
            </Link>

            <button
              type="button"
              className="btn p-0 border-0 text-dark"
              onClick={() => onDelete(contact.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactCard;