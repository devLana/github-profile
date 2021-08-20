import { createContext } from "react";
import state from "../state";
import type { AppState } from "../dataTypes";

export const StateContext = createContext<AppState>(state);
