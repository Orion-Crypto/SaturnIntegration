export const getRandomBlob = () => {
    const blobNumber = 20;
    const chosenBlob = Math.floor(Math.random() * blobNumber);

    if (chosenBlob === 0) return '/images/blobs/001-Bob.png';
    else if (chosenBlob === 1) return '/images/blobs/001-Bob-Reverse.png';
    else if (chosenBlob === 2) return '/images/blobs/002-Wumb.png';
    else if (chosenBlob === 3) return '/images/blobs/002-Wumb-Reverse.png';
    else if (chosenBlob === 4) return '/images/blobs/003-Bluub.png';
    else if (chosenBlob === 5) return '/images/blobs/003-Bluub-Reverse.png';
    else if (chosenBlob === 6) return '/images/blobs/004-Broogr.png';
    else if (chosenBlob === 7) return '/images/blobs/004-Broogr-Reverse.png';
    else if (chosenBlob === 8) return '/images/blobs/005-Rooboo.png';
    else if (chosenBlob === 9) return '/images/blobs/005-Rooboo-Reverse.png';
    else if (chosenBlob === 10) return '/images/blobs/006-Oobby.png';
    else if (chosenBlob === 11) return '/images/blobs/006-Oobby-Reverse.png';
    else if (chosenBlob === 12) return '/images/blobs/007-Yolg.png';
    else if (chosenBlob === 13) return '/images/blobs/007-Yolg-Reverse.png';
    else if (chosenBlob === 14) return '/images/blobs/008-Glob.png';
    else if (chosenBlob === 15) return '/images/blobs/008-Glob-Reverse.png';
    else if (chosenBlob === 16) return '/images/blobs/009-Blurp.png';
    else if (chosenBlob === 17) return '/images/blobs/009-Blurp-Reverse.png';
    else if (chosenBlob === 18) return '/images/blobs/010-Peep.png';
    else if (chosenBlob === 19) return '/images/blobs/010-Peep-Reverse.png';

    return '/images/blobs/001-Bob.png';
};

export const getRandomLeftBlob = () => {
    const blobNumber = 10;
    const chosenBlob = Math.floor(Math.random() * blobNumber);

    if (chosenBlob === 0) return '/images/blobs/001-Bob.png';
    else if (chosenBlob === 1) return '/images/blobs/002-Wumb.png';
    else if (chosenBlob === 2) return '/images/blobs/003-Bluub.png';
    else if (chosenBlob === 3) return '/images/blobs/004-Broogr.png';
    else if (chosenBlob === 4) return '/images/blobs/005-Rooboo.png';
    else if (chosenBlob === 5) return '/images/blobs/006-Oobby.png';
    else if (chosenBlob === 6) return '/images/blobs/007-Yolg.png';
    else if (chosenBlob === 7) return '/images/blobs/008-Glob.png';
    else if (chosenBlob === 8) return '/images/blobs/009-Blurp.png';
    else if (chosenBlob === 9) return '/images/blobs/010-Peep.png';

    return '/images/blobs/001-Bob.png';
};

export const getRandomRightBlob = () => {
    const blobNumber = 10;
    const chosenBlob = Math.floor(Math.random() * blobNumber);

    if (chosenBlob === 0) return '/images/blobs/001-Bob-Reverse.png';
    else if (chosenBlob === 1) return '/images/blobs/002-Wumb-Reverse.png';
    else if (chosenBlob === 2) return '/images/blobs/003-Bluub-Reverse.png';
    else if (chosenBlob === 3) return '/images/blobs/004-Broogr-Reverse.png';
    else if (chosenBlob === 4) return '/images/blobs/005-Rooboo-Reverse.png';
    else if (chosenBlob === 5) return '/images/blobs/006-Oobby-Reverse.png';
    else if (chosenBlob === 6) return '/images/blobs/007-Yolg-Reverse.png';
    else if (chosenBlob === 7) return '/images/blobs/008-Glob-Reverse.png';
    else if (chosenBlob === 8) return '/images/blobs/009-Blurp-Reverse.png';
    else if (chosenBlob === 9) return '/images/blobs/010-Peep-Reverse.png';

    return '/images/blobs/001-Bob.png';
};
