import Appointment from '@appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
