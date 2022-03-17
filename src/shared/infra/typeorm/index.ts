import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { AuroraDataApiConnectionOptions } from 'typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions';

interface IOptions extends AuroraDataApiConnectionOptions {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOptions;
  newOptions.host = 'database_cilex'; // In Docker: <database_service_name> ----- Out Docker: localhost
  createConnection({
    ...options,
  });
});

// export default async (): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions() as IOptions;
//   defaultOptions.host = 'database_cilex'
//   return createConnection({...defaultOptions,})

// }

// export default async (): Promise<Connection> => {
//   const defaultOptions = await getConnectionOptions();

//   return createConnection(
//     Object.assign(defaultOptions, {
//       database: defaultOptions.database,
//     }),
//   );
// };
