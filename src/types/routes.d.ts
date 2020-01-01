export type TRoute = {
    component: JSX.Element;
    path: string;
    exact: boolean;
}

export type TRoutes = Array<TRoute>
