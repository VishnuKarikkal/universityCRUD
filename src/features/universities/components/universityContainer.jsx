import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const List = React.lazy(() => import("../components/List/index"));

const UniversityContainer = () => (
  <Suspense fallback={<>loading</>}>
    <Routes>
      <Route path="/" element={<List />} />
    </Routes>
  </Suspense>
);

export default UniversityContainer;
