import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [CommonModule],
  providers: [ThemeService]
})
export class SharedModule {}
