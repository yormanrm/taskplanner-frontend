import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from "primeng/message";
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    imports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        SidebarModule
    ],
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        DividerModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        SidebarModule
    ]
})
export class PrimeNGModule { }
