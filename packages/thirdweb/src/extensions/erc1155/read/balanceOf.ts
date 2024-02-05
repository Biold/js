import { readContract } from "../../../transaction/actions/read.js";
import type { TxOpts } from "../../../transaction/transaction.js";

export type BalanceOfParams = {
  address: string;
  tokenId: bigint;
};

/**
 * Retrieves the next token ID to be minted in an ERC1155 contract.
 * @param options - The transaction options.
 * @returns A promise that resolves to the next token ID as a bigint.
 * @example
 * ```ts
 * import { nextTokenIdToMint } from "thirdweb/extensions/erc1155";
 * const nextTokenId = await nextTokenIdToMint({ contract });
 * ```
 */
export function balanceOf(options: TxOpts<BalanceOfParams>): Promise<bigint> {
  return readContract({
    ...options,
    method:
      "function balanceOf(owner address, tokenId uint256) view returns (uint256)",
    params: [options.address, options.tokenId],
  });
}