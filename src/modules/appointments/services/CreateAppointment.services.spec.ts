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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 10, 13),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two appointment on te same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await createAppointment.execute({
      date: new Date(2020, 11, 10, 13),
      user_id: 'user_id',
      provider_id: 'provider_id',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 10, 13),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 10, 11),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 10, 11),
        user_id: 'user_id',
        provider_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should not be able to create an appointment with same user as provider', async () => {
  //   jest.spyOn(Date, 'now').mockImplementationOnce(() => {
  //     return new Date(2020, 11, 10, 12).getTime();
  //   });

  //   await expect(
  //     createAppointment.execute({
  //       date: new Date(2020, 11, 10, 11),
  //       user_id: 'user_id',
  //       provider_id: 'user_id',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 11, 7),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 11, 18),
        user_id: 'user_id',
        provider_id: 'provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
