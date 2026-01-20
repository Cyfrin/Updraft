## Implementing Frontend Wallet Compliance Checks via a Backend API

This lesson demonstrates how to integrate a crucial compliance check into your web3 frontend application, specifically using Next.js and React. The goal is to verify if a connected user's wallet address is permitted to interact with your application by querying a backend API, which in turn handles communication with a compliance service like Circle. This approach keeps sensitive API keys and complex logic off the client-side.

### The Core Concept: Secure Compliance Verification

Directly calling third-party compliance APIs from the frontend poses security risks (exposing API keys) and complexity challenges. A more robust pattern involves these steps:

1.  **Frontend:** Obtain the connected user's wallet address using a library like `wagmi`.
2.  **Frontend:** When the address is available or changes, trigger an API call to a dedicated backend endpoint within your Next.js application (e.g., `/api/compliance`). Pass the user's address in the request.
3.  **Backend (Assumed):** Your `/api/compliance` route receives the address, securely uses necessary API keys to query the actual compliance service (e.g., Circle), and determines the user's status (approved/denied).
4.  **Backend:** Send a simplified response back to the frontend, indicating whether the address is compliant (e.g., `{ success: true, isApproved: true }`).
5.  **Frontend:** Receive the response and update the application's state. Use this state to conditionally render the main application content or a denial message, effectively blocking non-compliant users.

### Implementation Steps in Next.js/React

We'll use React hooks (`useState`, `useEffect`) and the `useAccount` hook from `wagmi` to manage state and detect wallet connections. The `fetch` API will be used for communicating with our backend endpoint.

**1. Setting up State and Effects**

First, we need state to hold the compliance status and an effect to trigger the check when the user's address changes. We'll place this logic within a Client Component (marked with `"use client"`), as hooks are required. While initially considered for a specific page or the root layout, placing it in the main page component (`/app/page.tsx`) proved most practical due to Server Component limitations in the layout.

```jsx
"use client"; // Mark as a Client Component

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
// Import other necessary components, e.g., your main app content
// import RecentlyListedNFTs from "@/components/RecentlyListed";

export default function Home() {
  const { isConnected, address } = useAccount(); // Get connection status and address
  const [isCompliant, setIsCompliant] = useState(true); // Default to true, adjust if needed

  // Define the async function to perform the check
  async function checkCompliance() {
    if (!address) return; // Don't run if no address is connected

    try {
      const response = await fetch('/api/compliance', { // Call internal backend API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }), // Send the address
      });

      if (!response.ok) {
        // Handle API errors (e.g., backend down)
        console.error("Compliance API request failed:", response.statusText);
        setIsCompliant(false); // Assume non-compliant on error
        return;
      }

      const result = await response.json();
      // Update state based on the backend's response structure
      // Assuming the API returns { success: boolean, isApproved: boolean }
      setIsCompliant(result.success && result.isApproved);

    } catch (error) {
      console.error("Error calling compliance API:", error);
      setIsCompliant(false); // Assume non-compliant on fetch error
    }
  }

  // Use useEffect to trigger the check when the address changes
  useEffect(() => {
    if (isConnected && address) {
      // Address is available, perform the check
      checkCompliance();
    } else {
      // Optional: Reset compliance status if disconnected
      setIsCompliant(true); // Or false, depending on desired default state
    }
  }, [address, isConnected]); // Dependencies: run when address or connection status changes

  // ... rest of the component (conditional rendering)
}
```

**Key points in the code:**

*   **`"use client"`:** Essential for using hooks in Next.js App Router.
*   **`useAccount`:** Provides `isConnected` and `address` from `wagmi`.
*   **`useState(true)`:** Manages the `isCompliant` state. Defaulting to `true` shows content briefly before the check completes. Consider defaulting to `false` and showing a loading indicator for a stricter approach.
*   **`checkCompliance` Function:** An `async` function encapsulating the `fetch` logic. It's defined outside the `useEffect` callback.
*   **`fetch('/api/compliance', ...)`:** Sends a POST request to the internal backend route with the user's address in the JSON body. Includes basic error handling for the fetch request.
*   **`useEffect(...)`:**
    *   The effect runs when `address` or `isConnected` changes.
    *   It checks if an `address` exists before calling `checkCompliance`.
    *   **Important:** The `useEffect` callback itself is not `async`. It calls the separate `async` function `checkCompliance`.

**2. Handling Component Placement and Server/Client Boundaries**

A common challenge in Next.js App Router is understanding where client-side interactivity (like hooks) can live.

*   **Initial Idea (Specific Page):** Placing the logic in a component like `/app/buy-nft/[...]/page.tsx` works, but the check only runs on that specific page.
*   **Attempt 1 (Layout):** Moving the logic to `/app/layout.tsx` seems ideal for a global check. However, `layout.tsx` is a Server Component by default. Attempting to use `useState`, `useEffect`, or `useAccount` directly here will result in an error: *"You're importing a component that needs useState/useEffect... This React hook only works in a client component..."* While you *could* mark the entire layout as `"use client"`, it's often better to keep layouts as Server Components if possible and push client interactivity down the tree.
*   **Final Placement (Homepage/Entrypoint):** Placing the logic in the main entry point page (`/app/page.tsx`, which is often already a Client Component or easily made one with `"use client"`) provides a good balance. The check runs as soon as the user hits the main page and connects their wallet. For truly global enforcement across all routes, you might need a dedicated client-side wrapper component placed just inside the `<body>` in your layout, which then conditionally renders `{children}`.

**3. Conditional Rendering**

Finally, use the `isCompliant` state to control what the user sees.

```jsx
// Inside the return statement of the Home component from Step 1

export default function Home() {
  // ... hooks, state, effect, and checkCompliance function from above ...

  return (
    <main>
      {!isConnected ? (
        // Prompt user to connect if they haven't
        <div>Please connect your wallet to continue.</div>
      ) : (
        // User is connected, now check compliance status
        isCompliant ? (
          // Compliant: Render the main application content
          <div>
            <h1>Welcome to the App!</h1>
            {/* Example: <RecentlyListedNFTs /> */}
            {/* Add your main application components here */}
          </div>
        ) : (
          // Not Compliant: Show a denial message
          <div>
            <h1>Access Denied</h1>
            <p>Your connected wallet address is not permitted to use this application based on compliance checks.</p>
          </div>
        )
      )}
    </main>
  );
}
```

This structure ensures that:
*   Unconnected users are prompted to connect.
*   Connected users are checked for compliance.
*   Only compliant users see the main application features.
*   Non-compliant users are shown a clear denial message.

### Testing the Implementation

1.  Run your Next.js application (e.g., `pnpm run dev`).
2.  Ensure your backend `/api/compliance` endpoint is running and configured to approve/deny specific addresses based on your compliance rules (this might involve setting up mock responses or configuring a test environment with your chosen compliance service).
3.  Connect a wallet (e.g., MetaMask) with an address configured as **compliant** on your backend. Verify that the main application content loads after connection.
4.  Switch the connected wallet to an address configured as **non-compliant**. Observe that the `useEffect` triggers due to the address change, the `checkCompliance` function runs, the state updates to `false`, and the "Access Denied" message is displayed instead of the application content.

By following these steps, you can effectively integrate frontend compliance checks, enhancing the security and regulatory adherence of your web3 application while maintaining a clean separation between frontend presentation logic and backend security operations.
