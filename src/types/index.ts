export interface SearchRequest {
  query_type: "PERSON" | "VEHICLE" | "PROPERTY";
  name?: string;
  dob?: string; // ISO 8601: YYYY-MM-DD
  plate_number?: string;
  requestor_id: string; // resolved from API key header, never from request body
}

export interface ExternalRecord {
  id: string; // stable deduplication key
  source_id: string;
  data: Record<string, unknown>;
}

export interface ExternalSourceResponse {
  source_id: string;
  records: ExternalRecord[];
  latency_ms: number;
  status: "OK" | "TIMEOUT" | "ERROR";
  error?: string;
}

export interface SearchResponse {
  results: ExternalRecord[];
  sources_queried: string[];
  degraded_sources: string[];
  total_results: number;
  latency_ms: number;
}

export interface AuditRecord {
  id: string; // UUID
  requestor_id: string;
  timestamp: string; // ISO 8601
  query_params: SearchRequest;
  sources_queried: string[];
  degraded_sources: string[];
  result_count: number;
  status: "IN_PROGRESS" | "COMPLETE" | "FAILED";
  duration_ms: number;
}