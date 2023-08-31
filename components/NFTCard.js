import { DocumentDuplicateIcon } from "@heroicons/react/solid";

const truncate = (str) => {
  if (str.length > 10) {
    return `${str.substring(0, 4)}...${str.substring(str.length - 4)}`;
  } else {
    return str;
  }
};

export default function NFTCard({ nft }) {
  const splitGateway = nft.media[0].gateway.split(".");
  const fileType = splitGateway.slice(-1)[0];

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(nft.contract.address);
    alert("Copied");
  };

  return (
    <div className={`flex flex-col md:flex-row bg-gradient-to-r from-blue-600 via-purple-700 to-pink-500 rounded-lg shadow-lg p-2 md:p-4 w-full mb-4 col-span-full sm:col-auto`}>
      <div className="w-full h-48 md:h-auto mb-2 md:mb-0">
        {fileType === "mp4" ? (
          <video loop autoPlay muted className="object-cover h-full w-full rounded-lg">
            <source src={nft.media[0].gateway} type="video/mp4" />
          </video>
        ) : (
          <img className="object-cover h-full w-full rounded-lg" src={nft.media[0].gateway}></img>
        )}
      </div>

      <div className="flex flex-col justify-between p-2 w-full">
        <div>
          <h2 className="text-lg md:text-2xl text-white font-extrabold mb-2">{nft.title}</h2>
          <p className="text-xs md:text-sm text-white mb-1">Id: {truncate(nft.id.tokenId)}</p>
          <p className="text-xs md:text-sm text-white flex items-center">
            {`${truncate(nft.contract.address)}`} 
            <DocumentDuplicateIcon className="h-4 pl-1 cursor-pointer text-yellow-400" onClick={copyAddressToClipboard} />
          </p>
        </div>
        
        <div className="mt-2">
          <a
            className="text-center block bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:bg-yellow-500 text-white font-semibold py-1 md:py-2 px-4 rounded-full"
            target="_blank"
            rel="noreferrer"
            href={`https://etherscan.io/token/${nft.contract.address}`}
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
}
