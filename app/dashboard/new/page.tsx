import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventRoute() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add New Appointment Type</CardTitle>
          <CardDescription>
            Create new appointment type that allows people to book you
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-2">
              <Label>Title</Label>
              <Input placeholder="30 Minute Meeting" />
            </div>
            <div className="grid gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  dewiana.com/
                </span>
                <Input
                  className="rounded-l-none"
                  placeholder="30-minute-meeting"
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Meeting for discuss the bussiness" />
            </div>
            <div className="grid gap-y-2">
              <Label>Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-y-2">
              <Label>Video Call Provider</Label>
              <ButtonGroup>
                <Button className="w-full">Zoom</Button>
                <Button className="w-full">Google Meet</Button>
                <Button className="w-full">Microsoft Teams</Button>
              </ButtonGroup>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
