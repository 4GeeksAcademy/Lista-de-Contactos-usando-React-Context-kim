import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AGENDA_SLUG = "mario123";

const AddContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditing) return;

    const existingContact = store.contacts.find(
      (contact) => String(contact.id) === String(id)
    );

    if (existingContact) {
      setFormData({
        name: existingContact.name || "",
        phone: existingContact.phone || "",
        email: existingContact.email || "",
        address: existingContact.address || "",
      });
    }
  }, [id, isEditing, store.contacts]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const url = isEditing
        ? `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${id}`
        : `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          isEditing
            ? "No se pudo actualizar el contacto"
            : "No se pudo crear el contacto"
        );
      }

      const savedContact = await response.json();

      dispatch({
        type: isEditing ? "update_contact" : "add_contact",
        payload: savedContact,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <h1 className="text-center mb-4 fw-bold">
        {isEditing ? "Edit contact" : "Add a new contact"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Enter phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary w-100">
          {isEditing ? "Update" : "Save"}
        </button>

        <div className="mt-2">
          <Link to="/">or get back to contacts</Link>
        </div>
      </form>
    </div>
  );
};

export default AddContact;