import { createRoot } from "react-dom/client";
import Storefront from "./app/storefront";
import "./app/globals.css";

createRoot(document.getElementById("root")!).render(<Storefront about />);
