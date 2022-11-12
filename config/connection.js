const { connect, connection } = require('mongoose');

const connectionString =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;


// MongoClient.connect('mongodb+srv://zue:Boostbelau1701@cluster0.3mtoev0.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })
//     .then(client => {
//         console.log('Connected to Database')
//         const db = client.db('social-network-API')
//         const userCollection = db.collection('users')
//         const thoughtCollection = db.collection('thoughts')
//     })
//     .catch(error => console.error(error))

// const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB';

// connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
