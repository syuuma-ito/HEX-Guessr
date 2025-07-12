"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");
    const [colorCode, setColorCode] = useState("");

    useEffect(() => {
        // Generate a random color for 404 page
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const bgColor = `rgb(${r}, ${g}, ${b})`;
        const hexColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

        setBackgroundColor(bgColor);
        setColorCode(`${hexColor} / rgb(${r}, ${g}, ${b})`);
    }, []);

    const generateNewColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const bgColor = `rgb(${r}, ${g}, ${b})`;
        const hexColor = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

        setBackgroundColor(bgColor);
        setColorCode(`${hexColor} / rgb(${r}, ${g}, ${b})`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500" style={{ backgroundColor }}>
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
                <CardContent className="space-y-6 text-center">
                    <div className="space-y-4">
                        <div className="text-6xl font-bold text-gray-800">404</div>
                        <div className="text-xl font-semibold text-gray-600">ページが見つかりません</div>
                        <div className="text-gray-500">お探しのページは存在しないか、移動した可能性があります</div>
                    </div>

                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-600">現在の背景色</div>
                        <div className="text-sm text-gray-700 font-mono">{colorCode}</div>
                        <Button onClick={generateNewColor} variant="outline" size="sm" className="mt-2">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            色を変更
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <Link href="/">
                            <Button className="w-full">
                                <Home className="h-4 w-4 mr-2" />
                                ホームに戻る
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
