import { Suspense } from "react";
import Loading from "../components/Loading";
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);
export default withSuspense;
