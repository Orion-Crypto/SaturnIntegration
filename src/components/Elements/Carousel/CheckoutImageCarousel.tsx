import { clsx } from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IPFSImage } from '../IPFSImage';

type CheckoutImageCarouselProps = {
    nftProject?: any;
    images: string[];
};
export const CheckoutImageCarousel = ({ nftProject, images }: CheckoutImageCarouselProps) => {
    const [index, setIndex] = useState(0);
    const total = images?.length;
    const name = nftProject?.name;

    const [manualImage, setManualImage] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!manualImage) {
                previous();
            }
            setManualImage(false);
        }, 5000);
        return () => clearInterval(intervalId);
    });

    const next = () => {
        const newIndex = index - 1;
        if (newIndex < 0) {
            setIndex(total - 1);
        } else {
            setIndex(newIndex);
        }
        setManualImage(true);
    };

    const previous = () => {
        const newIndex = index + 1;
        if (newIndex > total - 1) {
            setIndex(0);
        } else {
            setIndex(newIndex);
        }
        setManualImage(true);
    };

    return (
        <div className={clsx('mt-8 flex w-full flex-col items-center justify-center rounded-lg font-bold drop-shadow-black-sharp')}>
            <div className="mb-4 text-center text-3xl font-bold text-white">{name}</div>
            <div className="flex items-center justify-center">
                <div className="flex">
                    <div
                        className={clsx(
                            'relative left-3 z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-lightspace-500 ring-4 ring-lightspace-200',
                            'hover:bg-lightspace-400'
                        )}
                        onClick={next}
                    >
                        <Image
                            src={'/images/icons/arrow-right-white.png'}
                            alt={'Arrow'}
                            width={512}
                            height={512}
                            className="mr-1 h-5 w-5 rotate-180 cursor-pointer"
                            priority={true}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div
                        className={clsx(
                            'relative flex h-72 w-72 overflow-hidden transition-all duration-1000 ease-out',
                            'sm:h-80 sm:w-80',
                            'xl:h-92 xl:w-92'
                        )}
                    >
                        {images?.map((image: string, key: number) => {
                            const itemIndex = key;

                            let previousIndex = index - 1;
                            if (previousIndex < 0) {
                                previousIndex = total - 1;
                            }

                            let nextIndex = index + 1;
                            if (nextIndex > total - 1) {
                                nextIndex = 0;
                            }

                            return (
                                <div
                                    key={key}
                                    className={clsx(
                                        'absolute flex h-72 w-72 rounded-lg border border-lightspace-200 bg-lightspace-500 drop-shadow-black-sharp transition-all duration-1000 ease-out',
                                        itemIndex === previousIndex ? 'right-4 -translate-x-full' : '',
                                        itemIndex === index ? 'opacity-100' : 'opacity-0',
                                        itemIndex === nextIndex ? 'left-4 translate-x-full' : '',
                                        'sm:h-80 sm:w-80',
                                        'xl:h-92 xl:w-92'
                                    )}
                                >
                                    <IPFSImage image={image} aboveFold={true} containerClassNames="relative flex aspect-square w-screen" />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex">
                    <div
                        className={clsx(
                            'relative right-3 z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-lightspace-500 ring-4 ring-lightspace-200',
                            'hover:bg-lightspace-400'
                        )}
                        onClick={previous}
                    >
                        <Image
                            src={'/images/icons/arrow-right-white.png'}
                            alt={'Arrow'}
                            width={512}
                            height={512}
                            className="ml-1 h-5 w-5 cursor-pointer"
                            priority={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
