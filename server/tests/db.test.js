const { MongoClient } = require('mongodb');

describe('Database Tests', () => {
  let client;
  let db;

  beforeAll(async () => {
    const uri = process.env.MONGO_URI || 'mongodb://db:27017/testdb';
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db('testdb');
  }, 30000);

  afterAll(async () => {
    await client.close();
  });

  test('Insert and find a document in MongoDB', async () => {
    const collection = db.collection('users');
    const mockUser = { username: 'Test User', password: 'password' };

    await collection.insertOne(mockUser);

    const insertedUser = await collection.findOne({ username: 'Test User' });
    expect(insertedUser.username).toBe('Test User');
    expect(insertedUser.password).toBe('password');
  });
});
