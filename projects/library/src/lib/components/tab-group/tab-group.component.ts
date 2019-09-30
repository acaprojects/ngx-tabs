import { Component, OnInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
    selector: 'a-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.css']
})
export class TabGroupComponent implements OnInit {
    /** Method with which to inject content in to the component */
    public method: 'template' | 'component' | 'text';

    @ContentChildren(TabComponent) private tab_list: QueryList<TabComponent>;

    constructor() {}

    public ngOnInit(): void {}
}
