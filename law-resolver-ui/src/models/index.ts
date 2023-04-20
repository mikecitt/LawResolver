export interface FileNames {
  fileNames: string[];
}

export enum DocumentType {
  ACT = "act",
  JUDGEMENT = "judgement",
}

export interface Case {
  id: number;
  court: string;
  caseNumber: string;
  judge: string;
  prosecutor: string;
  defendant: string;
  felony: string;
  judgementType: string;
  fine: number;
  prison: number;
  regulations: string[];
}

export interface CaseInfo {
  acase: Case;
  similarity: number;
}

export interface ResonerResponse {
  cases: CaseInfo[];
  rules: string;
}
