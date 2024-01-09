import type { Chain } from "../src/types";
export default {
  "chain": "Etherlink",
  "chainId": 128123,
  "explorers": [
    {
      "name": "Explorer",
      "url": "https://testnet-explorer.etherlink.com/",
      "standard": "EIP1559"
    }
  ],
  "faucets": [],
  "features": [],
  "icon": {
    "url": "ipfs://QmVqE4wq3fd3RKZwo7GxmW333ywHgYBZGvqwh3TUBM5DUi",
    "width": 3600,
    "height": 3600,
    "format": "PNG"
  },
  "infoURL": "https://node.ghostnet.etherlink.com",
  "name": "Etherlink Testnet",
  "nativeCurrency": {
    "name": "tez",
    "symbol": "XTZ",
    "decimals": 18
  },
  "networkId": 128123,
  "parent": {
    "type": "Etherlink",
    "chain": "Etherlink",
    "bridges": []
  },
  "redFlags": [],
  "rpc": [],
  "shortName": "etlt",
  "slug": "etherlink-testnet",
  "testnet": true
} as const satisfies Chain;