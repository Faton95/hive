import React, {FunctionComponent} from 'react'
import {Location, History} from "history";

type ContainerProps = {
    location: Location;
    history: History
}
export type TRoute = {
    component: FunctionComponent<ContainerProps>;
    path: string;
    exact: boolean;
    layout?: FunctionComponent
}

export type TRoutes = Array<TRoute>
