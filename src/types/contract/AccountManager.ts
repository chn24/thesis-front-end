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

export interface AccountManagerInterface extends utils.Interface {
  functions: {
    "acceptOwnership()": FunctionFragment;
    "delegate(address)": FunctionFragment;
    "emailVerified(bytes32,uint24)": FunctionFragment;
    "getCurrentBalance()": FunctionFragment;
    "getEthSignedMessageHash(bytes32)": FunctionFragment;
    "getMessageHash(address,uint128,bytes32)": FunctionFragment;
    "initialize(string)": FunctionFragment;
    "isAdmin(address)": FunctionFragment;
    "isValidSender(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pendingOwner()": FunctionFragment;
    "recoverSigner(bytes32,bytes)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setIsAdmin(address,bool)": FunctionFragment;
    "setIsValidSender(address,bool)": FunctionFragment;
    "setVotingManager(address)": FunctionFragment;
    "splitSignature(bytes)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "verify(uint128,bytes,bytes32)": FunctionFragment;
    "verifyValidAccount(address)": FunctionFragment;
    "votingManager()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptOwnership"
      | "delegate"
      | "emailVerified"
      | "getCurrentBalance"
      | "getEthSignedMessageHash"
      | "getMessageHash"
      | "initialize"
      | "isAdmin"
      | "isValidSender"
      | "owner"
      | "pendingOwner"
      | "recoverSigner"
      | "renounceOwnership"
      | "setIsAdmin"
      | "setIsValidSender"
      | "setVotingManager"
      | "splitSignature"
      | "transferOwnership"
      | "verify"
      | "verifyValidAccount"
      | "votingManager"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "delegate",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "emailVerified",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCurrentBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEthSignedMessageHash",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidSender",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pendingOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "recoverSigner",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setIsAdmin",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setIsValidSender",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setVotingManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "splitSignature",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "verifyValidAccount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "votingManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "emailVerified",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthSignedMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isValidSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pendingOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setIsAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setIsValidSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setVotingManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "splitSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyValidAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "votingManager",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferStarted(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

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

export interface AccountManager extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AccountManagerInterface;

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

    delegate(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    emailVerified(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getCurrentBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getMessageHash(
      user: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      email: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    initialize(
      _message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isAdmin(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isValidSender(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pendingOwner(overrides?: CallOverrides): Promise<[string]>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setIsAdmin(
      _admin: PromiseOrValue<string>,
      _isAdmin: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setIsValidSender(
      contractAddress: PromiseOrValue<string>,
      isValid: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setVotingManager(
      _votingManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verify(
      amount: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      email: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifyValidAccount(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    votingManager(overrides?: CallOverrides): Promise<[string]>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  delegate(
    user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  emailVerified(
    arg0: PromiseOrValue<BytesLike>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getCurrentBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getEthSignedMessageHash(
    _messageHash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getMessageHash(
    user: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    email: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  initialize(
    _message: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isAdmin(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isValidSender(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  pendingOwner(overrides?: CallOverrides): Promise<string>;

  recoverSigner(
    _ethSignedMessageHash: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setIsAdmin(
    _admin: PromiseOrValue<string>,
    _isAdmin: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setIsValidSender(
    contractAddress: PromiseOrValue<string>,
    isValid: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setVotingManager(
    _votingManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  splitSignature(
    sig: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verify(
    amount: PromiseOrValue<BigNumberish>,
    signature: PromiseOrValue<BytesLike>,
    email: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifyValidAccount(
    user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  votingManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    delegate(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    emailVerified(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getCurrentBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getMessageHash(
      user: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      email: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    initialize(
      _message: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isAdmin(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isValidSender(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    pendingOwner(overrides?: CallOverrides): Promise<string>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setIsAdmin(
      _admin: PromiseOrValue<string>,
      _isAdmin: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setIsValidSender(
      contractAddress: PromiseOrValue<string>,
      isValid: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setVotingManager(
      _votingManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    verify(
      amount: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      email: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    verifyValidAccount(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    votingManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
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

    delegate(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    emailVerified(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCurrentBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMessageHash(
      user: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      email: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isAdmin(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isValidSender(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setIsAdmin(
      _admin: PromiseOrValue<string>,
      _isAdmin: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setIsValidSender(
      contractAddress: PromiseOrValue<string>,
      isValid: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setVotingManager(
      _votingManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verify(
      amount: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      email: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifyValidAccount(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    votingManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    delegate(
      user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    emailVerified(
      arg0: PromiseOrValue<BytesLike>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCurrentBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMessageHash(
      user: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      email: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isAdmin(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isValidSender(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setIsAdmin(
      _admin: PromiseOrValue<string>,
      _isAdmin: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setIsValidSender(
      contractAddress: PromiseOrValue<string>,
      isValid: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setVotingManager(
      _votingManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verify(
      amount: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      email: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifyValidAccount(
      user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    votingManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}