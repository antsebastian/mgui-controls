# mgui-controls

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.


## The Components

**Workspace** - a container component that fixes the double scrollbar issue with Angular 6 router, it also adds a secondary toolbar that’s fixed under the router and does not scroll off the screen. mgui-workspace uses content projection for developers to easily add tools. It then changes the position and interaction of those tools based on media breakpoints. Read the API Documentation

**Pointer Panel** - a master/detail component that displays a wrapped list of cards and shows details of the selected card. The details panel points to the selected card and loads the details template; it then binds the selected card’s source to the details template.

**Carousal** - an infinite carousal that transition slides in to view. The slides wrap to the start or end to appear as infinite.

**ItemsControl** - A base component that contains the datasource/template bindings used by pointer panel and carousel.

**mguiBootstrapBreakpoint** –  a breakpoint provider that maps existing fxFlex breakpoint aliases to use bootstrap media min/max values. The provider overrides the values but not the aliases, so the existing aliases such as ngStyle.xs and fxHide.lg will use the bootstrap media values instead of the fxFlex default values.

