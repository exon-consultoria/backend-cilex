import { container } from 'tsyringe';

import '@modules/user/providers';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import CompanyRepository from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import IPersonRepository from '@modules/person/repositories/IPersonRepository';
import PersonRepository from '@modules/person/infra/typeorm/repositories/PersonRepository';
import IPersonCompany from '@modules/person_company/repositories/IPersonCompany';
import PersonCompanyRepository from '@modules/person_company/infra/typeorm/repositories/EntityRepository';
import GroupRepository from '@modules/group/infra/typeorm/repositories/EntityRepository';
import IGroupRepository from '@modules/group/repositories/IEntityRepository';
import RoleRepository from '@modules/role/infra/typeorm/repositories/EntityRepository';
import IRoleRepository from '@modules/role/repositories/IEntityRepository';
import IUserCompany from '@modules/user_company/repositories/IUserCompany';
import UserCompanyRepository from '@modules/user_company/infra/typeorm/repositories/EntityRepository';
import IPendingUser from '@modules/pending_user/repositories/IEntityRepository';
import PendingUserRepository from '@modules/pending_user/infra/typeorm/repositories/EntityRepository';
import IModules from '@modules/module/repositories/IEntityRepository';
import ModuleRepository from '@modules/module/infra/typeorm/repositories/EntityRepository';
import ISegment from '@modules/segment/repositories/IEntityRepository';
import SegmentRepository from '@modules/segment/infra/typeorm/repositories/EntityRepository';
import ISegmentModule from '@modules/segment_module/repositories/ISegmentModule';
import SegmentModuleRepository from '@modules/segment_module/infra/typeorm/repositories/EntityRepository';
import CompanyModuleRepository from '@modules/company_module/infra/typeorm/repositories/EntityRepository';
import ICompanyModuleRepository from '@modules/company_module/repositories/IEntityRepository';
import GroupModuleRepository from '@modules/group_module/infra/typeorm/repositories/EntityRepository';
import IGroupModuleRepository from '@modules/group_module/repositories/IEntityRepository';

container.registerSingleton<IGroupModuleRepository>(
  'GroupModuleRepository',
  GroupModuleRepository,
);

container.registerSingleton<ICompanyModuleRepository>(
  'CompanyModuleRepository',
  CompanyModuleRepository,
);

container.registerSingleton<ISegmentModule>(
  'SegmentModuleRepository',
  SegmentModuleRepository,
);

container.registerSingleton<ISegment>('SegmentRepository', SegmentRepository);

container.registerSingleton<IModules>('ModuleRepository', ModuleRepository);

container.registerSingleton<IPendingUser>(
  'PendingUserRepository',
  PendingUserRepository,
);

container.registerSingleton<IUserCompany>(
  'UserCompanyRepository',
  UserCompanyRepository,
);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

container.registerSingleton<IGroupRepository>(
  'GroupRepository',
  GroupRepository,
);

container.registerSingleton<IPersonCompany>(
  'PersonCompanyRepository',
  PersonCompanyRepository,
);

container.registerSingleton<IPersonRepository>(
  'PersonRepository',
  PersonRepository,
);

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
