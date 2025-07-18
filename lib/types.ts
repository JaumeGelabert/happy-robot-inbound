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
  status: "completed" | "failed";
  org_id: string;
  timestamp: string;
  use_case_id: string;
  version_id: string;
  annotation: null;
  completed_at: string;
  data: Record<string, unknown>;
}
