---
title: 'Web Maker is now in Preact'
date: 2018-06-23
description: 'After 93 commits and 17913 new lines, Web Maker has been completely migrated from plain JavaScript to Preact.'
---

Hey all!

I am back with a big Web Maker release. But this time it isn't about any new functionality or fixes. It's about something that is not visible to any end-user, but affects them equally -- **the codebase**. After [93 commits and adding 17913 new lines](https://github.com/chinchang/web-maker/pull/303), **I have completely migrated the Web Maker code from plain JavaScript to [Preact](https://preactjs.com/)!**

## Why a framework and why Preact?

I started coding Web Maker in plain JavaScript, not because I couldn't work with any framework or because I didn't had the time to setup a framework. I consciously chose to write vanilla JavaScript because I wanted to see how far I could go without any external framework. And I am happy that it worked for almost 2 years! [Read more about how I built Web Maker](https://medium.freecodecamp.org/web-maker-how-i-built-a-fast-offline-front-end-playground-9fe3629bc86f) initially.

But recently I had started feeling that while building features, I was more focusing on writing UI glue code and maintaining it. Now that I have lots & lots of features in mind that I want to build, I don't want any sort of friction in the path to build them, so that I can release them very rapidly to the users. Hence, a framework.

And choosing Preact is simply because I have worked with Angular, Vue and React. Preact says it works like React in such a small file size! I wanted to try it out. Its a nice feeling to be able to build something so conveniently with a library with such a small footprint :) And the best part of working with JSX is that [Prettier](https://prettier.io/) formats it for me! I am happy I chose it.

## The Refactor

In this first phase of refactoring, I have ported everything into Preact components. But there is still some manual DOM manipulations happening inside components which can be removed. And also, lot of components can be further broken down into smaller components. All that in next phases of refactoring.

I am using simple prop passing and root component store to manage data. I think I can do better with state management without adding any library for that. Let's see.

For CSS, its the same `style.css` file being included in the HTML. No change there. But I plan to switch most values into CSS variables to allow customisation and theming.

Contrary to what I estimated before starting the refactor, the total size of code hasn't gone down. Upon a shallow inspection, it seems that the UI code removed with the framework got compromised with the library size + the code (render functions) that Preact generates for the HTML templates. But I will re-evaluate after few more refactoring passes.

## What next?

The refactor was so much fun! I realised I like refactoring much more than writing code. Now that it is complete, I am so excited and super-charged to build some really cool features in coming weeks. If you have any feature request or want to ask me anything related to porting a vanilla JS app to Preact (or React, it's similar), [tweet me](https://twitter.com/cssMonk) or put in your comments here.

- Web Maker is open-source -- [https://github.com/chinchang/web-maker](https://github.com/chinchang/web-maker)
- Report a bug or request feature -- [https://github.com/chinchang/web-maker/issues](https://github.com/chinchang/web-maker/issues)
- Follow on twitter for updates and more -- [https://twitter.com/webmakerapp](https://twitter.com/webmakerapp)
