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

import ProductTypeRepository from '@modules/product_type/infra/typeorm/repositories/EntityRepository';
import IProductTypeRepository from '@modules/product_type/repositories/IEntityRepository';

import ProductGroupRepository from '@modules/product_group/infra/typeorm/repositories/EntityRepository';
import IProductGroupRepository from '@modules/product_group/repositories/IEntityRepository';

import ProductFamilyRepository from '@modules/product_family/infra/typeorm/repositories/EntityRepository';
import IProductFamilyRepository from '@modules/product_family/repositories/IEntityRepository';

import ProductApplicationRepository from '@modules/product_application/infra/typeorm/repositories/EntityRepository';
import IProductApplicationRepository from '@modules/product_application/repositories/IEntityRepository';

import ProductDimensionRepository from '@modules/product_dimension/infra/typeorm/repositories/EntityRepository';
import IProductDimensionRepository from '@modules/product_dimension/repositories/IEntityRepository';

import ProductSubGroupRepository from '@modules/product_subgroup/infra/typeorm/repositories/EntityRepository';
import IProductSubGroupRepository from '@modules/product_subgroup/repositories/IEntityRepository';

import ProductSubFamilyRepository from '@modules/product_subfamily/infra/typeorm/repositories/EntityRepository';
import IProductSubFamilyRepository from '@modules/product_subfamily/repositories/IEntityRepository';

import ProductUMRepository from '@modules/product_um/infra/typeorm/repositories/EntityRepository';
import IProductUMRepository from '@modules/product_um/repositories/IEntityRepository';

import ProductRepository from '@modules/product/infra/typeorm/repositories/EntityRepository';
import IProductRepository from '@modules/product/repositories/IEntityRepository';

import StorageRepository from '@modules/storage/infra/typeorm/repositories/EntityRepository';
import IStorageRepository from '@modules/storage/repositories/IEntityRepository';

import TransactionRepository from '@modules/transaction/infra/typeorm/repositories/EntityRepository';
import ITransactionRepository from '@modules/transaction/repositories/IEntityRepository';

import VaccineRepository from '@modules/vaccine/infra/typeorm/repositories/EntityRepository';
import IVaccineRepository from '@modules/vaccine/repositories/IEntityRepository';

container.registerSingleton<IVaccineRepository>(
  'VaccineRepository',
  VaccineRepository,
);

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
);

container.registerSingleton<IStorageRepository>(
  'StorageRepository',
  StorageRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IProductUMRepository>(
  'ProductUMRepository',
  ProductUMRepository,
);

container.registerSingleton<IProductSubFamilyRepository>(
  'ProductSubFamilyRepository',
  ProductSubFamilyRepository,
);

container.registerSingleton<IProductSubGroupRepository>(
  'ProductSubGroupRepository',
  ProductSubGroupRepository,
);

container.registerSingleton<IProductDimensionRepository>(
  'ProductDimensionRepository',
  ProductDimensionRepository,
);

container.registerSingleton<IProductApplicationRepository>(
  'ProductApplicationRepository',
  ProductApplicationRepository,
);

container.registerSingleton<IProductFamilyRepository>(
  'ProductFamilyRepository',
  ProductFamilyRepository,
);

container.registerSingleton<IProductGroupRepository>(
  'ProductGroupRepository',
  ProductGroupRepository,
);

container.registerSingleton<IProductTypeRepository>(
  'ProductTypeRepository',
  ProductTypeRepository,
);

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
