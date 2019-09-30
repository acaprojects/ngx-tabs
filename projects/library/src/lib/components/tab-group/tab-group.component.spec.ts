import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APipesModule } from '@acaprojects/ngx-pipes';

import { TabGroupComponent } from './tab-group.component';
import { TabComponent } from '../tab/tab.component';

@Component({
    selector: 'test-tab-group',
    template: `<a-tab-group tab="group-3">
        <a-tab id="group-1" [content]="html">Tab 1</a-tab>
        <a-tab id="group-2" [content]="template">Tab 2</a-tab>
        <a-tab id="group-3">Tab 3</a-tab>
        <a-tab id="group-4">Tab 4</a-tab>
        <a-tab id="group-5">Tab 5</a-tab>
        <a-tab id="group-6">Tab 6</a-tab>
        <a-tab id="group-7">Tab 7</a-tab>
        <a-tab id="group-8">Tab with a really really long name</a-tab>
        <a-tab id="group-9">Tab with a really really long name too</a-tab>
    </a-tab-group>
    <ng-template #template>
        <div class="template">Template</div>
    </ng-template>`
})
class TestWrapperComponent {
    public html = `<div class="html"></div>`;
}

describe('TabGroupComponent', () => {
    let component: TabGroupComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent, TabGroupComponent, TabComponent],
            imports: [CommonModule, APipesModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should activate set tab on init', () => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const tabs = compiled.querySelectorAll('.tab');
        expect(tabs[2]).toBeTruthy();
        const active_tab = compiled.querySelector('.tab.active');
        expect(tabs[2]).toBe(active_tab);
    });

    it('should show tab headers', () => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const first_tab = compiled.querySelector('.tab');
        expect(first_tab).toBeTruthy();
        expect(compiled.querySelectorAll('.tab').length).toBe(9);
    });

    it('should handle switching tabs', () => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const tab_list = compiled.querySelectorAll('.tab');
        expect(compiled.querySelector('.html')).toBeFalsy();
        tab_list[0].dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();
        expect(component.tab).toBe('group-1');
        expect(compiled.querySelector('.html')).toBeTruthy();
        tab_list[1].dispatchEvent(new Event('mousedown'));
        fixture.detectChanges();
        expect(component.tab).toBe('group-2');
        expect(compiled.querySelector('.template')).toBeTruthy();
    });
});
