"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useState, useCallback, useEffect, useRef } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const passwordGen = useCallback(() => {
    let returnable = "";
    let strings = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    const numbers = "1234567890";
    const characters = "!@#$%&*";

    if (character) strings += characters;
    if (number) strings += numbers;

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * strings.length);
      returnable += strings[random];
    }

    setPassword(returnable);
  }, [length, number, character]);

  useEffect(() => {
    passwordGen();
  }, [passwordGen, length, number, character]);

  const copyPassword = () => {
    // this line is only selecting the passwordd for better user experience
    passwordRef.current?.select();
    // and this line is copng the password
    window.navigator.clipboard.writeText(password);
    toast({
      title: "Password copied",
      description: "The generated password has been copied !!. ok ;)",
    });
  };

  return (
    <>
      <Card className="w-full max-w-md m-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              className="pr-10"
              placeholder="Generated password"
              type="text"
              name="password"
              id="password"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full"
              onClick={copyPassword}
              aria-label="Copy password"
            >
              <FaRegCopy className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="length">Length</Label>
              <span>{length}</span>
            </div>
            <Slider
              id="length"
              min={6}
              max={20}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={number}
              onCheckedChange={() => setNumber((prev) => !prev)}
            />
            <Label htmlFor="numbers">Include numbers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="characters"
              checked={character}
              onCheckedChange={() => setCharacter((prev) => !prev)}
            />
            <Label htmlFor="characters">Include special characters</Label>
          </div>
          <Button className="w-full" onClick={passwordGen}>
            Generate another Password
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
