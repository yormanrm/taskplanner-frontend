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
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CarouselModule } from 'primeng/carousel';

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
        SidebarModule,
        DropdownModule,
        InputGroupModule,
        InputGroupAddonModule,
        CarouselModule
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
        SidebarModule,
        DropdownModule,
        InputGroupModule,
        InputGroupAddonModule,
        CarouselModule
    ]
})
export class PrimeNGModule { }
