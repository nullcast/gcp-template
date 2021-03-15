import * as admin from 'firebase-admin';
import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';
import { IServiceRepository, ServiceFirestoreRepository } from '../../domain/service';
import { ServiceDomainService } from '../../domain/service/service/service-domain.service';
import { ChildFirestoreRepository, IChildRepository, IUserRepository, UserFirestoreRepository } from '../../domain/user';
import { UserDomainService } from '../../domain/user/service/user-domain.service';
import { IFirestoreService } from '../../lib/gcp/service/firestore.service';
import { FirestoreService } from './service/gcp/firestore.service';
import { TYPES } from './types';

const serviceAccount = require('./.keys/gcp-template-firebase-adminsdk-5tvia-27c69fe9db.json');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gcp-template.appspot.com',
  databaseURL: 'https://gcp-template.firebaseio.com'
});
const firestoreClient = app.firestore();

// Create a new container tsoa can use
const iocContainer = new Container();

decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// Client
iocContainer.bind<FirebaseFirestore.Firestore>(TYPES.FIRESTORE_CLIENT).toConstantValue(firestoreClient);

// LibService
iocContainer.bind<IFirestoreService>(IFirestoreService).toConstantValue(new FirestoreService(iocContainer.get(TYPES.FIRESTORE_CLIENT)));

// Repository
iocContainer
  .bind<IServiceRepository>(IServiceRepository)
  .toConstantValue(new ServiceFirestoreRepository(iocContainer.get(IFirestoreService)));
iocContainer.bind<IUserRepository>(IUserRepository).toConstantValue(new UserFirestoreRepository(iocContainer.get(IFirestoreService)));
iocContainer.bind<IChildRepository>(IChildRepository).toConstantValue(new ChildFirestoreRepository(iocContainer.get(IFirestoreService)));

// DomainService
iocContainer
  .bind<ServiceDomainService>(ServiceDomainService)
  .toConstantValue(new ServiceDomainService(iocContainer.get(IServiceRepository)));

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

// export according to convention
export { iocContainer };
