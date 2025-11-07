"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

interface FilterCarouselProps {
    value?: string | null;
    isLoading?: boolean;
    onSelect: (value: string | null) => void;
    data: {
        value: string;
        label: string;
    }[];
}

/**
 * Renders a horizontal filter carousel with selectable badges, navigation controls, and fades at the edges.
 *
 * Displays an "All" badge and one badge per item in `data`; when `isLoading` is true it shows skeleton placeholders instead.
 * Invokes `onSelect` with an item's `value` when that badge is clicked, or with `null` when "All" is clicked.
 * The component tracks the carousel position to hide/show the left/right fade overlays based on visibility.
 *
 * @param value - Currently selected filter value (`string`) or `null`/`undefined` for no selection.
 * @param isLoading - When `true`, show skeleton placeholders in place of badges.
 * @param onSelect - Optional callback called with the selected value or `null` for the "All" selection.
 * @param data - Array of items to render as badges; each item has `{ value: string, label: string }`.
 * @returns The rendered filter carousel React element containing badges, navigation controls, and edge fades.
 */
export function FilterCarousel({ value, isLoading, onSelect, data }: Readonly<FilterCarouselProps>) {
    const [api, setApi] = useState<CarouselApi>();

    const [current, setCurrent] = useState(0);

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);

        setCurrent(api.selectedScrollSnap() + 1);

        const handleSelect = () => setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", handleSelect);

        return () => {
            api.off("select", handleSelect);
        };
    }, [api]);

    return (
        <div className="relative w-full">
            {/* left fade */}
            <div
                className={cn(
                    "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
                    current === 1 && "hidden"
                )}
            />

            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    dragFree: true,
                }}
                className="w-full px-12"
            >
                <CarouselContent className="-ml-3">
                    {!isLoading && (
                        <CarouselItem
                            className="pl-3 basis-auto"
                            onClick={() => onSelect?.(null)}
                        >
                            <Badge
                                variant={!value == null ? "default" : "secondary"}
                                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                            >
                                All
                            </Badge>
                        </CarouselItem>
                    )}
                    {isLoading &&
                        Array.from({ length: 14 }).map((_, index) => (
                            <CarouselItem key={index} className="pl-3 basis-auto">
                                <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
                                    &nbsp;
                                </Skeleton>
                            </CarouselItem>
                        ))
                    }

                    {!isLoading && data?.map((item) => (
                        <CarouselItem
                            key={item.value}
                            className="pl-3 basis-auto"
                            onClick={() => onSelect(item.value)}
                        >
                            <Badge
                                variant={value === item.value ? "secondary" : "default"}
                                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                            >
                                {item.label}
                            </Badge>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-0 z-20" />

                <CarouselNext className="right-0 z-20" />
            </Carousel>

            {/* right fade */}
            <div
                className={cn(
                    "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none",
                    current === count && "hidden"
                )}
            />
        </div>
    )
}