import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@appointments/services/CreateAppointment.services';

import ensureAuthenticated from '@users/infra/http/middlewares/isAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
