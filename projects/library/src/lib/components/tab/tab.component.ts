import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { InjectableContent } from '../../types';

@Component({
    selector: 'a-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent {
    /** ID of the tab */
    @Input() public id: string = `T${Math.floor(Math.random() * 89_999 + 10_000)}`;
    /** Contents of the tab to show when action */
    @Input() public content: InjectableContent;
    /** Whether the tab is active */
    @Input() public active: boolean = false;
    /** Emitter for changes to state of tab */
    @Output() public activeChange = new EventEmitter<boolean>();

    /** Activate the tab */
    public activate() {
        this.active = true;
        this.activeChange.emit(this.active);
    }

}
