import { useState } from "react";
import Head from "next/head";
import useDarkMode from "../useDarkMode";

//components
import NFTCard from "../components/NFTCard";
import PaginationBar from "../components/Pagination";

export default function Home(className = "" ) {
  //variables to store wallet and collection address
  const [walletAddress, setWalletAddress] = useState("");
  const [collectionAddress, setCollectionAddress] = useState("");
  const [colorTheme, setTheme] = useDarkMode(); 
  //variable to fetchNFTs from wallet address
  const [NFTs, setNFTs] = useState([]);

  //Fetch NFTs for collection
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKeys, setPageKeys] = useState([""]);

  //Api key is stored globally because it is used in two separate functions.
  const API_KEY = "BclkjptY8RFaasKyEPNt5R62jL2le-Ir";

  //A function that fetches NFTs from wallet address
  const fetchNFTs = async (e) => {
    e.preventDefault();

    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTs/`;
    const fetchURL = !collectionAddress
      ? `${baseURL}?owner=${walletAddress}`
      : `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;

    try {
      const nfts = await fetch(fetchURL, {
        method: "GET",
      }).then((data) => data.json());

      if (nfts) {
        setNFTs(nfts.ownedNfts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Function that fetch NFTs from collection
  const fetchNFTsForCollection = async (e, startToken = "", pageIndex = 0) => {
    e.preventDefault();

    if (collectionAddress) {
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=true&startToken=${startToken}`;

      try {
        const nfts = await fetch(fetchURL, {
          method: "GET",
        }).then((data) => data.json());

        if (nfts) {
          if (nfts.nextToken) {
            setPageKeys((prevKeys) => {
              const newKeys = [...prevKeys];
              newKeys[pageIndex + 1] = nfts.nextToken;

              return newKeys;
            });
          }
          setNFTs(nfts.nfts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Onclick funtion that navigates pagination
  const onClickPage = (e, pageIndex) => {
    if (currentPage === pageIndex) return;

    try {
      fetchNFTsForCollection(e, pageKeys[pageIndex], pageIndex);
      setCurrentPage(pageIndex);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`font-poppins min-h-screen p-4 sm:p-6 transition-all duration-300 ease-in-out ${colorTheme === "dark" ? "bg-black" : "bg-white"}`}>      <Head>
        <title>Mirac.Eth NFT Gallery</title>
        <meta name="description" content="View View NFTs from Your Address or Collection" />
        <meta name="keywords" content="blockchain, nft, web3" />
      </Head> 

      <main className="text-darkgrey overflow-x-hidden min-h-screen w-full mx-auto shadow-lg">        <div>
          <div>
            {colorTheme === "light" ? (
            <svg
              onClick={() => setTheme("light")}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-brand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            ) : (
              <svg
                onClick={() => setTheme("dark")}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
<<<<<<< HEAD
          
=======
             
>>>>>>> cbd0c760f9e6629e3deab10c2243e31e501cd8f7
          </div>
      
          <h1 className="text-3xl md:text-5xl sm:text-8xl text-center mb-6 mt-6 sm:mb-8 text-transparent 
          bg-clip-text bg-gradient-to-r from-lime-600 via-yellow-300 to-red-600 font-semibold tracking-wide ">
          Mirac.Eth NFT Gallery
          </h1>
        </div>
        
        <form className="max-w-lg mx-auto flex flex-col space-y-4">        <input
  type="text"
  placeholder="Add your wallet address"
  className={`w-full mb-4 h-10 p-2 rounded-md bg-transparent border-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-indigo-500 ${fetchForCollection ? 'cursor-not-allowed' : ''} ${colorTheme === "dark" ? "text-white border-white" : "text-black border-black"}`}
  onChange={(e) => {
    setWalletAddress(e.target.value);
  }}
  value={walletAddress}
  disabled={fetchForCollection}
/>
<input
  type="text"
  placeholder="Add the collection address"
  className={`w-full mb-6 h-10 p-2 rounded-md bg-transparent border-2 transition-all duration-300 ease-in-out focus:outline-none focus:border-indigo-500 ${colorTheme === "dark" ? "text-white border-white" : "text-black border-black"}`}
  onChange={(e) => {
    setCollectionAddress(e.target.value);
  }}
  value={collectionAddress}
/>


    <label className={`flex justify-center items-center mb-4 ${colorTheme === "dark" ? "text-white" : "text-black"}`}>
  <input
    type="checkbox"
    className="mr-2"
    onChange={(e) => {
      setFetchForCollection(e.target.checked);
    }}
    checked={fetchForCollection}
  ></input>
  Fetch for collection
</label>

          <button
            className={`transition-all duration-300 ease-in-out ${!walletAddress && !collectionAddress ? 'cursor-not-allowed' : ''} 
            px-4 py-2 rounded-md w-full text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
            hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
            disabled={!walletAddress && !collectionAddress}
            onClick={collectionAddress ? fetchNFTsForCollection : fetchNFTs}
          >
            Fetch NFTs
          </button>
        </form>
        <div className="grid grid-cols-3 gap-8 mt-6">
          {!!NFTs.length &&
            NFTs.map((nft, i) => {
              return <NFTCard nft={nft} key={`${nft.tokenUri.raw}-${i}-${nft.id.tokenId}`}></NFTCard>;
            })}
        </div>

        {pageKeys.length > 1 && (
          <PaginationBar
            currentPage={currentPage}
            pageKeys={pageKeys}
            onClickPage={onClickPage}
            className="border-t"
          />
        )}
      </main>
       <div class="footer"> <h3>Developed by Mirac.eth</h3></div>
    </div>
  );
}
