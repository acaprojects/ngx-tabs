import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APipesModule } from '@acaprojects/ngx-pipes';

import { version } from './settings';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';

import * as dayjs_api from 'dayjs';
const dayjs = dayjs_api;

@NgModule({
    declarations: [
        TabGroupComponent,
        TabComponent
    ],
    imports: [CommonModule, APipesModule],
    exports: [
        TabGroupComponent,
        TabComponent
    ]
})
export class LibraryModule {
    public static version = 'local-dev';
    private static init = false;
    readonly build = dayjs();

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_TABS_MODULE };
export { LibraryModule as ATabsModule };
