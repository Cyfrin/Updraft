## Understanding GMX V2 Market Types and Auto-Deleveraging (ADL)

GMX V2 offers sophisticated trading capabilities built upon distinct market structures designed to accommodate various assets and manage risk effectively. Understanding these structures is crucial for traders and liquidity providers interacting with the platform. This lesson explores the two primary market types available on GMX V2 – Fully Backed Markets and Synthetic Markets – and explains the role of Auto-Deleveraging (ADL) as a key risk management mechanism, particularly relevant for synthetic offerings.

## Fully Backed Markets Explained

Fully Backed Markets on GMX V2 are designed with inherent solvency guarantees. In these markets, the total value of assets deposited by Liquidity Providers (LPs) into the specific market's pool is always sufficient to cover the maximum potential profits of all traders, regardless of how the price of the traded asset moves.

**Mechanism:** This guarantee is achieved by imposing strict limits on the total open interest (both long and short positions) allowed in the market. Specifically, the maximum allowable open interest for longs is capped below the total amount of the designated long backing token held in the pool, and the maximum short open interest is capped below the total amount of the short backing token.

**Example:** Consider an ETH perpetual market backed by ETH (as the long token) and USDC (as the short token).
*   **Pool Composition:** Suppose the pool contains 1000 ETH and 1,000,000 USDC.
*   **Open Interest Limits:** GMX might configure the market to allow a maximum long open interest equivalent to 900 ETH and a maximum short open interest equivalent to 900,000 USDC.
*   **Outcome:** Because the maximum potential payout obligations (the capped open interest) are strictly less than the available backing assets (1000 ETH and 1M USDC), the pool can always fulfill all profit payouts to traders, ensuring solvency under all price conditions for ETH.

## Synthetic Markets Explained

Synthetic Markets offer greater flexibility, allowing GMX V2 to list assets for trading even if the primary collateral tokens held by LPs are different. However, this structure introduces a specific type of risk that needs careful management.

**Definition:** In a Synthetic Market, the assets provided by LPs (particularly the token backing long positions) might not inherently be sufficient to cover the profits of long traders if the price of the *traded asset* (the index price) increases significantly more than the price of the *asset backing those long positions*.

**Mechanism & Risk:** The core risk arises from potential price divergence. Trader profits are calculated based on the price change of the asset they are trading (e.g., DOGE). However, these profits must be paid out from the pool's assets (e.g., ETH and USDC). If the traded asset's price experiences a much larger percentage gain than the collateral asset backing the winning positions, the pool's value might not grow quickly enough to cover the profit liabilities.

**Example:** Consider a DOGE perpetual market on GMX V2, backed by the same pool of 1000 ETH and 1,000,000 USDC.
*   **Pool Composition:** 1000 ETH (backing longs primarily) and 1M USDC (backing shorts primarily).
*   **Open Interest Limit:** Suppose the maximum *DOGE* long open interest is limited to an equivalent value of 300 ETH at the time of opening.
*   **Scenario:** Imagine a market event where the price of DOGE increases 10x. During the same period, the price of ETH (the asset backing those DOGE long positions) only increases 2x.
*   **Problem:** The profit liability owed to the DOGE long traders is calculated based on the 10x price increase of DOGE. However, the ETH held in the pool to cover these longs has only appreciated by 2x. This discrepancy means the value required to pay the DOGE longs' profits exceeds the current value of the ETH allocated to back them, creating a potential shortfall and threatening pool solvency.

## Auto-Deleveraging (ADL) - The Safety Mechanism

To manage the specific risks associated with Synthetic Markets and ensure the overall health of the GMX V2 protocol, a mechanism called Auto-Deleveraging (ADL) is employed.

**Purpose:** ADL acts as a crucial safety feature designed to prevent the pool insolvency scenario described above, where pending profits on positions (especially in synthetic markets) threaten to exceed the pool's capacity to pay.

**Mechanism:** The GMX system continuously monitors the pending profits of positions relative to the pool's capacity and pre-defined market thresholds. If the unrealized profits on a specific position grow large enough to exceed the "market's configured threshold" (indicating a potential risk to solvency based on the available backing assets), the ADL system automatically triggers.

**Action:** When triggered, ADL results in the partial or, in some cases, full closing of the excessively profitable position(s). The closing occurs at the current market price.

**Benefits:**
*   **Ensures Market Solvency:** By proactively reducing exposure when potential payouts risk exceeding available collateral backing, ADL prevents the total profit liability from depleting the pool's assets. It guarantees that GMX markets remain solvent.
*   **Guarantees Payouts:** ADL ensures that all profits accrued *up to the point of the ADL-triggered closing* can be fully paid out from the available assets in the pool. While a trader might have their position closed earlier than intended, the profits realized at that moment are secured.

In summary, GMX V2 utilizes two distinct market types. Fully Backed Markets offer inherent solvency through strict open interest caps relative to direct backing assets. Synthetic Markets allow trading a wider range of assets using different collateral but introduce price divergence risk. Auto-Deleveraging serves as the essential risk management tool for Synthetic Markets, protecting pool solvency and ensuring realized profits can always be paid by automatically closing positions that pose a risk due to excessive unrealized gains relative to the backing collateral's value.