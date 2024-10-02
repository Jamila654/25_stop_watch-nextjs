"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

export default function Home() {
  type LapTime = number;

  const [isRunning, setisRunning] = useState<boolean>(false);
  const [time, settime] = useState<number>(0);
  const [lapTimes, setlapTimes] = useState<LapTime[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        settime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setisRunning(true);
  };
  const handleStop = () => {
    setisRunning(false);
  };

  const handleReset = () => {
    setisRunning(false);
    settime(0);
    setlapTimes([]);
  };

  const handleLap = () => {
    setlapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const min = Math.floor(time / 6000);
  const sec = Math.floor((time % 6000) / 1000);
  const miliSec = Math.floor((time % 1000) / 10);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card className=" rounded-3xl">
        <CardHeader className=" text-center">
          <CardTitle>Stopwatch</CardTitle>
          <CardDescription>
            Track your time with this stopwatch.
          </CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col items-center justify-around gap-12">
          <div className="time w-full flex items-center justify-around">
            <div className="min">
              <h1 className=" font-bold text-4xl text-nowrap sm:text-[40px] md:text-[50px] lg:text-[80px]">
                {min.toString().padStart(2, "0")} ：
              </h1>
            </div>
            <div className="min">
              <h1 className=" font-bold text-4xl text-nowrap sm:text-[40px] md:text-[50px] lg:text-[80px]">
                {sec.toString().padStart(2, "0")} ：
              </h1>
            </div>
            <div className="sec">
              <h1 className=" font-bold text-4xl text-nowrap sm:text-[40px] md:text-[50px] lg:text-[80px]">
                {miliSec.toString().padStart(2, "0")}
              </h1>
            </div>
          </div>
          <div className="buttons w-full flex justify-center gap-4">
            <Button
              className=" rounded-3xl font-bold text-xl md:text-2xl"
              onClick={isRunning ? handleStop : handleStart}
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              className=" rounded-3xl font-bold text-xl md:text-2xl"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className=" rounded-3xl font-bold text-xl md:text-2xl"
              onClick={handleLap}
            >
              Lap
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Table className=" mt-2">
            <TableHeader>
              <TableRow>
                <TableHead className="w-full font-bold text-xl md:text-2xl text-nowrap text-center text-black">
                  Lap Times
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lapTimes.map((lapTime, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="text-right">
                    {Math.floor(lapTime / 60000)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {Math.floor((lapTime % 60000) / 1000)
                      .toString()
                      .padStart(2, "0")}
                    :
                    {Math.floor((lapTime % 1000) / 10)
                      .toString()
                      .padStart(2, "0")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>
    </div>
  );
}
