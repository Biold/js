import {
  embeddedWalletMetadata,
  embeddedWallet,
} from "../../../wallets/embedded/core/wallet/index.js";
import type {
  ConnectUIProps,
  SelectUIProps,
  WalletConfig,
} from "../../types/wallets.js";
import { useScreenContext } from "../../ui/ConnectWallet/Modal/screen.js";
import { WalletEntryButton } from "../../ui/ConnectWallet/WalletSelector.js";
import { reservedScreens } from "../../ui/ConnectWallet/constants.js";
import {
  EmbeddedWalletFormUI,
  EmbeddedWalletFormUIScreen,
} from "./EmbeddedWalletFormUI.js";
import { EmbeddedWalletOTPLoginUI } from "./EmbeddedWalletOTPLoginUI.js";
import { EmbeddedWalletSocialLogin } from "./EmbeddedWalletSocialLogin.js";
import type {
  EmbeddedWalletAuth,
  EmbeddedWalletSelectUIState,
} from "./types.js";

export type EmbeddedWalletConfigOptions = {
  recommended?: boolean;
  auth: {
    options: EmbeddedWalletAuth[];
  };
};

/**
 * Integrate Embedded wallet into your app.
 * @param options - Options for configuring the Embedded wallet.
 * @example
 * ```tsx
 * <ThirdwebProvider
 *  client={client}>
 *  wallets={[ embeddedWalletConfig() ]}
 *  <App />
 * </ThirdwebProvider>
 * ```
 * @returns WalletConfig object to be passed into `ThirdwebProvider`
 */
export const embeddedWalletConfig = (
  options?: EmbeddedWalletConfigOptions,
): WalletConfig => {
  const defaultAuthOptions: EmbeddedWalletAuth[] = [
    "email",
    "google",
    "apple",
    "facebook",
  ];
  const authOptions = options?.auth.options || defaultAuthOptions;
  const hasEmail = authOptions.includes("email");
  const hasSocial =
    (hasEmail && authOptions.length > 1) ||
    (!hasEmail && authOptions.length > 0);

  const config: WalletConfig = {
    category: "socialLogin",
    metadata: {
      ...embeddedWalletMetadata,
      name:
        hasEmail && hasSocial
          ? "Email & Social Login"
          : hasEmail
            ? "Email"
            : hasSocial
              ? "Social Login"
              : "Embedded Wallet",
    },
    create(createOptions) {
      return embeddedWallet({
        client: createOptions.client,
      });
    },
    selectUI(props) {
      return (
        <EmbeddedWalletSelectionUI
          selectUIProps={props}
          saveState={props.selection.saveData}
          authOptions={authOptions}
          select={props.selection.select}
        />
      );
    },
    connectUI(props) {
      return (
        <EmbeddedWalletConnectUI
          connectUIProps={props}
          authOptions={authOptions}
        />
      );
    },
  };

  return config;
};

function EmbeddedWalletSelectionUI(props: {
  selectUIProps: SelectUIProps;
  saveState: (state: EmbeddedWalletSelectUIState) => void;
  authOptions: EmbeddedWalletAuth[];
  select: () => void;
}) {
  const { screen } = useScreenContext();
  const { size } = props.selectUIProps.screenConfig;
  const { walletConfig } = props.selectUIProps;

  // do not show the "selectUI" if
  // modal is compact or
  // it is being rendered in Safe wallet
  if (
    size === "wide" ||
    (screen !== reservedScreens.main && size === "compact")
  ) {
    return (
      <WalletEntryButton
        walletConfig={walletConfig}
        selectWallet={() => {
          props.saveState({});
          props.select();
        }}
      />
    );
  }

  return (
    <EmbeddedWalletFormUI
      connectUIProps={{
        connection: props.selectUIProps.connection,
        screenConfig: props.selectUIProps.screenConfig,
        walletConfig: props.selectUIProps.walletConfig,
        selection: {
          data: props.selectUIProps.selection.data,
          saveData: props.selectUIProps.selection.saveData,
        },
      }}
      authOptions={props.authOptions}
      saveState={props.saveState}
      select={props.selectUIProps.selection.select}
    />
  );
}

function EmbeddedWalletConnectUI(props: {
  connectUIProps: ConnectUIProps;
  authOptions: EmbeddedWalletAuth[];
}) {
  const state = props.connectUIProps.selection
    .data as EmbeddedWalletSelectUIState;

  if (state?.emailLogin) {
    return (
      <EmbeddedWalletOTPLoginUI
        email={state.emailLogin}
        connectUIProps={props.connectUIProps}
      />
    );
  }

  if (state?.socialLogin) {
    return (
      <EmbeddedWalletSocialLogin
        connectUIProps={props.connectUIProps}
        socialAuth={state.socialLogin.type}
        state={state}
      />
    );
  }

  return (
    <EmbeddedWalletFormUIScreen
      connectUIProps={props.connectUIProps}
      authOptions={props.authOptions}
      saveState={props.connectUIProps.selection.saveData}
      select={() => {}}
    />
  );
}