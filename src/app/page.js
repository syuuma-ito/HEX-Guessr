"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Check, MapPin, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function ColorQuiz() {
    const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
    const [userGuess, setUserGuess] = useState("");
    const [guessType, setGuessType] = useState("hex"); // "hex" or "rgb"
    const [rgbGuess, setRgbGuess] = useState({ r: 0, g: 0, b: 0 });
    const [score, setScore] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        startNewGame();
    }, []);

    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    };

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    const parseRgbString = (rgbString) => {
        const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3]),
            };
        }
        return null;
    };

    const calculateAccuracy = (target, guess) => {
        const diff = Math.sqrt(Math.pow(target.r - guess.r, 2) + Math.pow(target.g - guess.g, 2) + Math.pow(target.b - guess.b, 2));
        const maxDiff = Math.sqrt(3 * Math.pow(255, 2));
        const accuracy = ((maxDiff - diff) / maxDiff) * 100;
        return Math.max(0, Math.round(accuracy * 100) / 100);
    };

    const startNewGame = () => {
        const newColor = generateRandomColor();
        setTargetColor(newColor);
        setUserGuess("");
        setRgbGuess({ r: 0, g: 0, b: 0 });
        setScore(null);
        setErrorMessage("");
        setGameStarted(true);
    };

    useEffect(() => {
        startNewGame();
    }, []);

    const submitGuess = () => {
        setErrorMessage("");
        let guessColor = null;

        if (guessType === "hex") {
            guessColor = hexToRgb(userGuess);
        } else {
            guessColor = rgbGuess;
        }

        if (guessColor && guessColor.r >= 0 && guessColor.g >= 0 && guessColor.b >= 0) {
            const accuracy = calculateAccuracy(targetColor, guessColor);
            setScore(accuracy);
        } else {
            setErrorMessage("無効な形式です。正しい形式で入力してください。");
        }
    };

    const backgroundColor = gameStarted ? `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` : "#f0f0f0";

    return (
        <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500" style={{ backgroundColor }}>
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
                        <MapPin className="h-6 w-6" />
                        <p className="text-l font-bold">HEX Guessr</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Gradient Examples */}
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                            <div className="h-6 rounded" style={{ background: "linear-gradient(to right, #000000, #ffffff)" }}></div>
                            <div className="h-6 rounded" style={{ background: "linear-gradient(to right, #ff0000, #ffffff)" }}></div>
                            <div className="h-6 rounded" style={{ background: "linear-gradient(to right, #00ff00, #ffffff)" }}></div>
                            <div className="h-6 rounded" style={{ background: "linear-gradient(to right, #0000ff, #ffffff)" }}></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>回答形式を選択</Label>
                        <div className="flex gap-2">
                            <Button variant={guessType === "hex" ? "default" : "outline"} onClick={() => setGuessType("hex")} className="flex-1">
                                HEX
                            </Button>
                            <Button variant={guessType === "rgb" ? "default" : "outline"} onClick={() => setGuessType("rgb")} className="flex-1">
                                RGB
                            </Button>
                        </div>
                    </div>

                    {guessType === "hex" ? (
                        <div className="space-y-2">
                            <Label htmlFor="guess">色を予想して入力 (例: #ff0000)</Label>
                            <Input id="guess" type="text" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} placeholder="#000000" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Label>色を予想して入力</Label>
                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label className="w-8 text-red-600 font-semibold">R</Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.r}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, r: parseInt(e.target.value) }))}
                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                                    />
                                    <Input
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.r}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, r: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) }))}
                                        className="w-16 text-center"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label className="w-8 text-green-600 font-semibold">G</Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.g}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, g: parseInt(e.target.value) }))}
                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                                    />
                                    <Input
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.g}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, g: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) }))}
                                        className="w-16 text-center"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-4">
                                    <Label className="w-8 text-blue-600 font-semibold">B</Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.b}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, b: parseInt(e.target.value) }))}
                                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                                    />
                                    <Input
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgbGuess.b}
                                        onChange={(e) => setRgbGuess((prev) => ({ ...prev, b: Math.max(0, Math.min(255, parseInt(e.target.value) || 0)) }))}
                                        className="w-16 text-center"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {score === null && (
                        <Button onClick={submitGuess} className="w-full">
                            <Check className="h-4 w-4 mr-2" />
                            回答する
                        </Button>
                    )}

                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    {score !== null && (
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="pt-4">
                                <div className="text-center space-y-2">
                                    <p className="text-lg font-semibold">結果</p>
                                    <p className="text-2xl font-bold text-green-600">{score}%</p>
                                    <p className="text-sm text-gray-600">
                                        正解: {rgbToHex(targetColor.r, targetColor.g, targetColor.b)} / rgb({targetColor.r}, {targetColor.g}, {targetColor.b})
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Button onClick={startNewGame} variant="outline" className="w-full">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        New Game
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
