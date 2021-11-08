module.exports = `

    type Query {
        company: Info
    }

    type Info {
        ceo: String
        coo: String
        cto_propulsion: String
        cto: String
        employees: Int
        founded: Int
        founder: String
        headquarters: Address
        launch_sites: Int
        links: InfoLinks
        name: String
        summary: String
        test_sites: Int
        valuation: Float
        vehicles: Int
    }

    type InfoLinks {
        elon_twitter: String
        flickr: String
        twitter: String
        website: String
    }

    type Address {
        address: String
        city: String
        state: String
    }

`