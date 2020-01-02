import React from 'react'

export type TRoute = {
    component: React.FunctionComponent;
    path: string;
    exact: boolean;
}

export type TRoutes = Array<TRoute>
