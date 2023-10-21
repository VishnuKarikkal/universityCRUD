import React from "react";
import { Route, Routes } from "react-router-dom";

const UniversityContainer = React.lazy(() =>
  import("../features/universities/components/universityContainer")
);

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/listData" element={<UniversityContainer />} />
    </Routes>
  </>
);

export default AppRoutes;
