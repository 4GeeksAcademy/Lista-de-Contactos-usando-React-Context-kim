import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Contact />} />
      <Route path="add-contact" element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
    </Route>
  )
);