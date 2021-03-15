import { Injectable } from '@angular/core';
import { EAccountAuthority } from 'domain/account';
import { AccountDomainService } from 'domain/account/service/account-domain.service';
import { ActionDomainService } from 'domain/action/service/action-domain.service';
import { QuestionnaireDomainService } from 'domain/questionnaire/service/questionnaire-domain.service';
import { ServiceDomainService } from 'domain/service/service/service-domain.service';
import { EUserGender } from 'domain/user/enum';
import { UserDomainService } from 'domain/user/service/user-domain.service';
import * as faker from 'faker';
import { interval } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DummyDataGenerateUsecase {
  constructor(
    private readonly accountDomainService: AccountDomainService,
    private readonly actionDomainService: ActionDomainService,
    private readonly questionnaireDomainService: QuestionnaireDomainService,
    private readonly serviceDomainService: ServiceDomainService,
    private readonly userDomainService: UserDomainService
  ) {
    console.log(accountDomainService);
  }

  generateSampleAccount() {
    return this.accountDomainService.insertAccount('hoge@email.com', { first: 'hoge', last: 'fuga' }, EAccountAuthority.ADMIN);
  }

  generateSampleUsers() {
    return interval(1000).pipe(
      take(1000),
      mergeMap(i =>
        this.userDomainService.insertUser(
          faker.date.past(),
          faker.name.jobType(),
          faker.music.genre(),
          faker.lorem.word(),
          faker.helpers.randomize([EUserGender.Men, EUserGender.Women]),
          faker.address.country(),
          faker.address.state(),
          faker.random.boolean(),
          Math.floor(Math.pow(10, this.normRand(2.500355, 0.120834)) * 10000),
          faker.random.number(10)
        )
      )
    );
  }

  generateSampleService() {
    return this.serviceDomainService.insertService(faker.name.title(), faker.random.alphaNumeric(32));
  }

  private normRand(m, s) {
    const a = 1 - Math.random();
    const b = 1 - Math.random();
    const c = Math.sqrt(-2 * Math.log(a));
    if (0.5 - Math.random() > 0) {
      return c * Math.sin(Math.PI * 2 * b) * s + m;
    } else {
      return c * Math.cos(Math.PI * 2 * b) * s + m;
    }
  }
}
