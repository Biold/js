import type { Chain } from "../src/types";
export default {
  "chain": "SHT",
  "chainId": 1177,
  "explorers": [
    {
      "name": "Smart Host Teknoloji TESTNET Explorer",
      "url": "https://s2.tl.web.tr:4000",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "features": [
    {
      "name": "EIP155"
    },
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://smart-host.com.tr",
  "name": "Smart Host Teknoloji TESTNET",
  "nativeCurrency": {
    "name": "Smart Host Teknoloji TESTNET",
    "symbol": "tSHT",
    "decimals": 18
  },
  "networkId": 1177,
  "rpc": [
    "https://1177.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://s2.tl.web.tr:4041"
  ],
  "shortName": "sht",
  "slip44": 1,
  "slug": "smart-host-teknoloji-testnet",
  "testnet": true
} as const satisfies Chain;