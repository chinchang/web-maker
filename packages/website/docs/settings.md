---
title: 'Settings'
---

Web Maker comes with a whole bunch of different settings to customize the development environment according to your needs. You can access the settings by clicking the **gear** icon in the bottom right of the screen.

At rare times, you might find yourself in a situation where you are not able to access the settings view from the user interface, may be due to some bug. And you find that toggling a specific setting can stop that bug from happening. For such scenarios there is a provision to override specific settings from the URL itself by appending query parameters.

Say, you want to turn off `autoPreview` (which runs your code automatically on fresh launch and then on subsequent changes). You can do so by opening the following URL:

```
https://webmaker.app/app?settings=autoPreview:false
```

Say, you want to turn off monaco editor also:

```
https://webmaker.app/app?settings=autoPreview:false,isMonacoEditorOn:false
```

**Note**: Currently overrides work only for `autoPreview` and `isMonacoEditorOn` options. More coming soon.
