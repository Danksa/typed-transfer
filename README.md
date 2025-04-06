# typed-transfer

This is a proof of concept to explore the idea of creating schemas to be shared between two or more actors and allow sending data adhering to those schemas in a binary format. This is done using the TypeScript type system and at runtime instead of defining schemas in another format and generating types etc. with a command or similar.

It is not yet efficient at serializing in its current state (about 10x slower than `JSON.stringify` for a variety of schemas on my machine).

## How to use
### Basic Structure

The idea behind this library is that you have a common shared library, let's call it `@my-project/messages` which contains all `typed-transfer` schema definitions you want to use to communicate between your frontend (`@my-project/frontend`) and backend (`@my-project/backend`).

The usage is similar to how you'd define [TypeBox](https://github.com/sinclairzx81/typebox) types. Let's start with the basic example of transfering a name as a string:

``` ts
import { String } from 'typed-transfer/schema';

export const NameSchema = String();
```

To use it in your backend just import it and use its `serialize` function:

``` ts
import { NameSchema } from '@my-project/messages';
import express from 'express';

const app = express();
app.get('/name', (req, res) => {
    res.send(NameSchema.serialize('typed-transfer'));
});

app.listen(80);
```

Similarly the frontend code running in your browser might look like this:
``` ts
import { NameSchema } from '@my-project/messages';

const response = await fetch('http://localhost/name');
const name = NameSchema.deserialize(await response.arrayBuffer());

console.log('Received name:', name);
```

The same thing can be done with more complex types:
``` ts
import { Object, String, Int32, Array } from 'typed-transfer';

export const UserSchema = Object({
    name: String(),
    emailAddress: String()
});

export const GroupSchema = Object({
    users: Array(UserSchema),
    name: String()
});
```