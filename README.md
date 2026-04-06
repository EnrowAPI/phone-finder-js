# Phone Finder - JavaScript Library

[![npm version](https://img.shields.io/npm/v/phone-finder.svg)](https://www.npmjs.com/package/phone-finder)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/EnrowAPI/phone-finder-js)](https://github.com/EnrowAPI/phone-finder-js)
[![Last commit](https://img.shields.io/github/last-commit/EnrowAPI/phone-finder-js)](https://github.com/EnrowAPI/phone-finder-js/commits)

Find mobile phone numbers from LinkedIn profiles or a name and company. Integrate phone discovery into your sales outreach or enrichment pipeline.

Powered by [Enrow](https://enrow.io) -- only charged when a phone number is found.

## Installation

```bash
npm install phone-finder
```

Requires Node.js 18+. Zero dependencies.

## Simple Usage

### Search by LinkedIn URL (preferred)

```typescript
import { findPhone, getPhoneResult } from 'phone-finder';

const search = await findPhone({
  apiKey: 'your_api_key',
  linkedinUrl: 'https://www.linkedin.com/in/timcook/',
});

const result = await getPhoneResult('your_api_key', search.id);

console.log(result.number);        // +14155551234
console.log(result.country);       // US
console.log(result.qualification); // found
```

### Search by name and company

```typescript
const search = await findPhone({
  apiKey: 'your_api_key',
  fullName: 'Tim Cook',
  companyDomain: 'apple.com',
});
```

`findPhone` returns a search ID. The search runs asynchronously -- call `getPhoneResult` to retrieve the result once it's ready. You can also pass a `webhook` URL to get notified automatically.

## Search by company name

If you don't have the domain, you can search by company name instead.

```typescript
const search = await findPhone({
  apiKey: 'your_api_key',
  fullName: 'Tim Cook',
  companyName: 'Apple Inc.',
});
```

## Bulk search

```typescript
import { findPhones, getPhoneResults } from 'phone-finder';

const batch = await findPhones({
  apiKey: 'your_api_key',
  searches: [
    { linkedinUrl: 'https://www.linkedin.com/in/timcook/' },
    { fullName: 'Satya Nadella', companyDomain: 'microsoft.com' },
    { fullName: 'Jensen Huang', companyName: 'NVIDIA' },
  ],
});

// batch.batchId, batch.total, batch.status

const results = await getPhoneResults('your_api_key', batch.batchId);
// results.results -- array of PhoneResult
```

Up to 5,000 searches per batch. Pass a `webhook` URL to get notified when the batch completes.

## Error handling

```typescript
try {
  await findPhone({ apiKey: 'bad_key', linkedinUrl: 'https://www.linkedin.com/in/test/' });
} catch (error) {
  // error.message contains the API error description
  // Common errors:
  // - "Invalid or missing API key" (401)
  // - "Your credit balance is insufficient." (402)
  // - "Rate limit exceeded" (429)
}
```

## Getting an API key

Register at [app.enrow.io](https://app.enrow.io) to get your API key. You get **50 free credits** with no credit card required.

50 credits per phone found (only charged when found). Paid plans start at **$17/mo** for 20 phones up to **$497/mo** for 2,000 phones. See [pricing](https://enrow.io/pricing).

## Documentation

- [Enrow API documentation](https://docs.enrow.io)
- [Full Enrow SDK](https://github.com/EnrowAPI/enrow-js) -- includes email finder, email verifierand more

## License

MIT -- see [LICENSE](LICENSE) for details.
