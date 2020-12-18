import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';

import Appoitment from '@appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appoitment>;

  constructor() {
    this.ormRepository = getRepository(Appoitment);
  }

  public async findByDate(date: Date): Promise<Appoitment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appoitment> {
    const appointments = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointments);

    return appointments;
  }
}

export default AppointmentsRepository;
