import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const userAgent = navigator.userAgent || "";
document.documentElement.classList.toggle("is-android", /Android/i.test(userAgent));
document.documentElement.classList.toggle("is-samsung-browser", /SamsungBrowser/i.test(userAgent));

createRoot(document.getElementById("root")!).render(<App />);
