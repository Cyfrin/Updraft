## Fetching and Displaying Active NFT Listings with `useQuery`

This lesson focuses on refactoring how we fetch and display Non-Fungible Tokens (NFTs) in our decentralized application (dApp). We'll move away from potentially complex `useEffect` and `useState` combinations for managing server state and embrace the power of TanStack Query (often referred to as React Query) through its `useQuery` hook. Our goal is to fetch recently listed NFTs, filter out those that have already been bought or cancelled, and display only the currently active listings, making each NFT clickable for navigation.

### The Challenge: Showing Only Available NFTs

When building an NFT marketplace, simply fetching all items that have ever been listed isn't sufficient. A user browsing the marketplace needs to see NFTs that are *actually* available for purchase. Events like `ItemBought` or `ItemListCancelled` mean a previously listed NFT is no longer for sale. Our front end needs to account for this by fetching data about listed, bought, and cancelled items and then filtering the listed items accordingly.

### Strategy: `useQuery`, Custom Hooks, and Memoization

To solve this efficiently and maintainably, we'll employ the following strategy:

1.  **`useQuery` for Data Fetching:** We'll use the `useQuery` hook to handle the asynchronous fetching of NFT data from our GraphQL backend. `useQuery` simplifies managing loading states, error handling, caching, and background refetching.
2.  **Custom Hook (`useRecentlyListedNFTs`):** To keep our component logic clean and promote reusability, we'll encapsulate the data fetching and filtering logic within a custom React hook.
3.  **Efficient Filtering:** We'll fetch lists of listed, bought, and cancelled NFTs. Using JavaScript `Set` data structures, we'll efficiently determine which listed NFTs are still active.
4.  **Memoization (`useMemo`):** Filtering large lists can be computationally intensive. We'll use the `useMemo` hook to cache the result of our filtering logic, ensuring it only recalculates when the underlying fetched data changes, optimizing performance.

### Implementing the `useRecentlyListedNFTs` Custom Hook

Let's build the custom hook responsible for fetching and processing our NFT data.

**1. Setting up `useQuery`:**

The core of our hook is the `useQuery` call. It needs a unique `queryKey` to identify this specific data in the cache and a `queryFn` which is the asynchronous function that performs the data fetching.

```typescript
import { useQuery } from '@tanstack/react-query'; // Or your specific import path
import { useMemo } from 'react';

// Assume fetchNFTs is defined elsewhere and fetches data from /api/graphql
// Assume NFTQueryResponse interface is defined based on GraphQL schema

function useRecentlyListedNFTs() {
  const { data, isLoading, error } = useQuery<NFTQueryResponse>({
    // queryKey: An array used by React Query to cache and manage this query.
    queryKey: ["recentNFTs"],
    // queryFn: The async function that resolves with the data or throws an error.
    queryFn: fetchNFTs,
    // Options like refetchInterval can be added here if needed
  });

  // ... Filtering logic using useMemo will go here ...

  // We'll return isLoading, error, and the processed data list later
}
```

**2. Data Fetching (`fetchNFTs` and `NFTQueryResponse`):**

The `fetchNFTs` function (assumed to exist) typically makes a POST request to our GraphQL endpoint (`/api/graphql`). It sends a query designed to retrieve the necessary lists. The response shape is crucial and should be typed using an interface like `NFTQueryResponse`:

```typescript
// Example structure for the GraphQL response data
interface NFTItem {
  nftAddress: string;
  tokenId: string;
  price: string;
  seller: string;
  // ... other relevant fields
}

interface BoughtCancelled {
  nftAddress: string;
  tokenId: string;
}

interface NFTQueryResponse {
  data: {
    // Note: Ensure these names match your GraphQL schema exactly!
    allItemListed: {
      nodes: NFTItem[];
    };
    allItemBoughts: {
      nodes: BoughtCancelled[];
    };
    allItemCancelleds: {
      nodes: BoughtCancelled[];
    };
  };
}

// fetchNFTs function example (simplified)
async function fetchNFTs(): Promise<NFTQueryResponse> {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_RECENT_NFTS /* Your GraphQL query string */ }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
```

**3. Filtering Logic with `useMemo`:**

Inside our `useRecentlyListedNFTs` hook, after the `useQuery` call, we process the `data`. We use `useMemo` to ensure this filtering logic only runs when the `data` object actually changes.

```typescript
// Inside useRecentlyListedNFTs hook...

const nftDataList = useMemo(() => {
  // If data hasn't loaded yet, or the nested structure is missing, return empty.
  // Optional chaining (?.) provides safety against runtime errors.
  if (!data?.data?.allItemListed?.nodes) {
    return [];
  }

  // Create Sets for efficient O(1) average time complexity lookups.
  // Use unique identifiers combining address and token ID.
  const boughtNFTs = new Set<string>();
  data.data.allItemBoughts?.nodes.forEach((item) => {
    if (item.nftAddress && item.tokenId) {
      boughtNFTs.add(`${item.nftAddress}-${item.tokenId}`);
    }
  });

  const cancelledNFTs = new Set<string>();
  data.data.allItemCancelleds?.nodes.forEach((item) => {
    if (item.nftAddress && item.tokenId) {
      cancelledNFTs.add(`${item.nftAddress}-${item.tokenId}`);
    }
  });

  // Filter the listed NFTs. Keep only those NOT in the bought or cancelled sets.
  const activeNfts = data.data.allItemListed.nodes.filter((item) => {
    if (!item.nftAddress || !item.tokenId) return false; // Skip incomplete items
    const key = `${item.nftAddress}-${item.tokenId}`;
    return !boughtNFTs.has(key) && !cancelledNFTs.has(key);
  });

  // Optional: Limit the number of results if needed
  const recentActiveNfts = activeNfts.slice(0, 100);

  // Map the filtered data to the structure expected by our UI component (e.g., NFTBox).
  // Ensure prop names match what the component expects (e.g., contractAddress vs nftAddress).
  return recentActiveNfts.map((nft) => ({
    tokenId: nft.tokenId,
    contractAddress: nft.nftAddress, // Mapping nftAddress to contractAddress prop
    price: nft.price,
    seller: nft.seller, // Include other needed props
  }));

  // The dependency array tells useMemo to recompute ONLY when 'data' changes.
}, [data]);

// Return the memoized list and the query states.
return { isLoading, error, nftDataList };
```

### Utilizing the Hook in a React Component

Now, we can use our `useRecentlyListedNFTs` hook within our component (e.g., `RecentlyListedNFTs.tsx`) to display the active listings.

```typescript
import React from 'react';
import Link from 'next/link'; // Assuming Next.js for client-side navigation
import NFTBox from './NFTBox'; // Your component to display a single NFT
import useRecentlyListedNFTs from '../hooks/useRecentlyListedNFTs'; // Import the custom hook

export default function RecentlyListedNFTs() {
  // Call the custom hook to get data and state
  const { isLoading, error, nftDataList } = useRecentlyListedNFTs();

  // --- Production Considerations ---
  // In a real application, handle loading and error states explicitly:
  if (isLoading) {
    return <div>Loading recently listed NFTs...</div>;
  }
  if (error) {
    // Log the error for debugging
    console.error("Error fetching NFTs:", error);
    return <div>Error loading NFTs. Please try again later.</div>;
  }
  // --- End Production Considerations ---

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recently Listed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {nftDataList && nftDataList.length > 0 ? (
          nftDataList.map((nft) => (
            // Wrap each NFTBox with a Link for navigation
            <Link
              href={`/buy-nft/${nft.contractAddress}/${nft.tokenId}`}
              // Provide a unique key for the Link element
              key={`${nft.contractAddress}-${nft.tokenId}-link`}
            >
              {/* Render the NFTBox component with data from our filtered list */}
              <NFTBox
                // React requires a unique key for each item in a list for efficient updates.
                key={`${nft.contractAddress}-${nft.tokenId}`}
                tokenId={nft.tokenId}
                contractAddress={nft.contractAddress}
                price={nft.price}
                seller={nft.seller}
                // Pass any other required props to NFTBox
              />
            </Link>
          ))
        ) : (
          // Display a message if no active NFTs are found
          !isLoading && <div>No active NFT listings found.</div>
        )}
      </div>
    </div>
  );
}
```

**Key Points for Component Implementation:**

*   **Hook Usage:** Simply call `useRecentlyListedNFTs()` to get the processed data and state.
*   **Loading/Error States:** While skipped in the initial demo, always handle `isLoading` and `error` in production to provide user feedback.
*   **Mapping Data:** Use `.map()` on `nftDataList` to iterate over the active NFTs.
*   **Unique `key` Prop:** Assign a unique `key` to the outermost element returned within the map function (here, the `Link` component) and ideally also to the main component being rendered (`NFTBox`) if it helps React's reconciliation. A combination of `contractAddress` and `tokenId` usually guarantees uniqueness.
*   **Client-Side Navigation:** Use the `Link` component (or your router's equivalent) to wrap each `NFTBox`, creating a dynamic `href` that leads to a detailed view/purchase page for that specific NFT.

### Handling Development Environment Sync Issues

During local development, especially when working with a local blockchain node like Anvil and an indexer, you might encounter synchronization problems:

*   **Metamask State:** Your wallet (Metamask) might retain an old state (like nonce count or perceived block number) that becomes inconsistent after you reset your local blockchain. This can lead to RPC errors.
*   **Indexer Database:** The indexer's database might contain data from a previous chain state, showing NFTs that no longer exist on the reset chain.

**Common Workarounds:**

1.  **Restart Browser:** Often resolves Metamask state issues.
2.  **Reset Indexer:**
    *   Stop the indexer service (e.g., `docker-compose down`).
    *   Remove the indexer's database volume (e.g., `docker volume rm <your_volume_name>`). Be careful, this deletes the indexed data.
    *   Restart the indexer (e.g., `docker-compose up` or a custom start script like `rindexer start all`).

These steps help ensure your wallet, local blockchain, and indexer are all synchronized.

### Conclusion

By leveraging `useQuery` for robust data fetching and caching, encapsulating logic within a custom hook (`useRecentlyListedNFTs`), and using `useMemo` with efficient `Set`-based filtering, we've created a clean, performant, and maintainable solution for displaying *active* NFT listings in our dApp. This approach significantly improves upon manual state management with `useEffect` and `useState`, making our front-end code easier to reason about and scale.