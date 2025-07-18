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
  /**
   * The session events could be improved in the future. The amount of time needed to make it
   * look good, in this case, doesnt make sense for the small output.
   */
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
          <p className="mt-4">Details:</p>
          {event.integration_name === "AI" ? (
            <ul>
              <li>
                <p>Input: {event.output.input as string}</p>
              </li>
              <li>
                <p>Prompt: {event.output.prompt as string}</p>
              </li>
              <li>
                <p>Response: {JSON.stringify(event.output.response)}</p>
              </li>
            </ul>
          ) : (
            <ul className=" mt-1">
              <li>
                Room name:{" "}
                <Tooltip>
                  <TooltipTrigger>
                    {(event.output.room_name as string)?.slice(0, 5)}...
                  </TooltipTrigger>
                  <TooltipContent>
                    {event.output.room_name as string}
                  </TooltipContent>
                </Tooltip>
              </li>
              <li>From number: {event.output.from_number as string}</li>
              <li>To number: {event.output.to_number as string}</li>
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
