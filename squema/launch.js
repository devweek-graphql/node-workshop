module.exports = `

type Query {
    launches: [Launch]
    launch(id: ID!): Launch
  }

  type History {
    flight: Launch
  }
  type LaunchesPastResult {
    result: Result
    data: [Launch]
  }
  type Launch {
    details: String
    id: ID
    is_tentative: Boolean
    launch_date_local: Date
    launch_date_unix: Date
    launch_date_utc: Date
    launch_site: LaunchSite
    launch_success: Boolean
    launch_year: String
    links: LaunchLinks
    mission_id: [String]
    mission_name: String
    rocket: Rocket
    static_fire_date_unix: Date
    static_fire_date_utc: Date
    telemetry: LaunchTelemetry
    tentative_max_precision: String
    upcoming: Boolean
  }

  type LaunchRocketFirstStage {
    cores: [LaunchRocketFirstStageCore]
  }
  type LaunchRocketFirstStageCore {
    block: Int
    core: Core
    flight: Int
    gridfins: Boolean
    land_success: Boolean
    landing_intent: Boolean
    landing_type: String
    landing_vehicle: String
    legs: Boolean
    reused: Boolean
  }
  type LaunchRocketSecondStage {
    block: Int
    payloads: [Payload]
  }
  type LaunchRocketFairings {
    recovered: Boolean
    recovery_attempt: Boolean
    reused: Boolean
    ship: String
  }
  type LaunchTelemetry {
    flight_club: String
  }
  type LaunchSite {
    site_id: String
    site_name_long: String
    site_name: String
  }
  type LaunchLinks {
    article_link: String
    flickr_images: [String]
    mission_patch_small: String
    mission_patch: String
    presskit: String
    reddit_campaign: String
    reddit_launch: String
    reddit_media: String
    reddit_recovery: String
    video_link: String
    wikipedia: String
  }
  input LaunchFind {
    apoapsis_km: Float
    block: Int
    cap_serial: String
    capsule_reuse: String
    core_flight: Int
    core_reuse: String
    core_serial: String
    customer: String
    eccentricity: Float
    end: Date
    epoch: Date
    fairings_recovered: String
    fairings_recovery_attempt: String
    fairings_reuse: String
    fairings_reused: String
    fairings_ship: String
    gridfins: String
    id: ID
    inclination_deg: Float
    land_success: String
    landing_intent: String
    landing_type: String
    landing_vehicle: String
    launch_date_local: Date
    launch_date_utc: Date
    launch_success: String
    launch_year: String
    legs: String
    lifespan_years: Float
    longitude: Float
    manufacturer: String
    mean_motion: Float
    mission_id: String
    mission_name: String
    nationality: String
    norad_id: Int
    orbit: String
    payload_id: String
    payload_type: String
    periapsis_km: Float
    period_min: Float
    raan: Float
    reference_system: String
    regime: String
    reused: String
    rocket_id: String
    rocket_name: String
    rocket_type: String
    second_stage_block: String
    semi_major_axis_km: Float
    ship: String
    side_core1_reuse: String
    side_core2_reuse: String
    site_id: String
    site_name_long: String
    site_name: String
    start: Date
    tbd: String
    tentative_max_precision: String
    tentative: String
  }


  type Core {
    asds_attempts: Int
    asds_landings: Int
    block: Int
    id: ID
    missions: [CapsuleMission]
    original_launch: Date
    reuse_count: Int
    rtls_attempts: Int
    rtls_landings: Int
    status: String
    water_landing: Boolean
  }

  type CapsuleMission {
    flight: Int
    name: String
  }

  type Payload {
    customers: [String]
    id: ID
    manufacturer: String
    nationality: String
    norad_id: [Int]
    orbit_params: PayloadOrbitParams
    orbit: String
    payload_mass_kg: Float
    payload_mass_lbs: Float
    payload_type: String
    reused: Boolean
  }

  type PayloadOrbitParams {
    apoapsis_km: Float
    arg_of_pericenter: Float
    eccentricity: Float
    epoch: Date
    inclination_deg: Float
    lifespan_years: Float
    longitude: Float
    mean_anomaly: Float
    mean_motion: Float
    periapsis_km: Float
    period_min: Float
    raan: Float
    reference_system: String
    regime: String
    semi_major_axis_km: Float
  }

`