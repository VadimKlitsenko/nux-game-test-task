export enum RouteNames {
  LOGIN = 'login',
  INDEX = 'index'
}

export enum LayoutNames {
  DEFAULT,
  LOGIN
}

export const NON_AUTHENTICATED_ROUTES: RouteNames[] = [RouteNames.LOGIN]