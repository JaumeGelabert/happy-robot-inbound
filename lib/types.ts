export interface Load {
  load_id: string;
  origin: string;
  destination: string;
  pickup_datetime: string;
  delivery_datetime: string;
  equipment_type: string;
  loadboard_rate: number;
  notes: string;
  weight: number;
  commodity_type: string;
  num_of_pieces: number;
  miles: number;
  dimensions: string;
}

export interface UseCaseVersion {
  id: string;
  slug: string;
  org_id: string;
  use_case_id: string;
  version_number: number;
  name: string;
  is_published: boolean;
  is_live: boolean;
  environment: string;
  source_version_id: string | null;
  timestamp: string;
  published_at: string | null;
  is_deleted: boolean;
  description: string;
  created_by: string;
}

export interface UseCase {
  id: string;
  org_id: string;
  icon: string;
  name: string;
  source_use_case_version_id: string | null;
  slug: string;
  order: number;
  run_columns: unknown[];
  timestamp: string;
  data_retention_days: number | null;
  webhooks: unknown[];
  versions: UseCaseVersion[];
}

export interface Run {
  id: string;
  status: "completed" | "failed" | "running";
  org_id: string;
  timestamp: string;
  use_case_id: string;
  version_id: string;
  annotation: null;
  completed_at: string;
  data: Record<string, unknown>;
}

// Detailed run interfaces
export interface ToolCall {
  id: string;
  function: {
    name: string;
    arguments: string;
  };
}

export interface LatencyBreakdown {
  eos: number;
  llm: number;
  tts: number;
  network: number;
  eos_wait: number;
  transcriber: number;
  initial_wait: number;
  dynamic_wait_buffer: number;
  interruption_adjustment: number;
}

export interface SessionMessage {
  id: string;
  session_id: string;
  chat_session_id: string | null;
  role: "assistant" | "user" | "tool" | "event";
  content: string;
  tool_calls: ToolCall[] | null;
  name: string | null;
  is_filler: boolean;
  is_interrupted: boolean;
  is_natural_cut: boolean;
  latency_breakdown: LatencyBreakdown | null;
  timestamp: string;
  data_deleted: boolean;
}

export interface SessionIntermediate {
  id: string;
  run_id: string;
  node_id: string;
  event_id: string;
  session_id: string;
  name: string;
  data: Record<string, unknown>;
  error: string | null;
  timestamp: string;
  data_deleted: boolean;
}

export interface LoadDetails {
  miles: number;
  notes: string;
  origin: string;
  weight: number;
  load_id: string;
  dimensions: string;
  destination: string;
  num_of_pieces: number;
  commodity_type: string;
  equipment_type: string;
  loadboard_rate: number;
  pickup_datetime: string;
  delivery_datetime: string;
}

export interface SessionAction {
  timestamp: string;
  index: number;
  integration_name?: string;
  status?: "completed";
  duration?: number;
  transcript?: string;
  prompt?: string;
  initial_message?: string;
  intermediate?: SessionIntermediate;
  error?: string | null;
  allowed?: boolean;
  load?: LoadDetails;
  eos?: string;
  now?: {
    ts: number;
    day: number;
    iso: string;
    year: number;
    month: number;
    friendly: string;
  };
  from?: string;
  agent?: {
    name: string;
    voice: {
      id: string;
      name: string;
      language: string;
    };
  };
  number?: string;
  record?: boolean;
  keyterms?: string;
  numerals?: boolean;
  room_name?: string;
  background?: string;
  session_id?: string;
  use_memory?: boolean;
  voice_gain?: number;
  transcriber?: string;
  memory_window?: number;
  multi_lingual?: boolean;
  max_call_duration?: number;
  disable_time_fillers?: boolean;
  play_recording_message?: boolean;
  stay_silent_instructions?: string;
}

export interface SessionEvent {
  type: "session";
  id: string;
  node_id: string;
  status: "completed";
  session_type: "inbound";
  duration: number;
  actions: SessionAction[];
  messages: SessionMessage[];
  timestamp: string;
  sip_code: string | null;
  sip_reason: string | null;
}

export interface ActionEvent {
  type: "action";
  id: string;
  node_id: string;
  integration_name: string;
  event_name: string;
  output: Record<string, unknown>;
  timestamp: string;
}

export type RunEvent = SessionEvent | ActionEvent;

export interface DetailedRunVersion {
  id: string;
  slug: string;
  org_id: string;
  use_case_id: string;
  version_number: number;
  name: string;
  is_published: boolean;
  is_live: boolean;
  environment: string;
  source_version_id: string | null;
  timestamp: string;
  published_at: string | null;
  is_deleted: boolean;
  description: string;
  created_by: string;
}

export interface DetailedRun {
  id: string;
  org_id: string;
  use_case_id: string;
  version_id: string;
  status: "completed" | "failed";
  annotation: string | null;
  timestamp: string;
  completed_at: string;
  events: RunEvent[];
  issues: unknown[];
  version: DetailedRunVersion;
}
