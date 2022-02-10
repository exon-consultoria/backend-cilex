import ICreateEntityDTO from '@modules/transaction/dtos/ICreateEntityDTO';
import IFilterByProductInRange from '@modules/transaction/dtos/IFilterByProductInRange';
import IEntityRepository from '@modules/transaction/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async findByStorage(id: string): Promise<Transaction[]> {
    const result = await this.ormRepository.find({
      where: [{ origin_id: id }, { destination_id: id }],
      order: {
        created_at: 'DESC',
      },
    });

    return result;
  }

  public async findByProductInRange({
    storage_id,
    startDate,
    endDate,
    product_id,
  }: IFilterByProductInRange): Promise<Transaction[]> {
    const result = await this.ormRepository.query(
      `SELECT
      *
      FROM
        transaction
      WHERE
        transaction.product_id='${product_id}'
      AND transaction.destination_id='${storage_id}' OR transaction.origin_id='${storage_id}'
      AND transaction.created_at BETWEEN '${startDate}' AND '${endDate}'
      ORDER BY transaction.created_at DESC`,
    );

    return result;
  }

  public async findByProduct(id: string): Promise<Transaction[]> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<Transaction[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Transaction | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    product_id,
    origin_id,
    destination_id,
    quantity,
    type,
    user_id,
  }: ICreateEntityDTO): Promise<Transaction> {
    const result = this.ormRepository.create({
      product_id,
      origin_id,
      destination_id,
      quantity,
      type,
      user_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Transaction): Promise<Transaction> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Transaction): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
