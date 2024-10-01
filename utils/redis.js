import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
    this.asyncGet = promisify(this.client.get).bind(this.client);
    this.asyncSetExp = promisify(this.client.set).bind(this.client);
    this.asyncDel = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.asyncGet(key);
  }

  async set(key, value, expTime) {
    return this.asyncSetExp(key, value, 'EX', expTime);
  }

  async del(key) {
    return this.asyncDel(key);
  }
}

module.exorts = RedisClient;
