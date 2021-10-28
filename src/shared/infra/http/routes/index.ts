import companyRouter from '@modules/company/infra/http/routes/company.routes';
import groupRouter from '@modules/group/infra/http/routes/entity.routes';
import personRouter from '@modules/person/infra/http/routes/entity.routes';
import personCompanyRouter from '@modules/person_company/infra/http/routes/entity.routes';
import userCompanyRouter from '@modules/user_company/infra/http/routes/entity.routes';
import pendingUserRouter from '@modules/pending_user/infra/http/routes/entity.routes';
import segmentRouter from '@modules/segment/infra/http/routes/entity.routes';
import moduleRouter from '@modules/module/infra/http/routes/entity.routes';
import segmentModuleRouter from '@modules/segment_module/infra/http/routes/entity.routes';
import groupModuleRouter from '@modules/group_module/infra/http/routes/entity.routes';
import companyModuleRouter from '@modules/company_module/infra/http/routes/entity.routes';

import roleRouter from '@modules/role/infra/http/routes/entity.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import usersRouter from '@modules/user/infra/http/routes/users.routes';

import productTypeRouter from '@modules/product_type/infra/http/routes/entity.routes';
import productGroupRouter from '@modules/product_group/infra/http/routes/entity.routes';

import productFamilyRouter from '@modules/product_family/infra/http/routes/entity.routes';
import productApplicationRepository from '@modules/product_application/infra/http/routes/entity.routes';

import productDimensionRepository from '@modules/product_dimension/infra/http/routes/entity.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/api/v1/product_dimension', productDimensionRepository);
routes.use('/api/v1/product_application', productApplicationRepository);
routes.use('/api/v1/product_family', productFamilyRouter);
routes.use('/api/v1/product_group', productGroupRouter);
routes.use('/api/v1/product_type', productTypeRouter);
routes.use('/api/v1/group_modules', groupModuleRouter);
routes.use('/api/v1/company_modules', companyModuleRouter);
routes.use('/api/v1/segment_modules', segmentModuleRouter);
routes.use('/api/v1/segment', segmentRouter);
routes.use('/api/v1/modules', moduleRouter);
routes.use('/api/v1/pendinguser', pendingUserRouter);
routes.use('/api/v1/usercompany', userCompanyRouter);
routes.use('/api/v1/personcompany', personCompanyRouter);
routes.use('/api/v1/role', roleRouter);
routes.use('/api/v1/group', groupRouter);
routes.use('/api/v1/person', personRouter);
routes.use('/api/v1/company', companyRouter);
routes.use('/api/v1/users', usersRouter);
routes.use('/api/v1/sessions', sessionsRouter);

export default routes;
