export type RouteParamMap = Record<string, string | undefined>;

export interface BreadcrumbHandle {
  crumb: string | ((params: RouteParamMap) => string);
  to?: string | ((params: RouteParamMap) => string);
}
