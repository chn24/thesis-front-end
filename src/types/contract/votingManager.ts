/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IVotingManager {
  export type VotingStruct = {
    date: PromiseOrValue<BigNumberish>;
    index: PromiseOrValue<BigNumberish>;
    contractAddress: PromiseOrValue<string>;
    title: PromiseOrValue<BytesLike>;
  };

  export type VotingStructOutput = [number, number, string, string] & {
    date: number;
    index: number;
    contractAddress: string;
    title: string;
  };
}

export interface VotingManagerInterface extends utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "accountManager()": FunctionFragment;
    "createVoting(bytes,uint24)": FunctionFragment;
    "getAllVoting()": FunctionFragment;
    "handleDelegate(address,address)": FunctionFragment;
    "implement()": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setAccountManager(address)": FunctionFragment;
    "setImplement(address)": FunctionFragment;
    "totalVoting()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "votings(uint24)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptOwnership"
      | "accountManager"
      | "createVoting"
      | "getAllVoting"
      | "handleDelegate"
      | "implement"
      | "initialize"
      | "owner"
      | "pendingOwner"
      | "renounceOwnership"
      | "setAccountManager"
      | "setImplement"
      | "totalVoting"
      | "transferOwnership"
      | "votings"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "accountManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createVoting",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllVoting",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "handleDelegate",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "implement", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAccountManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setImplement",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "totalVoting",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "votings",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "accountManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleDelegate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "implement", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAccountManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setImplement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalVoting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "votings", data: BytesLike): Result;

  events: {
    "NewVoting(uint24,uint24,address,bytes)": EventFragment;
    "OwnershipTransferStarted(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewVoting"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface NewVotingEventObject {
  index: number;
  startTime: number;
  voting: string;
  title: string;
}
export type NewVotingEvent = TypedEvent<
  [number, number, string, string],
  NewVotingEventObject
>;

export type NewVotingEventFilter = TypedEventFilter<NewVotingEvent>;

export interface OwnershipTransferStartedEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferStartedEvent = TypedEvent<
  [string, string],
  OwnershipTransferStartedEventObject
>;

export type OwnershipTransferStartedEventFilter =
  TypedEventFilter<OwnershipTransferStartedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface VotingManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VotingManagerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    accountManager(overrides?: CallOverrides): Promise<[string]>;

    createVoting(
      title: PromiseOrValue<BytesLike>,
      startTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllVoting(
      overrides?: CallOverrides
    ): Promise<[IVotingManager.VotingStructOutput[]]>;

    handleDelegate(
      _user: PromiseOrValue<string>,
      delegater: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    implement(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _implement: PromiseOrValue<string>,
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingOwner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAccountManager(
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setImplement(
      _implement: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    totalVoting(overrides?: CallOverrides): Promise<[number]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    votings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, string, string] & {
        date: number;
        index: number;
        contractAddress: string;
        title: string;
      }
    >;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  accountManager(overrides?: CallOverrides): Promise<string>;

  createVoting(
    title: PromiseOrValue<BytesLike>,
    startTime: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllVoting(
    overrides?: CallOverrides
  ): Promise<IVotingManager.VotingStructOutput[]>;

  handleDelegate(
    _user: PromiseOrValue<string>,
    delegater: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<number>;

  implement(overrides?: CallOverrides): Promise<string>;

  initialize(
    _implement: PromiseOrValue<string>,
    _accountManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingOwner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAccountManager(
    _accountManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setImplement(
    _implement: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  totalVoting(overrides?: CallOverrides): Promise<number>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  votings(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, number, string, string] & {
      date: number;
      index: number;
      contractAddress: string;
      title: string;
    }
  >;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    accountManager(overrides?: CallOverrides): Promise<string>;

    createVoting(
      title: PromiseOrValue<BytesLike>,
      startTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    getAllVoting(
      overrides?: CallOverrides
    ): Promise<IVotingManager.VotingStructOutput[]>;

    handleDelegate(
      _user: PromiseOrValue<string>,
      delegater: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<number>;

    implement(overrides?: CallOverrides): Promise<string>;

    initialize(
      _implement: PromiseOrValue<string>,
      _accountManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingOwner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAccountManager(
      _accountManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setImplement(
      _implement: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    totalVoting(overrides?: CallOverrides): Promise<number>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    votings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, number, string, string] & {
        date: number;
        index: number;
        contractAddress: string;
        title: string;
      }
    >;
  };

  filters: {
    "NewVoting(uint24,uint24,address,bytes)"(
      index?: PromiseOrValue<BigNumberish> | null,
      startTime?: null,
      voting?: null,
      title?: null
    ): NewVotingEventFilter;
    NewVoting(
      index?: PromiseOrValue<BigNumberish> | null,
      startTime?: null,
      voting?: null,
      title?: null
    ): NewVotingEventFilter;

    "OwnershipTransferStarted(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferStartedEventFilter;
    OwnershipTransferStarted(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferStartedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    accountManager(overrides?: CallOverrides): Promise<BigNumber>;

    createVoting(
      title: PromiseOrValue<BytesLike>,
      startTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllVoting(overrides?: CallOverrides): Promise<BigNumber>;

    handleDelegate(
      _user: PromiseOrValue<string>,
      delegater: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    implement(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _implement: PromiseOrValue<string>,
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAccountManager(
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setImplement(
      _implement: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    totalVoting(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    votings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    accountManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createVoting(
      title: PromiseOrValue<BytesLike>,
      startTime: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllVoting(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    handleDelegate(
      _user: PromiseOrValue<string>,
      delegater: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    implement(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _implement: PromiseOrValue<string>,
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAccountManager(
      _accountManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setImplement(
      _implement: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    totalVoting(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    votings(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
