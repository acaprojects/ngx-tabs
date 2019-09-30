import { TemplateRef, Type } from '@angular/core';

/** Data that can be injected into an angular template */
export type InjectableContent = TemplateRef<any> | Type<any> | string;

export type InjectableContentType = 'template' | 'component' | 'text';