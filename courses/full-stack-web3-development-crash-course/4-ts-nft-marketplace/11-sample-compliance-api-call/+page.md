## Screening Blockchain Addresses with Circle's Compliance API

In the evolving landscape of web3, ensuring compliance with regulatory requirements is paramount. Applications interacting with blockchain transactions must often screen addresses to mitigate risks associated with illicit activities or sanctioned entities. Circle's Programmable Wallets product offers a robust Compliance Engine API designed precisely for this purpose. This lesson guides you through using the "Screen a blockchain address" endpoint to integrate essential compliance checks into your workflow.

We'll cover obtaining API keys, understanding compliance rules within the Circle Console, using watchlists, constructing an API request using cURL, and interpreting the results to determine if an address is approved or denied based on configured rules.

### Prerequisites: Setting Up Your Environment

Before making API calls, you need access to the Circle platform and authentication credentials.

1.  **Circle Account:** You'll need an account with Circle. For testing, you can use the Testnet environment available via the Circle Console (`console.circle.com`).
2.  **API Key:** Navigate to the "API & Client Keys" section within the Circle Console (ensure you're in the Testnet environment for testing). Generate a new API key. It's best practice to store this key securely, for example, in an environment file (`.env.local`) like `CIRCLE_API_KEY=TEST_API_KEY:e47e...`. **Never commit your API key directly into your codebase.**

### Understanding Compliance Rules and Watchlists

The Circle Compliance Engine evaluates addresses based on a hierarchy of rules configured within the Console:

1.  **Default Restrictive Rules:** These are Circle-enforced rules with the highest priority, checking against Circle's internal Sanctions Blocklist, your custom blocklist, and frozen wallet status. You cannot edit these.
2.  **Your Allowlist:** This is a user-managed list of addresses you explicitly trust. Addresses on this list can override *configurable* restrictive rules (but not the Default Restrictive Rules).
3.  **Configurable Restrictive Rules:** You can define rules to automatically deny interactions based on risk categories identified by Circle's partners (e.g., Severe Sanctions Risk, Severe Terrorist Financing Risk).
4.  **Configurable Alert-Only Rules:** These user-defined rules trigger alerts for monitoring purposes without automatically blocking the interaction (e.g., High Illicit Behaviour Risk, High Gambling Risk).

**Watchlists (Blocklist/Allowlist):** Within the "Compliance Engine" -> "Watchlists" section of the Console, you can manually add specific addresses to your custom `Blocklist` or `Allowlist`. For testing the "DENIED" scenario, we'll assume an address has been added to the `Blocklist`.

*   **Example: Adding to Blocklist (via Console UI)**
    *   Go to Compliance Engine -> Watchlists -> Blocklist.
    *   Click "Add a blocklist entry".
    *   Enter the `Blockchain address` (e.g., `0x9965507d1a55bcc2695C58ba16fb37d819b0a4dc`).
    *   Select a `Block reason` (e.g., `Unsupported`).
    *   Optionally add `Additional notes` (e.g., `Testing`).
    *   Save the entry.

This address will now be flagged by the Default Restrictive Rules.

### Using the Address Screening API Endpoint

The core of our task involves sending a `POST` request to the `/v1/w3s/compliance/screening/addresses` endpoint.

**API Endpoint:** `https://api.circle.com/v1/w3s/compliance/screening/addresses`
**Method:** `POST`

**Request Headers:**

*   `Content-Type: application/json`: Indicates the request body format.
*   `Authorization: Bearer YOUR_API_KEY`: **Crucial for authentication.** Replace `YOUR_API_KEY` with the actual key you obtained from the Circle Console. Note that some documentation examples might omit this header, but it is *required*.

**Request Body:**

The request body must be a JSON object containing:

*   `idempotencyKey` (string, UUID v4 recommended): A unique identifier for this specific request. If you send multiple identical requests (same method, path, body, *and* idempotency key), the server will only process it once and return the same cached response. **Generate a new, unique UUID v4 for every distinct screening operation.** You can use online tools like `uuidgenerator.net/version4` for testing.
*   `address` (string): The blockchain address you want to screen.
*   `chain` (string): The identifier for the blockchain network (e.g., `ETH-SEPOLIA` for Ethereum Sepolia testnet). Refer to Circle's documentation for valid chain identifiers.

**Constructing the cURL Command:**

We can use the command-line tool `cURL` to make the API request. Here's the general structure:

```bash
curl --request POST \
     --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer YOUR_API_KEY' \
     --data '{
       "idempotencyKey": "YOUR_UNIQUE_UUID_V4",
       "address": "BLOCKCHAIN_ADDRESS_TO_CHECK",
       "chain": "CHAIN_ID"
     }'
```

Remember to replace the placeholder values (`YOUR_API_KEY`, `YOUR_UNIQUE_UUID_V4`, `BLOCKCHAIN_ADDRESS_TO_CHECK`, `CHAIN_ID`) with your actual data. The backslashes (`\`) are used for multi-line formatting in Unix-like shells.

### Testing the API: Scenarios and Responses

Let's test two scenarios using `cURL`.

**Scenario 1: Screening a Blocked Address**

Assume we have added `0x9965507d1a55bcc2695C58ba16fb37d819b0a4dc` to our custom blocklist in the Circle Console. We'll use a unique `idempotencyKey`.

**cURL Command:**

```bash
# Replace YOUR_API_KEY with your actual Testnet key
# Generate a unique UUID for idempotencyKey
curl --request POST \
     --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer YOUR_API_KEY' \
     --data '{
       "idempotencyKey": "eea64b83-b369-4e62-830f-8db755774355",
       "address": "0x9965507d1a55bcc2695C58ba16fb37d819b0a4dc",
       "chain": "ETH-SEPOLIA"
     }'
```

**Expected JSON Response:**

```json
{
  "data": {
    "result": "DENIED",
    "decision": {
      "ruleName": "Your blocklist",
      "actions": [ "DENY", "REVIEW" ],
      "riskScore": "BLOCKLIST",
      "riskCategories": [ "UNSUPPORTED" ],
      "type": "OWNERSHIP",
      "screeningDate": "2025-03-28T18:15:00Z", // Example timestamp
      "id": "eea64b83-b369-4e62-830f-8db755774355", // Matches idempotencyKey
      "address": "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
      "chain": "ETH-SEPOLIA",
      "details": [ /* ... potential details ... */ ]
    },
    "reasons": [ /* ... potential reasons ... */ ],
    "sourceValue": "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
    // ... other potential fields ...
  }
}
```

**Interpretation:** The key field is `"result": "DENIED"`. The `decision` object provides context, showing `ruleName: "Your blocklist"`, confirming our custom blocklist entry triggered the denial. Your application logic should check for this `DENIED` result and prevent further interaction with this address.

**Scenario 2: Screening an Approved Address**

Now, let's screen a different address, `0xa0Ee7A142d267C1f36714E4a8F75612F20A79720`, which is *not* on our blocklist or flagged by other restrictive rules. **Crucially, we must use a *new*, unique `idempotencyKey` for this distinct check.**

**cURL Command:**

```bash
# Replace YOUR_API_KEY with your actual Testnet key
# Generate a NEW unique UUID for idempotencyKey
curl --request POST \
     --url https://api.circle.com/v1/w3s/compliance/screening/addresses \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer YOUR_API_KEY' \
     --data '{
       "idempotencyKey": "9c9621d0-b921-4fda-87e6-66b0c6f51fc8",
       "address": "0xa0Ee7A142d267C1f36714E4a8F75612F20A79720",
       "chain": "ETH-SEPOLIA"
     }'
```

**Expected JSON Response:**

```json
{
  "data": {
    "result": "APPROVED",
    "decision": {
      "screeningDate": "2025-04-01T00:04:58Z", // Example timestamp
      "id": "9c9621d0-b921-4fda-87e6-66b0c6f51fc8", // Matches idempotencyKey
      "address": "0xa0Ee7A142d267C1f36714E4a8F75612F20A79720",
      "chain": "ETH-SEPOLIA",
      "details": []
    }
  }
}
```

**Interpretation:** The key field here is `"result": "APPROVED"`. This indicates that the address did not trigger any blocking rules according to the Compliance Engine's configuration at the time of the check. Your application can proceed with interactions involving this address based on this result.

### Key Takeaways

*   Circle's Compliance Engine API (`/v1/w3s/compliance/screening/addresses`) allows developers to check blockchain addresses against configured compliance rules.
*   Authentication requires a valid API key passed in the `Authorization: Bearer YOUR_API_KEY` header.
*   Each screening request needs a unique `idempotencyKey` (UUID v4) to prevent duplicate processing and ensure distinct checks.
*   The API response indicates the outcome via the `result` field (`"DENIED"` or `"APPROVED"`).
*   The `decision` object in the response provides details about which rule was triggered (if any).
*   Compliance rules are evaluated hierarchically, with Default Rules (including custom blocklists) taking precedence.
*   Use the Circle Console (Testnet recommended for development) to manage API keys, configure rules, and maintain watchlists.

By integrating these checks, you can build more secure and compliant web3 applications, reducing exposure to risky or sanctioned addresses.

### Resources

*   **Circle Console:** `console.circle.com`
*   **Circle API Reference (Screening Endpoint):** `https://developers.circle.com/api-reference/w3s/compliance/screening/addresses`
*   **UUID v4 Generator (Example):** `https://www.uuidgenerator.net/version4`