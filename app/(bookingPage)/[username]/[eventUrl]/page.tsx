import { Calendar } from "@/app/components/bookingForm/Calendar";
import { prisma } from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, Video } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BookingFormRoute({
  params,
}: {
  params: { userName: string; eventUrl: string };
}) {
  const data = await getData(params.eventUrl, params.userName);
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[1000px] w-full mx-auto">
        <CardContent className="p-5 grid md:grid-cols-[1fr,auto,1fr] gap-4">
          <div>
            <img
              src={data.User?.image as string}
              alt="Profile Image"
              className="size-10 rounded-full"
            />
            <p className="text-sm font-medium text-muted-foreground mt-1">
              {data.User?.name}
            </p>
            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
            <p className="text-sm font-medium text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-5 flex flex-col gap-y-3">
              <p className="flex items-center">
                <CalendarX2 className="size-4 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  23. Sept 2025
                </span>
              </p>
              <p className="flex items-center">
                <Clock className="size-4 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  {data.duration} Minutes
                </span>
              </p>
              <p className="flex items-center">
                <Video className="size-4 mr-2 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>
          <Separator orientation="vertical" className="h-full w-[1px]" />
          <Calendar />
        </CardContent>
      </Card>
    </div>
  );
}
