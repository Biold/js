import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import type { AbiParameterToPrimitiveType } from "abitype";

/**
 * Represents the parameters for the "onSignerAdded" function.
 */
export type OnSignerAddedParams = {
  signer: AbiParameterToPrimitiveType<{ type: "address"; name: "signer" }>;
  creatorAdmin: AbiParameterToPrimitiveType<{
    type: "address";
    name: "creatorAdmin";
  }>;
  data: AbiParameterToPrimitiveType<{ type: "bytes"; name: "data" }>;
};

/**
 * Calls the "onSignerAdded" function on the contract.
 * @param options - The options for the "onSignerAdded" function.
 * @returns A prepared transaction object.
 * @extension ERC4337
 * @example
 * ```
 * import { onSignerAdded } from "thirdweb/extensions/erc4337";
 *
 * const transaction = onSignerAdded({
 *  signer: ...,
 *  creatorAdmin: ...,
 *  data: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function onSignerAdded(
  options: BaseTransactionOptions<OnSignerAddedParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x9ddbb9d8",
      [
        {
          type: "address",
          name: "signer",
        },
        {
          type: "address",
          name: "creatorAdmin",
        },
        {
          type: "bytes",
          name: "data",
        },
      ],
      [],
    ],
    params: [options.signer, options.creatorAdmin, options.data],
  });
}