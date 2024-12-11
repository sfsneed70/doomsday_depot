import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IDeal } from "../interfaces/Deal";
import 'swiper/swiper-bundle.css';
import DealItem from "./DealItem";
import Button from "./Button";

type DealCarouselProps = {
    deal: IDeal[];
    onOpenModal: (deal: IDeal) => void;
};

const DealCarousel: React.FC<DealCarouselProps> = ({ deal, onOpenModal }) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperInstance = useRef<any>(null);

    useEffect(() => {
        swiperInstance.current!.params.navigation.prevEl = prevRef.current;
        swiperInstance.current!.params.navigation.nextEl = nextRef.current;
        swiperInstance.current!.navigation.init();
    }, []);

    return (
        <div className="mt-8 relative">
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                loop={true}
                loopAddBlankSlides={false}
                slidesPerView={1}
                slidesPerGroup={1}
                onSwiper={(swiper) => {
                    swiperInstance.current = swiper;
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                }}
            >
                {deal.map((dealItem) => (
                    <SwiperSlide key={dealItem.name}> 
                        <DealItem deal={dealItem} onOpenModal={onOpenModal} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            < div className="flex justify-end mt-4" >
                <Button
                    ref={prevRef}
                    text="Prev"
                    className="mr-4"
                />
                <Button
                    ref={nextRef}
                    text="Next"
                />
            </div>
        </div >
    );
};

export default DealCarousel;