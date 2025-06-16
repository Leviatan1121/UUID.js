# Welcome to UUID.js 👋
![language](https://img.shields.io/badge/language-JavaScript-yellow.svg) ![version](https://img.shields.io/badge/version-2.0.0-blue.svg)

> A lightweight and powerful JavaScript library for generating UUIDs with advanced recycling and sequential features.

Leave a ⭐️ if you liked this project!

### 📑 Table of Contents
- [About](#ℹ%EF%B8%8F-about)
- [Features](#-features)
- [Installation](#-installation)
- [Usage/Examples](#-usageexamples)

## ℹ️ About
UUID.js is a simple and lightweight JavaScript library for generating universally unique identifiers (UUIDs).

With its flexible recycling system and sequential generation capabilities, it provides a powerful solution for managing unique identifiers in any JavaScript environment.

## ✨ Features

- Generate sequential UUIDs with your own character set
- Recycle and reuse UUIDs when needed
- Limit how many UUIDs to generate
- Keep track of used and available UUIDs
- Compare UUIDs easily
- Reset the generator to its initial state
- Works in both Node.js and browsers
- Lightweight and simple to use

## 📦 Installation
Installing the UUID generator in your application is as simple as it should be.

Depending on what you work with or what you need, we have different installation methods.

#### Install with npm
```bash
npm i @levihub/uuid
```

#### As an inline script (browser)
```html
<script src="https://uuid.levihub.dev/uuid.js"></script>
```

#### As a module (browser)
```javascript
import UUID from "https://uuid.levihub.dev/uuid.mjs";
```

## 💻 Usage/Examples

#### Import (Node.js)
Once installed with npm package manager, you need to import the package in order to use it.

```javascript
const UUID = require("@levihub/uuid"); // Common JS
// or 
import UUID from "@levihub/uuid"; // ES Modules
```

#### Create a new instance
For using the UUID class, you have to create an instance of it first. You can customize the character set during instantiation:

```javascript
// Use default character set (0-9, A-Z, a-z)
const uuid = new UUID();

// Or use your own character set
const binaryUuid = new UUID("01"); // Only 0 and 1
const hexUuid = new UUID("0123456789ABCDEF"); // Hexadecimal
```

#### Generate UUIDs
The basic usage is simple - just call generate to get a new UUID. You can either let the generator keep track of the last UUID or provide one to get the next in sequence:

```javascript
const uuid = new UUID();

// Let the generator keep track (default behavior)
const id = uuid.generate();     // gets "0"
const next = uuid.generate();   // gets "1"
const another = uuid.generate(); // gets "2"

// Or provide an UUID to get the next one
const next_after_A = uuid.generate("A");  // gets "B"
const next_after_z = uuid.generate("z");  // gets "00"
const next_after_9 = uuid.generate("9");  // gets "A"
```


#### UUID Reuse System
The library provides a flexible system for reusing UUIDs. You can control this behavior in two ways:

1. **Global Settings** - Configure how reuse works by default:
```javascript
const uuid = new UUID();

// Control the order of reused UUIDs
uuid.ordered_unused_uuids = true;  // Reuse in order (default)
// or
uuid.ordered_unused_uuids = false; // First in, first out

// Control if reuse is enabled by default
uuid.reuse_by_default = true;  // Try to reuse by default (default)
// or
uuid.reuse_by_default = false; // Always generate new by default
```

2. **Per-Generation Control** - Override the default behavior for specific generations:
```javascript
// Generate with default behavior (uses reuse_by_default setting)
const id1 = uuid.generate();

// Force reuse of recycled UUIDs
const id2 = uuid.generate(null, true);

// Force new UUID generation
const id3 = uuid.generate(null, false);
```

#### Recycling UUIDs
When you're done with an UUID, you can recycle it for future use:

```javascript
const uuid = new UUID();

// Generate some UUIDs
const first = uuid.generate();  // gets "0"
const second = uuid.generate(); // gets "1"

// Recycle them when no longer needed
uuid.reuse(second);
uuid.reuse(first);

// Next generation will use recycled UUIDs based on your settings
const reused = uuid.generate(); // If ordered: gets "0", if unordered: gets "second"
```

#### Check UUID Status
Monitor your UUID usage and available recycled UUIDs:

```javascript
console.log(uuid.current_uuids);      // how many UUIDs are in use
console.log(uuid.unused_uuids_count); // how many are ready to reuse
console.log(uuid.unused_uuids);       // list of recycled UUIDs
```

#### Set a limit for generating UUIDs
You can set a limit to how many UUIDs you want to generate.

```javascript
uuid.limit = 1000; // Will stop generating after 1000 UUIDs
```

#### Compare UUIDs
Need to compare two UUIDs? We've got you covered:

```javascript
const result = uuid.compare("A1", "B2"); // Returns -1, 0, or 1
```

#### Reset the Generator
Want to start fresh? The reset method will clear all state and return the generator to its initial configuration:

```javascript
const uuid = new UUID();

// Generate some UUIDs
uuid.generate(); // "0"
uuid.generate(); // "1"
uuid.reuse("0"); // Recycle "0"

// Reset everything
uuid.reset();

// Now we're back to the beginning
uuid.generate(); // "0"
uuid.unused_uuids_count; // 0
uuid.current_uuids; // 1
```