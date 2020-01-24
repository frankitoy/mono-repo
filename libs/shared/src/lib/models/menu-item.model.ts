export interface MenuItem {
  type: string;
  name?: string;
  state?: string;
  icon?: string;
  tooltip?: string;
  disabled?: boolean;
  sub?: Array<MenuItem>;
}
