export interface LaunchFailureInfo {
  altitude: any;
  reason: string;
  time: number;
}

export interface LaunchSiteInfo {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface SpacexLaunchInfoDto {
  crew: string;
  details: string;
  flight_number: number;
  is_tentative: boolean;
  launch_date_local: Date | any;
  launch_date_unix: Date | any;
  launch_date_utc: Date | any;
  launch_failure_details?: LaunchFailureInfo;
  launch_site?: LaunchSiteInfo;
  launch_success: boolean;
  launch_window: number;
  launch_year: string;
  links: any;
  mission_id: string[];
  mission_name: string;
  rocket: any;
  ships: string[];
  static_fire_date_unix: Date;
  static_fire_date_utc: Date | string;
  tbd: boolean;
  telemetry: any;
  tentative_max_precision: string;
  timeline: any;
  upcoming: boolean;
}
