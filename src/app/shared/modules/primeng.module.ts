import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule,
        MessagesModule,
        MessageModule,
        ToastModule
    ],
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule,
        MessagesModule,
        MessageModule,
        ToastModule
    ]
})
export class PrimeNGModule { }
