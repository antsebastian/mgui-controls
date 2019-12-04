import { Component, Input, TemplateRef } from "@angular/core";

@Component({selector:'items-panel',
 template: `
 <div fxLayoutGap="5px" fxLayout="column" fxLayout.lt-sm="column">
 <ng-content></ng-content>
 </div>`})
export class ItemsPanel {


}