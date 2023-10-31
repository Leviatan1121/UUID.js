const UUID = require('./uuid')
//import UUID from './uuid_module'
// <script src="./uuid_script.js"></script>

const generator = new UUID()

let id = generator.newUUID() // generates a new UUID

generator.totalUsed // returns total UUIDs in use
generator.totalUnused // returns total UUIDs in use

generator.reuse(id) // tells the generator to reuse an id