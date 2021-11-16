module.exports = `
  type Query {
    rockets: [Rocket]
    rocket(id:ID): Rocket
  }

  type Rocket {
    id: ID
    name: String
    type: String
    active: Boolean
    boosters: Int
    cost_per_launch: Int
    success_rate_pct: Int
    first_flight: String
    country: String
    wikipedia: String
    description: String
    flickr_images: flickrImages
    launches: [Launch]
    company: String
    diameter: Distance
    height: Distance
    landing_legs: RocketLandingLegs
    mass: Mass
    stages: Int
  }

  type flickrImages{
    type: [String]
  }

  type RocketLandingLegs {
    number: Int
    material: String
  }

`