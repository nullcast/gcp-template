import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchComponent } from './component/page/batch/batch.component';
import { IndexComponent } from './component/page/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'batch', component: BatchComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
