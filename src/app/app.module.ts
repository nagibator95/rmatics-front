import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';

import {JwtInterceptor} from './api/jwt.interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {HeaderComponent} from './header/header.component';
import {ModalModule} from './modal/modal.module';
import {UiModule} from './ui/ui.module';
import {MessageComponent} from './ui/message/message.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        CoreModule,
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ModalModule,
        UiModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
    entryComponents: [MessageComponent],
})
export class AppModule {}
