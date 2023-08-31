import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

function MyApp({ Component, pageProps }) {
  const Key= process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
  return (
    <ThirdwebProvider
      desiredChainId={activeChainId}
      clientId={Key}
      authConfig={{
        domain: "example.org",
        authUrl: "/api/auth",
        loginRedirect: "/",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
