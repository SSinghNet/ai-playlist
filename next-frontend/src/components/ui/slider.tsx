"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import {cn} from "@/lib/utils"

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
    thumbValue?: string
    leftLabel?: string
    rightLabel?: string
}

function Slider({
                    className,
                    defaultValue,
                    value,
                    min = 0,
                    max = 100,
                    thumbValue,
                    leftLabel,
                    rightLabel,
                    ...props
                }: SliderProps) {
    const _values = React.useMemo(
        () =>
            Array.isArray(value)
                ? value
                : Array.isArray(defaultValue)
                    ? defaultValue
                    : [min, max],
        [value, defaultValue, min, max]
    )

    return (
        <div className={"mt-2"}>
            <SliderPrimitive.Root
                data-slot="slider"
                defaultValue={defaultValue}
                value={value}
                min={min}
                max={max}
                className={cn(
                    "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
                    className
                )}
                {...props}
            >
                <SliderPrimitive.Track
                    data-slot="slider-track"
                    className={cn(
                        "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
                    )}
                >
                    <SliderPrimitive.Range
                        data-slot="slider-range"
                        className={cn(
                            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                        )}
                    />
                </SliderPrimitive.Track>
                {Array.from({length: _values.length}, (_, index) => (
                    <SliderPrimitive.Thumb
                        data-slot="slider-thumb"
                        key={index}
                        className="border-foreground bg-background ring-ring/50 size-7 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-20 flex items-center"
                    >
                            <span className={"text-xs text-light m-auto flex items-center"}>
                                {thumbValue ? thumbValue : " "}
                            </span>
                    </SliderPrimitive.Thumb>
                ))}
            </SliderPrimitive.Root>
            {(leftLabel && rightLabel) ?
                <div className={"flex flex-row justify-between mt-2 text-xs text-light"}>
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div> : ""
            }
        </div>
    )
}

export {Slider}
