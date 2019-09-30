import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
    selector: 'test-tab-group',
    template: `<a-tab id="group-1"><span>Tab 1</span></a-tab>`
})
class TestWrapperComponent {
    public html = `<div class="html"></div>`;
}

describe('TabComponent', () => {
    let component: TabComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent, TabComponent]
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

    it('should show contents', () => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const el = compiled.querySelector('.tab');
        expect(el).toBeTruthy();
        expect(el.innerHTML).toBe(`<span>Tab 1</span>`);
    });

    it('should activate on user interaction', () => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const el = compiled.querySelector('.tab');
        expect(component.active).toBeFalsy();
        el.dispatchEvent(new Event('mousedown'));
        expect(component.active).toBeTruthy();
        component.active = false;
        el.dispatchEvent(new Event('touchstart'));
        expect(component.active).toBeTruthy();
    });

    it('should emit activations', (done) => {
        const compiled: HTMLElement = fixture.debugElement.children[0].nativeElement;
        const el = compiled.querySelector('.tab');
        component.activeChange.subscribe((state) => {
            expect(state).toBeTruthy();
            done();
        })
        expect(component.active).toBeFalsy();
        el.dispatchEvent(new Event('mousedown'));
    });
});
