import { container } from 'tsyringe';

import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
