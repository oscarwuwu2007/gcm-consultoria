import { navigate } from "../../router"

/** Lleva a la página de contacto (/contacto) desde cualquier botón del sitio. */
export const CONTACT_PATH = "/contacto"
export const openContact = () => navigate(CONTACT_PATH)
