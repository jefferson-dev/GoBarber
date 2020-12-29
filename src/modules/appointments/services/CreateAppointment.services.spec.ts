import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@appointments/repositories/fakes/FakeAppointmetsRepository';
import CreateAppointmentService from './CreateAppointment.services';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '13798246',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('13798246');
  });

  it('should not be able to create two appointment on te same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '13798246',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '13798246',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
