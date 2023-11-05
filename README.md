# Welcome to UUID 👋

UUID.js is a simple and lightweight JavaScript library for generating universally unique identifiers (UUIDs).

It provides an easy and efficient way to create unique identifiers for various applications.

Whether you're working in a Node.js environment or embedding it directly in your HTML with a script tag, UUID.js is a straightforward solution for generating UUIDs.

### Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage/Examples](#usageexamples)

## Features

- Generate UUIDs
- If needed, recycle or reuse any UUID
- Set the character set for your UUIDs
- Limit the maximum amount of UUIDs to generate
- Check how many UUIDs are you using or available
- Check the UUIDs available
- Simple and lightweight
- Easy to install and use



## Installation
Installing the UUID generator in your application is as simple as it should be.

Depending on what you work with or what you need, we have different installation methods.

#### Install with npm
```bash
npm i @levihub/uuid
```

#### As an inline script (browser)
```html
<script src="https://uuid.levihub.dev/dist/uuid.js"></script>
```

#### As a module (browser)
```javascript
import UUID from "https://uuid.levihub.dev/dist/uuid.mjs";
```

## Usage/Examples

#### Import (Node only)
Once installed with npm package manager, you need to import the package in order to use it.

```javascript
const UUID = require("uuid"); // Common JS
// or 
import UUID from "uuid"; // ES Modules
```

#### Create a new instance
For using the UUID class, you have to create an instance of it first.

```javascript
const generator = new UUID();
```

#### Generate new UUID
```javascript
var userId = generator.newUUID();
```

#### Recycle/Reuse an existing UUID
From the moment you pass the generated UUID back to the generator to reuse it again, the generator push it into a list of unused UUIDs.

This list will have priority over creating new UUIDs.

```javascript
generator.reuse(uuidToReuse);
```

A more detailed example:

```javascript
const generator = new UUID();

var first = generator.newUUID(); // returns 0
var second = generator.newUUID(); // returns 1

// we push an UUID to a list of unused UUIDs
generator.reuse(first); // tells the generator that "first" UUID is available

// we generate a "new" one (the recycled one comes first)
var reused = generator.newUUID(); // returns 0 (the "first" UUID)

// we generate another one (the unused list is empty)
var next = generator.newUUID(); // returns 2 (we get the next one)
```

#### Check total used and unused UUIDs
You can check how many UUIDs do you have in use by the generator or how many are available to reuse.
You can check too the UUIDs that are waiting to be reused. (If there is any)

```javascript
generator.totalUsed; // returns total UUIDs used
generator.totalUnused; // returns total UUIDs available to reuse
generator.unusedUUIDs; // returns the list of reusable UUIDs
```

#### Changing the character set and limit for generating UUIDs
You can specify the set of characters for generating UUIDs.
```javascript
generator.charSet = [ "A", "B", "C" ];
```

You can also set a limit to how many UUIDs you want to generate.
```javascript
generator.limit = 50;
```

A more detailed example:
```javascript
generator.charSet = [ "A", "k" ]; // UUIDs will have only "A" and "k" characters
generator.limit = 50; // it will not generate more than 50 UUIDs

for (let i = 0; i < 100; i++) { // we try to generate 100 UUIDs
  let id = generator.newUUID(); // returns string or false 

  if (id) { // if it is NOT false (an UUID has been generated)
    console.log(`The UUID '${id}' has been generated.`);
  } else { // if it is false (UUID has not been generated)
    console.log(`${generator.totalUsed} UUIDs generated. Limit reached.`);
    break;
  }
}
```
