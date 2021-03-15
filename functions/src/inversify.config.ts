import 'reflect-metadata';

import { BigQuery } from '@google-cloud/bigquery';
import { PubSub } from '@google-cloud/pubsub';
import * as admin from 'firebase-admin';
import { Container, decorate, injectable } from 'inversify';
import { IAccountRepository, AccountFirestoreRepository } from '../../domain/account/repository';
import { AccountDomainService } from '../../domain/account/service/account-domain.service';
import { IBigQueryService } from '../../lib/gcp/service/bigquery.service';
import { IFirestoreService } from '../../lib/gcp/service/firestore.service';
import { IRepository } from '../../utility/repository/repository';
import { BigQueryService } from './service/gcp/bigquery.service';
import { FirestoreService } from './service/gcp/firestore.service';
import { TYPES } from './types';

decorate(injectable(), IFirestoreService);
decorate(injectable(), IBigQueryService);
decorate(injectable(), IRepository);
decorate(injectable(), IAccountRepository);
decorate(injectable(), AccountFirestoreRepository);
decorate(injectable(), AccountDomainService);

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
container.bind<IAccountRepository>(IAccountRepository).toConstantValue(new AccountFirestoreRepository(container.get(IFirestoreService)));

// DomainService
container.bind<AccountDomainService>(AccountDomainService).toConstantValue(new AccountDomainService(container.get(IAccountRepository)));

export default container;
