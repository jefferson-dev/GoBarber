import Appointment from '@appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@appointments/dtos/IFindAllMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@appointments/dtos/IFindAllDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
