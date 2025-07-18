import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { SessionAction } from "@/lib/types";

export default function EventActionsTable({
  actions
}: {
  actions: SessionAction[];
}) {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getDescription = (action: SessionAction) => {
    // Show load information if available
    if (action.load) {
      return `Load ${action.load.load_id}: ${action.load.origin} → ${action.load.destination}`;
    }

    // Show initial message preview
    if (action.initial_message) {
      return action.initial_message.length > 50
        ? `${action.initial_message.substring(0, 50)}...`
        : action.initial_message;
    }

    // Show prompt preview
    if (action.prompt) {
      const preview = action.prompt.replace(/\n/g, " ").trim();
      return preview.length > 50 ? `${preview.substring(0, 50)}...` : preview;
    }

    // Show intermediate integration name
    if (action.intermediate) {
      return `Integration: ${action.intermediate.name}`;
    }

    // Show agent info
    if (action.agent) {
      return `Agent: ${action.agent.name} (${action.agent.voice.name})`;
    }

    // Show error details
    if (action.error) {
      return `Error: ${action.error}`;
    }

    return "-";
  };

  const getIntegration = (action: SessionAction) => {
    if (action.intermediate) {
      return action.intermediate.name;
    }
    if (action.agent) {
      return "Voice Agent";
    }
    return "-";
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Index</TableHead>
          <TableHead className="w-[80px]">Integration name</TableHead>
          <TableHead className="w-[120px]">Integration</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right w-[100px]">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actions.map((action, arrayIndex) => (
          <TableRow key={`${action.timestamp}-${arrayIndex}`}>
            <TableCell className="font-medium">{action.index}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {action.integration_name}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {getIntegration(action)}
            </TableCell>
            <TableCell className="text-sm">{getDescription(action)}</TableCell>
            <TableCell className="text-right text-sm text-muted-foreground">
              {formatTimestamp(action.timestamp)}
            </TableCell>
          </TableRow>
        ))}
        {actions.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No actions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
