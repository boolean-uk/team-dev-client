import { createContext } from "react";

export const loggedInUserContext = createContext(localStorage.getItem('loggedInUser') || null);
