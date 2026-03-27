import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";

const AGENDA_SLUG = "mario123";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const createAgenda = async () => {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok && response.status !== 400) {
        throw new Error("No se pudo crear la agenda");
      }
    };

    const fetchContacts = async () => {
      dispatch({ type: "set_loading", payload: true });
      dispatch({ type: "set_error", payload: null });

      try {
        let response = await fetch(
          `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
        );

        if (!response.ok) {
          await createAgenda();
          response = await fetch(
            `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts`
          );
        }

        if (!response.ok) {
          throw new Error("No se pudieron obtener los contactos");
        }

        const data = await response.json();

        dispatch({
          type: "set_contacts",
          payload: Array.isArray(data) ? data : data.contacts || [],
        });
      } catch (error) {
        console.error(error);
        dispatch({ type: "set_error", payload: error.message });
      } finally {
        dispatch({ type: "set_loading", payload: false });
      }
    };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/${AGENDA_SLUG}/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo eliminar el contacto");
      }

      dispatch({
        type: "delete_contact",
        payload: id,
      });
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el contacto");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {store.loading && <p>Cargando contactos...</p>}
      {store.error && <p className="text-danger">{store.error}</p>}

      {!store.loading && !store.error && store.contacts?.length === 0 && (
        <div className="text-center mt-5">
          <p>No hay contactos disponibles.</p>
        </div>
      )}

      {!store.loading && !store.error && store.contacts?.length > 0 && (
        <div className="border rounded">
          {store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;