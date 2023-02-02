const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

let dbConnection;
const uri = process.env.clusterURI

module.exports = {
    connectToDb: (callBack) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db("bookstore")
                return callBack()
            })
            .catch(err =>{
                console.log(err)
                return callBack(err)
            })
    },
    getDb: () => dbConnection
}