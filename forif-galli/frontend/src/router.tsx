import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import Main from "./routes/main";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", //내비게이션 바 때문임
        element: <Main />,
      },
    ],
  },
]);

export default router;
