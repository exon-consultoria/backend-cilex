import companyRouter from '@modules/company/infra/http/routes/company.routes';
import groupRouter from '@modules/group/infra/http/routes/entity.routes';
import personRouter from '@modules/person/infra/http/routes/entity.routes';
import personCompanyRouter from '@modules/person_company/infra/http/routes/entity.routes';
import userCompanyRouter from '@modules/user_company/infra/http/routes/entity.routes';

import roleRouter from '@modules/role/infra/http/routes/entity.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/api/v1/usercompany', userCompanyRouter);
routes.use('/api/v1/personcompany', personCompanyRouter);
routes.use('/api/v1/role', roleRouter);
routes.use('/api/v1/group', groupRouter);
routes.use('/api/v1/person', personRouter);
routes.use('/api/v1/company', companyRouter);
routes.use('/api/v1/users', usersRouter);
routes.use('/api/v1/sessions', sessionsRouter);
routes.use('/api/v1/password', passwordRouter);

export default routes;
