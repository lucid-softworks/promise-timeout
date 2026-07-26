# @lucid-softworks/promise-timeout

Apply a deadline to a promise-like value using the shared `TimeoutError`.
Underlying work is not cancelled.

```ts
import { promiseTimeout } from "@lucid-softworks/promise-timeout";

const request = fetch("https://example.com");
await promiseTimeout(request, 2_000);
```
