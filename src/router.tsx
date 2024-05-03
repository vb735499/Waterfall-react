import { FC, lazy, LazyExoticComponent, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";

import LoadingScreen from "./components/LoadingScreen";

const loadable = (Component: LazyExoticComponent<FC>) => (props: any) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
);

const Waterfall = loadable(lazy(() => import("./pages/waterfall")));
  
const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Waterfall />,
    },
]);

export default BrowserRouter;
