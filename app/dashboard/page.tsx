import React from "react";
import { requireUser } from "../lib/hooks";
import { notFound } from "next/navigation";
import { EmptyState } from "../components/EmptyState";
import { prisma } from "../lib/db";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="You have no Event Type"
          description="You can create an event type by clicking the button below"
          buttonText="Create Event Type"
          href="/dashboard/new"
        />
      ) : (
        <p>data</p>
      )}
    </>
  );
}
