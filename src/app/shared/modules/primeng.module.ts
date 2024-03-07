import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@NgModule({
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule
    ],
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule
    ]
})
export class PrimeNGModule { }
