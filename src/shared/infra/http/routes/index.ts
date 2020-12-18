import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/Appointment.routes';
import usersRouter from '@modules/users/infra/http/routes/User.routes';
import sessionsRouter from '@modules/users/infra/http/routes/Session.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;