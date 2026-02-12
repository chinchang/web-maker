---
title: 'Free Online TypeScript Playground'
subtitle: 'Write TypeScript, compile to JavaScript instantly. Works offline. No setup required.'
shortName: 'TypeScript'
fileExt: 'ts'
accentColor: '#3178c6'
badgeText: 'JavaScript + Types'
sampleCode: |
  interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }

  function greetUser(user: User): string {
    return `Hello, ${user.name}!`;
  }

  const user: User = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    role: 'admin'
  };

  console.log(greetUser(user));
layout: playground.html
description: 'Free online TypeScript compiler and playground. Write TypeScript code and compile to JavaScript instantly. Works offline. Perfect for learning and prototyping.'
---

## What is TypeScript?

**TypeScript** is a strongly-typed superset of JavaScript developed by Microsoft. It adds optional static typing, interfaces, and modern ES features that compile down to plain JavaScript.

TypeScript helps catch errors at compile time, improves code documentation, and enables better tooling and IDE support.

## Why Use Web Maker for TypeScript?

- **Instant compilation** - See TypeScript compile to JavaScript as you type
- **Works offline** - Compile TypeScript locally, no server needed
- **Zero config** - No tsconfig.json, no npm, just code
- **Error highlighting** - See type errors before running
- **Modern output** - Compiles to ES6+ JavaScript

<h2 id="quick-reference">TypeScript Quick Reference</h2>

### Basic Types

```typescript
// Primitives
let name: string = 'Alice';
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Alice', 'Bob'];

// Tuple
let tuple: [string, number] = ['hello', 42];

// Any (escape hatch)
let flexible: any = 'could be anything';
```

### Interfaces

Define object shapes:

```typescript
interface User {
	id: number;
	name: string;
	email: string;
	avatar?: string; // Optional property
	readonly createdAt: Date; // Can't be modified
}

const user: User = {
	id: 1,
	name: 'Alice',
	email: 'alice@example.com',
	createdAt: new Date()
};
```

### Type Aliases

Create custom types:

```typescript
type ID = string | number;
type Status = 'pending' | 'approved' | 'rejected';
type Point = { x: number; y: number };

function processId(id: ID): void {
	console.log(`Processing ${id}`);
}
```

### Functions

Type your function parameters and returns:

```typescript
// Basic function
function add(a: number, b: number): number {
	return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function greet(name: string, greeting: string = 'Hello'): string {
	return `${greeting}, ${name}!`;
}

// Rest parameters
function sum(...numbers: number[]): number {
	return numbers.reduce((a, b) => a + b, 0);
}
```

### Generics

Write reusable, type-safe code:

```typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
	return arr[0];
}

const firstNum = first([1, 2, 3]); // number
const firstStr = first(['a', 'b']); // string

// Generic interface
interface Response<T> {
	data: T;
	status: number;
	message: string;
}

const userResponse: Response<User> = {
	data: {
		id: 1,
		name: 'Alice',
		email: 'alice@example.com',
		createdAt: new Date()
	},
	status: 200,
	message: 'Success'
};
```

### Classes

Object-oriented programming with types:

```typescript
class Animal {
	constructor(public name: string) {}

	speak(): void {
		console.log(`${this.name} makes a sound`);
	}
}

class Dog extends Animal {
	constructor(
		name: string,
		public breed: string
	) {
		super(name);
	}

	speak(): void {
		console.log(`${this.name} barks!`);
	}
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // "Rex barks!"
```

### Union and Intersection Types

Combine types flexibly:

```typescript
// Union: one of these types
type StringOrNumber = string | number;

function format(value: StringOrNumber): string {
	if (typeof value === 'string') {
		return value.toUpperCase();
	}
	return value.toFixed(2);
}

// Intersection: combine types
interface Named {
	name: string;
}
interface Aged {
	age: number;
}
type Person = Named & Aged;

const person: Person = { name: 'Alice', age: 30 };
```

## TypeScript vs JavaScript

| Feature       | JavaScript   | TypeScript     |
| ------------- | ------------ | -------------- |
| Static typing | No           | Yes            |
| Interfaces    | No           | Yes            |
| Generics      | No           | Yes            |
| Enums         | No           | Yes            |
| Compile step  | No           | Yes (to JS)    |
| IDE support   | Good         | Excellent      |
| Runtime       | Browser/Node | Compiles to JS |

## Common TypeScript Patterns

### Type Guards

Narrow types safely:

```typescript
interface Cat {
	meow(): void;
}
interface Dog {
	bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
	return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
	if (isCat(animal)) {
		animal.meow(); // TypeScript knows it's a Cat
	} else {
		animal.bark(); // TypeScript knows it's a Dog
	}
}
```

### Utility Types

Built-in type transformations:

```typescript
interface User {
	id: number;
	name: string;
	email: string;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;
```

### Mapped Types

Transform types programmatically:

```typescript
type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};

interface Config {
	apiUrl: string;
	timeout: number;
}

type NullableConfig = Nullable<Config>;
// { apiUrl: string | null; timeout: number | null }
```

## Frequently Asked Questions

### What TypeScript version does Web Maker use?

Web Maker uses a recent stable version of TypeScript that supports all modern features including template literal types, conditional types, and more.

### Can I use TypeScript with React/JSX?

Yes! Web Maker supports TSX (TypeScript + JSX). Select "TypeScript" as your JavaScript preprocessor and write React components with full type safety.

### Does Web Maker show TypeScript errors?

Yes, Web Maker highlights type errors in the editor, helping you catch mistakes before running your code.

### Can I import npm packages?

You can include libraries via CDN links in Web Maker. For type definitions, the compiler will accept the code and compile it to JavaScript.
