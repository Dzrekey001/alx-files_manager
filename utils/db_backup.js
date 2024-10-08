import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_Manager';
    const url = `mongodb://${host}:${port}/${dbName}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.isConnected = false;

    (async () => {
      await this.client.connect((err) => {
        if (err) {
          throw err;
	} else {
          this.isConnected = true;
	}
      });
    })();
  }

  isAlive() {
    return this.isConnected;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments({});
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments({});
  }
}

const dbClient = new DBClient();
export default dbClient;
