import { container } from 'tsyringe';

import '@modules/user/providers';
import './providers';

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
import RoleRepoitory from '@modules/role/infra/typeorm/repositories/EntityRepository';
import IRoleRepository from '@modules/role/repositories/IEntityRepository';
import IUserCompany from '@modules/user_company/repositories/IUserCompany';
import UserCompanyRepository from '@modules/user_company/infra/typeorm/repositories/EntityRepository';

container.registerSingleton<IUserCompany>(
  'UserCompanyRepository',
  UserCompanyRepository,
);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepoitory);

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
