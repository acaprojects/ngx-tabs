import {
    Component,
    OnInit,
    ContentChildren,
    QueryList,
    ViewChild,
    ElementRef,
    HostListener,
    TemplateRef,
    Input,
    Output,
    EventEmitter,
    SimpleChanges
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { InjectableContentType } from '../../types';

@Component({
    selector: 'a-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {
    /** ID of the active tab */
    @Input() public tab: string;
    /** Emitter for changes to the active tab */
    @Output() public tabChange = new EventEmitter<string>();
    /** Scroll amount for the headers */
    public left_offset = 0;
    /** Width of the header block */
    public header_width = 0;

    /** Update block width after window resize */
    @HostListener('window:resize')
    public resize() {
        if (this.headers && this.headers.nativeElement) {
            const box = this.headers.nativeElement.getBoundingClientRect();
            this.header_width = box.width;
        }
    }

    /** List of tabs to display */
    @ContentChildren(TabComponent) private tab_list: QueryList<TabComponent>;
    /** Element block containing header elements */
    @ViewChild('headers', { static: true }) private headers: ElementRef<HTMLDivElement>;

    /** Active tab to display contents for */
    public get active_tab(): TabComponent {
        const list = this.tab_list.toArray();
        return list.find(i => i.active);
    }

    /** Contents of the active tab to display */
    public get content(): any {
        const tab = this.active_tab;
        return (tab ? tab.content : '') || '';
    }

    /** Method with which to inject content in to the component */
    public get method(): InjectableContentType {
        if (typeof this.content === 'string') {
            return 'text';
        } else if (this.content instanceof TemplateRef) {
            return 'template';
        }
        return 'component';
    }

    public ngOnInit(): void {
        this.resize();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.tab && this.tab) {
            const list = this.tab_list.toArray();
            list.forEach(tab => tab.active = this.tab === tab.id);
        }

    }

    public ngAfterContentInit(): void {
        const list = this.tab_list.toArray();
        for (const tab of list) {
            tab.activeChange.subscribe(_ => {
                for (const item of list) {
                    item.active = item === tab;
                }
                /** Update active ID */
                this.tab = tab.id;
                this.tabChange.emit(this.tab);
            });
        }
        const active = list.find(i => i.id === this.tab);
        if (active) {
            active.active = true;
        } else {
            list[0].active = true
            this.tab = list[0].id
        }
        this.resize();
    }

    /** Update scroll offset of the header block */
    public updateOffset(event) {
        this.left_offset = event.target.scrollLeft;
    }
}
