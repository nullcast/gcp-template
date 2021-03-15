const functions = require('firebase-functions');
import container from './inversify.config';
import { UserSnapshotUsecase } from './usecase/user-snapshot.usecase';

const userSnapshotUsecase = container.get(UserSnapshotUsecase);

exports.onUserCreated = functions
  .region('asia-northeast1')
  .firestore.document(`user/{userID}`)
  .onCreate(async change => {
    await userSnapshotUsecase.takeSnapshot(change.id).toPromise();
    console.log('complete:onUserCreated');
  });
