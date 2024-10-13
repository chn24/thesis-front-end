export enum USER_ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = {
  email: string;
  role: USER_ROLE;
  stakeAmount: number;
};

export type Proposal = {
  content: string;
  index: number;
  isImportant: boolean;
  option: OPTION;
};

export type Nomination = {
  index: number;
  content: string;
  isChosen?: boolean;
};

export type Answer = {
  index: number;
  option: OPTION;
};

export enum OPTION {
  AGREE,
  IGNORE,
  NO_COMMENT,
}

export type NewProposal = {
  content: string;
  isImportant: boolean;
  isChosen?: boolean;
};
