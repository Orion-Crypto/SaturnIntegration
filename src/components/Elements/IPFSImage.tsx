import Image from 'next/image';
import { useState } from 'react';
import { IPFSGateway } from '../../types/Enums/IPFSGateway';
import { convertIPFSToHTTP } from '../../utils/image';

export const IPFSImage = ({
    image,
    defaultImage = '/images/nft-images/PlaceholderNFTLightspace.png',
    isLocalImage = false,
    containerClassNames = 'relative flex aspect-square',
    classNames = 'rounded-lg object-contain',
    sizes = '25wv',
    alt = 'NFT',
    aboveFold = true,
    draggable = true,
}: any) => {
    const [ipfsService, setIpfsService] = useState(IPFSGateway.NFTStorage);

    let convertedImage = defaultImage;
    if (isLocalImage) {
        convertedImage = image;
    } else {
        convertedImage = image ? convertIPFSToHTTP(image, ipfsService) : defaultImage;
    }

    return (
        <div className={containerClassNames}>
            {ipfsService === IPFSGateway.NFTStorage && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    onError={() => {
                        setIpfsService(IPFSGateway.Blockfrost);
                    }}
                    draggable={draggable}
                />
            )}
            {ipfsService === IPFSGateway.Blockfrost && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    onError={() => {
                        setIpfsService(IPFSGateway.Pinata);
                    }}
                    draggable={draggable}
                />
            )}
            {ipfsService === IPFSGateway.Pinata && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    onError={() => {
                        setIpfsService(IPFSGateway.Dweb);
                    }}
                    draggable={draggable}
                />
            )}
            {ipfsService === IPFSGateway.Dweb && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    onError={() => {
                        setIpfsService(IPFSGateway.CfIPFS);
                    }}
                    draggable={draggable}
                />
            )}
            {ipfsService === IPFSGateway.CfIPFS && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    onError={() => {
                        setIpfsService(IPFSGateway.IPFSio);
                    }}
                    draggable={draggable}
                />
            )}
            {ipfsService === IPFSGateway.IPFSio && (
                <Image
                    src={convertedImage}
                    alt={alt}
                    fill={true}
                    className={classNames}
                    sizes={sizes}
                    priority={aboveFold}
                    draggable={draggable}
                />
            )}
        </div>
    );
};
