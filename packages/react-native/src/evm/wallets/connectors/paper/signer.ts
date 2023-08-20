import { getExistingUserEtherJsWallet } from "./helpers/wallet/retrieval";

export async function getEthersSigner({ clientId }: { clientId: string }) {
  const wallet = await getExistingUserEtherJsWallet(clientId);
  return wallet;
}
