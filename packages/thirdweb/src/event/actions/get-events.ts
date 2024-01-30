import type { Abi, AbiEvent } from "abitype";
import type { BlockTag } from "viem";
import { eth_getLogs, getRpcClient } from "../../rpc/index.js";
import { resolveAbiEvent } from "./resolve-abi.js";
import type { ContractEvent } from "../event.js";
import {
  resolveContractAbi,
  type ThirdwebContract,
} from "../../contract/index.js";

export type GetContractEventsOptions<
  abi extends Abi,
  abiEvent extends AbiEvent,
  contractEvent extends ContractEvent<abiEvent>,
  fBlock extends bigint | BlockTag,
  tBlock extends bigint | BlockTag,
> = {
  contract: ThirdwebContract<abi>;
  events?: contractEvent[];
  fromBlock?: fBlock;
  toBlock?: tBlock;
};

/**
 * Retrieves contract events from the blockchain.
 * @param options - The options for retrieving contract events.
 * @returns A promise that resolves to an array of contract events.
 * @example
 * ### Get all events for a contract
 * ```ts
 * import { getContractEvents } from "thirdweb/event";
 * const events = await getContractEvents({
 *  contract: myContract,
 *  fromBlock: 4375893n,
 *  toBlock: "latest"
 * });
 * ```
 *
 * ### Get specific events for a contract
 * ```ts
 * import { contractEvent, getContractEvents } from "thirdweb/event";
 * const myEvent = contractEvent({
 *  contract: myContract,
 *  event: "MyEvent",
 * });
 * const events = await getContractEvents({
 *  contract: myContract,
 *  events: [myEvent],
 *  fromBlock: 4375893n,
 *  toBlock: "latest"
 * });
 * ```
 */
export async function getEvents<
  const abi extends Abi,
  const abiEvent extends AbiEvent,
  const contractEvent extends ContractEvent<abiEvent>,
  const fBlock extends bigint | BlockTag,
  const tBlock extends bigint | BlockTag,
>(
  options: GetContractEventsOptions<
    abi,
    abiEvent,
    contractEvent,
    fBlock,
    tBlock
  >,
) {
  const rpcRequest = getRpcClient(options.contract);
  const parsedEvents = await (options.events
    ? Promise.all(options.events.map((e) => resolveAbiEvent(e)))
    : // if we don't have events passed then resolve the abi for the contract -> all events!
      (resolveContractAbi(options.contract).then((abi) =>
        abi.filter((item) => item.type === "event"),
      ) as Promise<AbiEvent[]>));

  // @ts-expect-error - fromBlock and toBlock ARE allowed to be undefined
  return await eth_getLogs(rpcRequest, {
    fromBlock: options.fromBlock,
    toBlock: options.toBlock,
    address: options.contract.address,
    events: parsedEvents,
  });
}