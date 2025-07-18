"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ActionEvent, DetailedRun, SessionEvent } from "@/lib/types";
import EventActionsTable from "./EventActionsTable";
import { BlocksIcon, FanIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
interface RunEventsProps {
  run: DetailedRun;
}

export function RunEvents({ run }: RunEventsProps) {
  const renderSessionEvent = (event: SessionEvent) => {
    return (
      <div>
        <EventActionsTable actions={event.actions} />
      </div>
    );
  };

  const renderActionEvent = (event: ActionEvent) => {
    return (
      <div className="flex flex-col justify-start items-start gap-1">
        <span className="flex items-center gap-1 text-zinc-500">
          <FanIcon className="w-4 h-4" />
          <p>
            Event name: <span className="text-black">{event.event_name}</span>
          </p>
        </span>
        <span className="flex items-center gap-1 text-zinc-500">
          <BlocksIcon className="w-4 h-4" />
          <p>
            Integration name:{" "}
            <span className="text-black">{event.integration_name}</span>
          </p>
        </span>
        <span>
          {/* 
                This ternary should be replaced with a proper implementation.
                For this demo, I only use these two values.
            */}
          {event.integration_name === "AI" ? (
            <p>AI</p>
          ) : (
            <ul className="text-zinc-500 mt-4">
              <li>
                Room name:{" "}
                <Tooltip>
                  <TooltipTrigger>
                    {event.output.room_name.slice(0, 5) as string}...
                  </TooltipTrigger>
                  <TooltipContent>{event.output.room_name}</TooltipContent>
                </Tooltip>
              </li>
              <li>From number: {event.output.from_number}</li>
              <li>To number: {event.output.to_number}</li>
            </ul>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full mt-8">
      <p className="text-sm text-zinc-500">Events</p>
      <Accordion type="multiple">
        {run.events.map((event) => {
          return (
            <AccordionItem key={event.id} value={event.id}>
              <AccordionTrigger>
                {event.type === "session" ? "Session" : "Action"}
              </AccordionTrigger>
              <AccordionContent>
                {event.type === "session"
                  ? renderSessionEvent(event)
                  : renderActionEvent(event)}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
