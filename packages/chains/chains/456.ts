import type { Chain } from "../src/types";
export default {
  "chain": "ARZIO",
  "chainId": 456,
  "explorers": [
    {
      "name": "ARZIO Scan",
      "url": "https://scan.arzio.co",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://chain.arzio.co",
  "name": "ARZIO Chain",
  "nativeCurrency": {
    "name": "ARZIO",
    "symbol": "AZO",
    "decimals": 18
  },
  "networkId": 456,
  "rpc": [
    "https://456.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://chain-rpc.arzio.co"
  ],
  "shortName": "arzio",
  "slug": "arzio-chain",
  "testnet": false
} as const satisfies Chain;