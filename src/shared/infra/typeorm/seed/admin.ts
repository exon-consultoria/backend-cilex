import { hash } from 'bcryptjs';
import { getConnection } from 'typeorm';

async function create() {
  const connection = await getConnection();

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`INSERT INTO USERS(id, name, email, password)`);
}
