## Usage/Examples

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

// we generate a new one (or and) the list of unused UUID list is empty now
var reused = generator.newUUID(); // returns 0 (the "first" UUID)

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
You can specify the set of character for generating UUIDs.
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
  }
}
```