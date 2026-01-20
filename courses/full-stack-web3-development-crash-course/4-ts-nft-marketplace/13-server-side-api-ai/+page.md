## Securing External API Calls: Building a Server-Side Proxy in Next.js

Integrating third-party services often requires using API keys or other sensitive credentials. Exposing these directly in your frontend JavaScript code is a significant security risk, as they can be easily extracted by anyone inspecting the browser's traffic or source code. The secure solution is to create a server-side API endpoint within your application that acts as a proxy, handling the interaction with the external service safely on the backend.

This lesson demonstrates how to build such a server-side API route using the Next.js App Router. We'll create an endpoint that securely calls the Circle Compliance API to screen blockchain addresses, using AI assistance as a starting point and then refining the code for robustness and security.

## The Problem: Client-Side API Key Exposure

When you make an API call directly from your frontend code (e.g., within a React component), the request details, including headers containing API keys, are visible in the browser's network inspector. This makes your secret keys vulnerable to theft and misuse.

## The Solution: Next.js Server-Side API Routes

Next.js provides a powerful convention for creating backend API endpoints directly within your project structure. By placing a file named `route.ts` (or `route.js`) inside a directory under `/app/api/`, you define an API route. Crucially, the code within these `route.ts` files runs **exclusively on the server**, never in the client's browser.

This server-side execution environment is the perfect place to:

1.  Securely store and access API keys using environment variables.
2.  Make calls to external APIs without exposing credentials.
3.  Perform sensitive backend logic.

For our example, we'll create an endpoint at `/api/compliance` by creating the file `src/app/api/compliance/route.ts`.

## Managing Secrets with Environment Variables

Sensitive configuration like API keys should be stored in environment variables. Next.js has built-in support for `.env` files. For local development, we typically use `.env.local`.

-   Variables needed *only* on the server (like our `CIRCLE_API_KEY`) should **not** be prefixed with `NEXT_PUBLIC_`. They are accessed via `process.env.YOUR_VARIABLE_NAME`.
-   Variables intended to be exposed to the browser *must* be prefixed with `NEXT_PUBLIC_`.

We'll store our Circle API key and a feature flag in `.env.local`:

```env
# .env.local
CIRCLE_API_KEY=YOUR_ACTUAL_CIRCLE_API_KEY_HERE
ENABLE_COMPLIANCE_CHECK=true
```

## Essential Tools and Concepts

Before building the route, let's understand a few key pieces:

1.  **Fetch API:** The standard browser and NodeJS interface for making HTTP requests. We'll use `fetch` within our server-side route to call the external Circle API.
2.  **UUID (Universally Unique Identifier):** Many APIs, including Circle's, require an `idempotencyKey` for POST requests to prevent accidental duplicate operations. We'll use the `uuid` library to generate these unique keys.
3.  **Feature Toggling:** The `ENABLE_COMPLIANCE_CHECK` environment variable acts as a feature flag. This allows us to easily disable the actual call to the Circle API during development or testing, preventing unnecessary API usage or reliance on the external service being available.

## Implementing the Compliance API Route

Let's build the secure server-side endpoint.

**1. Create the File Structure:**

Ensure you have the following directory structure within your Next.js project:

```
src/
└── app/
    └── api/
        └── compliance/
            └── route.ts
```

**2. Install Dependencies:**

If you haven't already, install the `uuid` package and its types (if using TypeScript):

```bash
# Using pnpm (adjust for npm or yarn if needed)
pnpm add uuid
pnpm add -D @types/uuid
```

**3. Configure Environment Variables:**

As mentioned earlier, create or update your `.env.local` file in the project root with your Circle API key and the feature flag:

```env
# .env.local
CIRCLE_API_KEY=YOUR_ACTUAL_CIRCLE_API_KEY_HERE
ENABLE_COMPLIANCE_CHECK=true
```
*Remember to replace `YOUR_ACTUAL_CIRCLE_API_KEY_HERE` with your real key. Never commit `.env.local` to version control.*

**4. Write the API Route Handler (`route.ts`):**

Now, let's implement the logic within `src/app/api/compliance/route.ts`. The following code demonstrates receiving a request from our frontend, securely calling the Circle API, and returning a structured response. Note the use of standard Web API `Request` and `Response` objects, which are fully supported in Next.js API routes.

```typescript
// src/app/api/compliance/route.ts
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

// Handles POST requests to /api/compliance
export async function POST(request: Request) { // Use standard Request type
    try {
        // 1. Get address from request body
        // Assumes the client sends a JSON body like: { "address": "0x..." }
        const { address } = await request.json();

        // 2. Validate input: Ensure address is provided
        if (!address) {
            return Response.json( // Use standard Response.json
                { error: 'Address is required', success: false },
                { status: 400 } // Bad Request status
            );
        }

        // 3. Feature Flag Check: See if the compliance check is enabled
        const complianceEnabled = process.env.ENABLE_COMPLIANCE_CHECK === 'true';
        if (!complianceEnabled) {
            console.log('Compliance check is disabled via environment variable.');
            // Return a default success response indicating approval (useful for dev/testing)
            return Response.json({
                success: true,
                isApproved: true,
                data: { result: "APPROVED", message: "Compliance check is disabled" }
            });
        }

        // 4. Securely Retrieve API Key: Get key from server-side environment variables
        const circleApiKey = process.env.CIRCLE_API_KEY;
        if (!circleApiKey) {
            console.error('Server configuration error: CIRCLE_API_KEY is not set.');
            return Response.json( // Use standard Response.json
                { error: 'Server configuration error', success: false },
                { status: 500 } // Internal Server Error status
            );
        }

        // 5. Prepare for External API Call
        const idempotencyKey = uuidv4(); // Generate a unique key for the request
        const chain = 'ETH-SEPOLIA'; // Define the blockchain (can be dynamic if needed)
        const circleApiUrl = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';

        console.log(`Calling Circle API for address: ${address} with key: ${idempotencyKey}`);

        // 6. Make the Server-Side Fetch Call to Circle API
        const circleResponse = await fetch(circleApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // The API key is securely added here, never exposed to the client
                'Authorization': `Bearer ${circleApiKey}`,
            },
            body: JSON.stringify({
                idempotencyKey,
                address,
                chain, // Using object shorthand for { chain: chain }
            }),
        });

        // 7. Process the External API Response
        const responseData = await circleResponse.json(); // Parse the JSON response from Circle

        // Check if the API call itself was successful (e.g., status 2xx)
        if (!circleResponse.ok) {
           console.error('Circle API Error:', circleResponse.status, responseData);
           // Propagate a meaningful error based on Circle's response if possible
           return Response.json(
               { error: `Circle API request failed: ${responseData.message || circleResponse.statusText}`, success: false, details: responseData },
               { status: circleResponse.status }
           );
        }

        // Determine approval status based on Circle's specific response structure
        // Adjust this logic based on the actual structure of `responseData` from Circle
        const isApproved = responseData?.result === 'APPROVED';

        console.log(`Circle API response for ${address}: Approved = ${isApproved}`);

        // 8. Return Structured Response to Client
        // Send back a consistent format including success status, approval, and original data
        return Response.json({
            success: true,
            isApproved: isApproved,
            data: responseData // Return the original data payload from Circle
        });

    } catch (error) {
        // 9. Handle Unexpected Internal Errors
        console.error('Internal server error in /api/compliance:', error);
        return Response.json( // Use standard Response.json
            { error: 'Internal server error', success: false },
            { status: 500 } // Internal Server Error status
        );
    }
}

```

## How to Use This API Route

From your frontend code (e.g., a React component), you would now make a `fetch` request to *your own* API endpoint (`/api/compliance`), **not** directly to the Circle API.

```javascript
// Example Frontend Usage (inside an async function)
async function checkAddressCompliance(addressToCheck) {
  try {
    const response = await fetch('/api/compliance', { // Call YOUR API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: addressToCheck }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('Compliance check successful:', result);
      // result.isApproved will be true or false
      // result.data contains the original response from Circle
      return result.isApproved;
    } else {
      console.error('Compliance check failed:', result.error || response.statusText);
      // Handle the error appropriately in the UI
      return false;
    }
  } catch (error) {
    console.error('Error calling compliance API:', error);
    // Handle network or other errors
    return false;
  }
}

// Example call:
// const isApproved = await checkAddressCompliance("0xa0Ee7A142d267C1f36714E4a8F75612F20a79720");
// console.log(`Address is approved: ${isApproved}`);
```

## Key Takeaways and Best Practices

1.  **Security First:** Never embed secret API keys directly in client-side code.
2.  **Server-Side Proxy:** Use Next.js API routes (`/app/api/.../route.ts`) to create secure server-side endpoints that interact with external services.
3.  **Environment Variables:** Store API keys and sensitive configuration in `.env.local` (or other appropriate `.env` files) and access them via `process.env` on the server. Do not use the `NEXT_PUBLIC_` prefix for server-only variables.
4.  **AI as a Tool:** AI code generation (like DeepSeek) can provide a useful starting point, but **always** critically review, test, and refactor the generated code to ensure it meets security standards, follows best practices, and fits your specific needs. Provide clear context (sample requests, requirements) to the AI for better results.
5.  **Feature Flags:** Use environment variables for feature toggling (e.g., `ENABLE_COMPLIANCE_CHECK`) to simplify development, testing, and debugging without relying on external dependencies or consuming API quotas.
6.  **Standard APIs:** Prefer using standard Web APIs like `Request`, `Response`, and `fetch` within your Next.js routes for better portability and understanding.
7.  **Consistent Responses:** Design your API routes to return consistent JSON structures for both success and error cases, making client-side handling easier.
8.  **Idempotency:** Use UUIDs or similar mechanisms for idempotency keys when required by external APIs to prevent duplicate actions.
9.  **Error Handling:** Implement robust `try...catch` blocks and check the responses from external API calls to handle errors gracefully.

By following this pattern, you create a secure bridge between your frontend application and external services, ensuring your sensitive credentials remain protected on the server.
