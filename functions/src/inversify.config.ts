import 'reflect-metadata';

import { BigQuery } from '@google-cloud/bigquery';
import { PubSub } from '@google-cloud/pubsub';
import * as admin from 'firebase-admin';
import { Container, decorate, injectable } from 'inversify';
import {
  ChildFirestoreRepository,
  IChildRepository,
  IUserRepository,
  UserBigQueryRepository,
  UserFirestoreRepository
} from '../../domain/user/repository';
import { UserDomainService } from '../../domain/user/service/user-domain.service';
import { IBigQueryService } from '../../lib/gcp/service/bigquery.service';
import { IFirestoreService } from '../../lib/gcp/service/firestore.service';
import { IRepository } from '../../utility/repository/repository';
import { BigQueryService } from './service/gcp/bigquery.service';
import { FirestoreService } from './service/gcp/firestore.service';
import { TYPES } from './types';

decorate(injectable(), IFirestoreService);
decorate(injectable(), IBigQueryService);
decorate(injectable(), IRepository);
decorate(injectable(), IChildRepository);
decorate(injectable(), IUserRepository);
decorate(injectable(), UserFirestoreRepository);
decorate(injectable(), ChildFirestoreRepository);
decorate(injectable(), UserBigQueryRepository);
decorate(injectable(), UserDomainService);

const container = new Container();

const app = admin.initializeApp();
const firestoreClient = app.firestore();

const pubsub = new PubSub();

container.bind<FirebaseFirestore.Firestore>(TYPES.FIRESTORE_CLIENT).toConstantValue(firestoreClient);
container.bind<BigQuery>(BigQuery).toConstantValue(new BigQuery());
container.bind<PubSub>(PubSub).toConstantValue(pubsub);

// LibService
container.bind<IFirestoreService>(IFirestoreService).toConstantValue(new FirestoreService(container.get(TYPES.FIRESTORE_CLIENT)));
container.bind<IBigQueryService>(IBigQueryService).toConstantValue(new BigQueryService(container.get(BigQuery)));

// Repository
container.bind<IUserRepository>(IUserRepository).toConstantValue(new UserFirestoreRepository(container.get(IFirestoreService)));
container.bind<IChildRepository>(IChildRepository).toConstantValue(new ChildFirestoreRepository(container.get(IFirestoreService)));
container.bind(TYPES.USER_BIGQUERY_REPOSITORY).toConstantValue(new UserBigQueryRepository(container.get(IBigQueryService)));

// DomainService
container
  .bind<UserDomainService>(UserDomainService)
  .toConstantValue(new UserDomainService(container.get(IUserRepository), container.get(IChildRepository)));

export default container;
