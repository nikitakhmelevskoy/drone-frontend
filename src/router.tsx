import { Routes, Route, Navigate } from "react-router";

import { Layout, Header, Footer } from "./components";
import { Information, MapPage, Statistics, InformationLoad } from "./pages";
import { Paths } from "./shared/constants";

export const Router = () => {
  return (
    <Routes>
      <Route element={<Layout header={<Header />} footer={<Footer />} />}>
        <Route
          path="/"
          element={<Navigate to={Paths.informationLoad} replace />}
        />
        <Route path={Paths.informationLoad} element={<InformationLoad />} />
        <Route path={Paths.information} element={<Information />} />
        <Route path={Paths.map} element={<MapPage />} />
        <Route path={Paths.statistics} element={<Statistics />} />
      </Route>
    </Routes>
  );
};
