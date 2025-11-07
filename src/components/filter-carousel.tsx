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
 * Renders a horizontally scrollable filter carousel of selectable badges with optional loading placeholders.
 *
 * Displays an "All" badge that clears selection, a sequence of skeleton placeholders when `isLoading` is true, and a badge for each item in `data`. Shows left/right fade overlays that hide when at the start or end of the carousel. Invokes `onSelect` with `null` for the "All" badge or with the item's `value` when an item badge is clicked.
 *
 * @param value - The currently selected value, or `null` when no specific item is selected.
 * @param isLoading - When `true`, renders loading skeletons instead of item badges.
 * @param onSelect - Callback invoked with the new selected value (`string` or `null`) when a badge is clicked.
 * @param data - Array of items to render; each item must have a `value` and `label`.
 * @returns The carousel React element containing filter badges and optional placeholders.
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

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        })
    }, [api]);

    return (
        <div className="relarive w-full">
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

                    {!isLoading &&
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
                                variant={value == null ? "default" : "secondary"}
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