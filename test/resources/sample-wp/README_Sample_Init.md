## my-webpackage
This a test webpackage.
### Webpackage Artifacts
| Name | Type | Description | Links |
|---|---|---|---|
| **app** | Application | This is a simple pre-generated app. | [app](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/app/index.html) |
| **docs** | Application | Generated webpackage documentation. | [docs](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/docs/index.html) |
| **my-elementary-1** | Elementary Component | Elementary component 1 | [demo](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-elementary-1/demo/index.html) [docs](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-elementary-1/docs/index.html) |
| **my-elementary-2** | Elementary Component | Elementary component 2 | [demo](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-elementary-2/demo/index.html) [docs](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-elementary-2/docs/index.html) |
| **my-compound** | Compound Component | This is a compound component | [demo](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-compound/demo/index.html) [docs](https://cubbles.world/sandbox/my-webpackage@0.1.0-SNAPSHOT/my-compound/docs/index.html) |
| **my-utility** | Utilities | This is an utility. | |
### Use of components
The html file should contain the desire component using its tag, e.g. the `<my-elementary-1>`, as follows:
```html
<my-elementary-1 cubx-webpackage-id="my-webpackage@0.1.0-SNAPSHOT"></my-elementary-1>
```
Note that the `webpackageId` should be provided as attribute, which in this case is: `my-webpackage@0.1.0-SNAPSHOT`.

Additionally, this component can be initialized using the `<cubx-core-slot-init>` tag (available from _cubx.core.rte@1.9.0_).
For example, lets initialize the `firstSlot` slot to get the basic package of ckeditor:

```html
<my-elementary-1 cubx-webpackage-id="my-webpackage@0.1.0-SNAPSHOT">
    <!--Initilization-->
    <cubx-core-init style="display:none">
        <cubx-core-slot-init slot="firstSlot">"Slot Value"</cubx-core-slot-init>
    </cubx-core-init>
</my-elementary-1>
```

Or it can be initialized and later manipulated from Javascript as follows:

```javascript
var component= document.querySelector('my-elementary-1');
// Wait until CIF is ready
document.addEventListener('cifReady', function() {
  // Manipulate slots
  component.setFirstSlot("Slot Value");
});
```

[Want to get to know the Cubbles Platform?](https://cubbles.github.io)