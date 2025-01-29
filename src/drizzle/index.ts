import 'dotenv/config';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const order = {
    totalPrice: '200',
    status: 'ordered',
    firstName: 'Tanya',
    lastName: 'Semakina',
    phone: '066 111 11 11',
    shippingAddress: 'some big text',
    paymentType: 'not payed',
  };
  await db.insert(schema.orders).values(order);
  const orders = await db.select().from(schema.orders);

  console.log('Getting all users from the database: ', orders);
}
main()
  .then()
  .catch((err) => console.log(err));
