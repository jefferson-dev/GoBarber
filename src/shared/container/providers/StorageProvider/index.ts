import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';

const provider = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  provider[uploadConfig.driver],
);
