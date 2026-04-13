---
title: 'Web Maker 4.0'
date: 2019-03-18
description: 'Announcing Web Maker 4.0 — a new home, Files Mode, Command Palette, improved Console, Monaco Editor, Prettier integration and more.'
---

It's been a while since Web Maker got a major update. I have been working on the next version for many months now. And this work got a major speed-boost when I finally [decided to quit from my day job](https://twitter.com/cssMonk/status/1044923448487813121) in August last year. Then some of my time was taken away by a [few](https://a11yformanagers.now.sh/) [new](https://sideproject.app/) [products](https://wheretoreport.xyz/) that I launched recently. But now, the time has finally come for the announcement.

![Web Maker 4.0](/images/blog/wm4-hero.png)

**I present to you -- Web Maker 4.0**! I made a short video for this launch :) Hope you'll enjoy this, as much as I do!

<iframe width="100%" height="400" src="https://www.youtube.com/embed/77mJCq63F8s" frameborder="0" allowfullscreen></iframe>

Here is a quick drill down of what's new.

## New Home

Web Maker now lives on [https://webmaker.app](https://webmaker.app). **The old website will continue to run for a month or so, but will eventually start redirecting to the new website.** If you have an online account in Web Maker, you need not worry, just login on the new website and you are set. But if you have some locally saved creations, you should export and import them to the new website.

## Files Mode

This is the biggest and most exciting thing I have been working on. You can now work with files just like you do in your local environment! No more working in just 3 separate panes. "Files Mode" is in beta and you can currently only save 2 creations in this mode.

This was so exciting to develop because to the users it seems like they are creating normal files. But actually, there isn't any file system at all. It's all virtual and it all works offline!

## Command Palette

My favourite accessibility enhancer. Common operations in the app can now be done with more speed and just keyboard, thanks to the new Command Palette. This works just like you would have seen in VSCode. _Command/Ctrl+P_ to switch files and _Command/Ctrl+Shift+P_ to take UI actions.

## Improved Console

Console inspection becomes more powerful. You can view nested objects, arrays and even DOM Elements! A huge thanks to [Xiaoyi Chen](https://twitter.com/chxy) for his [react-inspector](https://github.com/xyc/react-inspector) project.

## Monaco Editor

This one was tough but I somehow managed to get it working. You can choose to use Monaco instead of CodeMirror editor from Settings/Editor. Though, this is still an experimental feature and might contain bugs. Lots of more things to do here.

## Prettier

There is now an option to format your code with everybody's favourite [Prettier](https://prettier.io/).

## Documentation

I have a new and better system installed for documentation now -- [https://webmaker.app/docs/](https://webmaker.app/docs/). And in the coming days, the documentation will be extensively updated.

## More awesomeness

While you resize the preview, the preview dimensions show up for more control.

Settings screen got a complete makeover and now it's much easier to find what you are looking for.

The app is now more accessible than ever. There are significant improvements mainly in the area of keyboard navigation.

## What next?

### Chrome Extension

All the above things are not released in the Chrome extension. Next, I'll be working on getting them inside the extension as well.

There are still few bugs here and there which I need to iron out. Plus, I have lots more ideas that I'll be working on next to make existing features more usable. I also want to work towards making Web Maker completely screen reader accessible.

Remember, I work alone on Web Maker with the help of [contributions from awesome developers](https://github.com/chinchang/web-maker/graphs/contributors) from all around the world. So if you want to help to make Web Maker better, [Web Maker is open-source](https://github.com/chinchang/web-maker) and you are most welcome :)

If you face any issue, please [report on Github](https://github.com/chinchang/web-maker/issues) or tweet out to [@webmakerApp](https://twitter.com/webmakerApp).

Until next release!
