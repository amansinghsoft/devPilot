import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type DevPilotIconProps = SVGProps<SVGSVGElement> & {
    variant?: "color" | "mono";
};

export function DevPilotIcon({
    className,
    variant = "color",
    ...props
}: DevPilotIconProps) {
    const mono = variant === "mono";

    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={cn("shrink-0", className)}
            {...props}
        >
            <defs>
                <linearGradient
                    id="devpilot-gradient"
                    x1="8"
                    y1="8"
                    x2="56"
                    y2="56"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#6366F1" />
                </linearGradient>
            </defs>

            <rect
                x="3"
                y="3"
                width="58"
                height="58"
                rx="16"
                fill={mono ? "currentColor" : "url(#devpilot-gradient)"}
            />

            <path
                d="M17 22L27 32L17 42"
                stroke={mono ? "var(--devpilot-icon-foreground, white)" : "#FFFFFF"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M31 42H45"
                stroke={mono ? "var(--devpilot-icon-foreground, white)" : "#FFFFFF"}
                strokeWidth="4"
                strokeLinecap="round"
            />

            <circle
                cx="44"
                cy="21"
                r="5"
                fill={mono ? "var(--devpilot-icon-foreground, white)" : "#FFFFFF"}
            />
        </svg>
    );
}