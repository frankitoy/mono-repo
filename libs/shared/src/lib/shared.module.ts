import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesPartsService } from './services/routes-parts.service';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [CommonModule],
  providers: [RoutesPartsService, ThemeService]
})
export class SharedModule {}
