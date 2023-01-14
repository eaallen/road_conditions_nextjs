import { Route } from "../types"
import { I15 } from "./i15";
import { HIGHWAY6 } from "./us6";


export type RoutesMap = {
    i15: Route,
    us6: Route
}

const routes: RoutesMap =  {
    i15: I15,
    us6: HIGHWAY6,
}

export default routes