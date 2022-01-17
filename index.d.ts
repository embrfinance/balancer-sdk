import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { TokenPriceService, PoolDataService, SOR } from '@balancer-labs/sor';
export { PoolFilter, SOR, SubgraphPoolBase, SwapInfo, SwapOptions, SwapTypes, SwapV2, phantomStableBPTForTokensZeroPriceImpact, queryBatchSwapTokensIn, queryBatchSwapTokensOut, stableBPTForTokensZeroPriceImpact, weightedBPTForTokensZeroPriceImpact } from '@balancer-labs/sor';
import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import * as graphql_language_ast from 'graphql/language/ast';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { Signer, TypedDataSigner } from '@ethersproject/abstract-signer';

declare enum StablePoolJoinKind {
    INIT = 0,
    EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
    TOKEN_IN_FOR_EXACT_BPT_OUT = 2
}
declare enum StablePhantomPoolJoinKind {
    INIT = 0,
    COLLECT_PROTOCOL_FEES = 1
}
declare enum StablePoolExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
    EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
    BPT_IN_FOR_EXACT_TOKENS_OUT = 2
}
declare class StablePoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for providing the initial liquidity to a StablePool
     * @param initialBalances - the amounts of tokens to send to the pool to form the initial balances
     */
    static joinInit: (amountsIn: BigNumberish[]) => string;
    /**
     * Encodes the userData parameter for collecting protocol fees for StablePhantomPool
     */
    static joinCollectProtocolFees: () => string;
    /**
     * Encodes the userData parameter for joining a StablePool with exact token inputs
     * @param amountsIn - the amounts each of token to deposit in the pool as liquidity
     * @param minimumBPT - the minimum acceptable BPT to receive in return for deposited tokens
     */
    static joinExactTokensInForBPTOut: (amountsIn: BigNumberish[], minimumBPT: BigNumberish) => string;
    /**
     * Encodes the userData parameter for joining a StablePool with to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     * @param enterTokenIndex - the index of the token to be provided as liquidity
     */
    static joinTokenInForExactBPTOut: (bptAmountOut: BigNumberish, enterTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing a single token in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     * @param enterTokenIndex - the index of the token to removed from the pool
     */
    static exitExactBPTInForOneTokenOut: (bptAmountIn: BigNumberish, exitTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing tokens in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     */
    static exitExactBPTInForTokensOut: (bptAmountIn: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a StablePool by removing exact amounts of tokens
     * @param amountsOut - the amounts of each token to be withdrawn from the pool
     * @param maxBPTAmountIn - the minimum acceptable BPT to burn in return for withdrawn tokens
     */
    static exitBPTInForExactTokensOut: (amountsOut: BigNumberish[], maxBPTAmountIn: BigNumberish) => string;
}

declare enum WeightedPoolJoinKind {
    INIT = 0,
    EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
    TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
    ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3
}
declare enum WeightedPoolExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
    EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
    BPT_IN_FOR_EXACT_TOKENS_OUT = 2,
    MANAGEMENT_FEE_TOKENS_OUT = 3
}
declare class WeightedPoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for providing the initial liquidity to a WeightedPool
     * @param initialBalances - the amounts of tokens to send to the pool to form the initial balances
     */
    static joinInit: (amountsIn: BigNumberish[]) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool with exact token inputs
     * @param amountsIn - the amounts each of token to deposit in the pool as liquidity
     * @param minimumBPT - the minimum acceptable BPT to receive in return for deposited tokens
     */
    static joinExactTokensInForBPTOut: (amountsIn: BigNumberish[], minimumBPT: BigNumberish) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool with a single token to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     * @param enterTokenIndex - the index of the token to be provided as liquidity
     */
    static joinTokenInForExactBPTOut: (bptAmountOut: BigNumberish, enterTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for joining a WeightedPool proportionally to receive an exact amount of BPT
     * @param bptAmountOut - the amount of BPT to be minted
     */
    static joinAllTokensInForExactBPTOut: (bptAmountOut: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing a single token in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     * @param enterTokenIndex - the index of the token to removed from the pool
     */
    static exitExactBPTInForOneTokenOut: (bptAmountIn: BigNumberish, exitTokenIndex: number) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing tokens in return for an exact amount of BPT
     * @param bptAmountIn - the amount of BPT to be burned
     */
    static exitExactBPTInForTokensOut: (bptAmountIn: BigNumberish) => string;
    /**
     * Encodes the userData parameter for exiting a WeightedPool by removing exact amounts of tokens
     * @param amountsOut - the amounts of each token to be withdrawn from the pool
     * @param maxBPTAmountIn - the minimum acceptable BPT to burn in return for withdrawn tokens
     */
    static exitBPTInForExactTokensOut: (amountsOut: BigNumberish[], maxBPTAmountIn: BigNumberish) => string;
}
declare class ManagedPoolEncoder {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Encodes the userData parameter for exiting a ManagedPool for withdrawing management fees.
     * This can only be done by the pool owner.
     */
    static exitForManagementFees: () => string;
}

/**
 * Normalize an array of token weights to ensure they sum to `1e18`
 * @param weights - an array of token weights to be normalized
 * @returns an equivalent set of normalized weights
 */
declare function toNormalizedWeights(weights: BigNumber[]): BigNumber[];
/**
 * Check whether a set of weights are normalized
 * @param weights - an array of potentially unnormalized weights
 * @returns a boolean of whether the weights are normalized
 */
declare const isNormalizedWeights: (weights: BigNumberish[]) => boolean;

declare enum Network {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GÖRLI = 5,
    KOVAN = 42,
    POLYGON = 137,
    ARBITRUM = 42161
}

interface BalancerSdkConfig {
    network: Network | BalancerNetworkConfig;
    rpcUrl: string;
    customSubgraphUrl?: string;
    sor?: Partial<BalancerSdkSorConfig>;
}
interface BalancerSdkSorConfig {
    tokenPriceService: 'coingecko' | 'subgraph' | TokenPriceService;
    poolDataService: 'subgraph' | PoolDataService;
    fetchOnChainBalances: boolean;
}
interface BalancerNetworkConfig {
    chainId: Network;
    vault: string;
    weth: string;
    multicall: string;
    staBal3Pool?: {
        id: string;
        address: string;
    };
    wethStaBal3?: {
        id: string;
        address: string;
    };
    subgraphUrl: string;
}
declare enum PoolSpecialization {
    GeneralPool = 0,
    MinimalSwapInfoPool = 1,
    TwoTokenPool = 2
}
declare type JoinPoolRequest = {
    assets: string[];
    maxAmountsIn: BigNumberish[];
    userData: string;
    fromInternalBalance: boolean;
};
declare type ExitPoolRequest = {
    assets: string[];
    minAmountsOut: string[];
    userData: string;
    toInternalBalance: boolean;
};
declare enum UserBalanceOpKind {
    DepositInternal = 0,
    WithdrawInternal = 1,
    TransferInternal = 2,
    TransferExternal = 3
}
declare type UserBalanceOp = {
    kind: UserBalanceOpKind;
    asset: string;
    amount: BigNumberish;
    sender: string;
    recipient: string;
};
declare enum PoolBalanceOpKind {
    Withdraw = 0,
    Deposit = 1,
    Update = 2
}
declare type PoolBalanceOp = {
    kind: PoolBalanceOpKind;
    poolId: string;
    token: string;
    amount: BigNumberish;
};
interface TransactionData {
    contract?: Contract;
    function: string;
    params: string[];
    outputs?: any;
}

/**
 * Splits a poolId into its components, i.e. pool address, pool specialization and its nonce
 * @param poolId - a bytes32 string of the pool's ID
 * @returns an object with the decomposed poolId
 */
declare const splitPoolId: (poolId: string) => {
    address: string;
    specialization: PoolSpecialization;
    nonce: BigNumber;
};
/**
 * Extracts a pool's address from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's address
 */
declare const getPoolAddress: (poolId: string) => string;
/**
 * Extracts a pool's specialization from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's specialization
 */
declare const getPoolSpecialization: (poolId: string) => PoolSpecialization;
/**
 * Extracts a pool's nonce from its poolId
 * @param poolId - a bytes32 string of the pool's ID
 * @returns the pool's nonce
 */
declare const getPoolNonce: (poolId: string) => BigNumber;

declare class BalancerErrors {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static isErrorCode: (error: string) => boolean;
    /**
     * Decodes a Balancer error code into the corresponding reason
     * @param error - a Balancer error code of the form `BAL#000`
     * @returns The decoded error reason
     */
    static parseErrorCode: (error: string) => string;
    /**
     * Decodes a Balancer error code into the corresponding reason
     * @param error - a Balancer error code of the form `BAL#000`
     * @returns The decoded error reason if passed a valid error code, otherwise returns passed input
     */
    static tryParseErrorCode: (error: string) => string;
    /**
     * Tests whether a string is a known Balancer error message
     * @param error - a string to be checked verified as a Balancer error message
     */
    static isBalancerError: (error: string) => boolean;
    /**
     * Encodes an error string into the corresponding error code
     * @param error - a Balancer error message string
     * @returns a Balancer error code of the form `BAL#000`
     */
    static encodeError: (error: string) => string;
}

declare type Account = string | Signer | Contract;
declare function accountToAddress(account: Account): Promise<string>;
declare enum RelayerAction {
    JoinPool = "JoinPool",
    ExitPool = "ExitPool",
    Swap = "Swap",
    BatchSwap = "BatchSwap",
    SetRelayerApproval = "SetRelayerApproval"
}
declare class RelayerAuthorization {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeCalldataAuthorization: (calldata: string, deadline: BigNumberish, signature: string) => string;
    static signJoinAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signExitAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signSwapAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signBatchSwapAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signSetRelayerApprovalAuthorization: (validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish | undefined, nonce?: BigNumberish | undefined) => Promise<string>;
    static signAuthorizationFor: (type: RelayerAction, validator: Contract, user: Signer & TypedDataSigner, allowedSender: Account, allowedCalldata: string, deadline?: BigNumberish, nonce?: BigNumberish | undefined) => Promise<string>;
}

declare const signPermit: (token: Contract, owner: Signer & TypedDataSigner, spender: Account, amount: BigNumberish, deadline?: BigNumberish, nonce?: BigNumberish | undefined) => Promise<{
    v: number;
    r: string;
    s: string;
    deadline: BigNumber;
    nonce: BigNumber;
}>;

declare class AssetHelpers {
    readonly ETH: string;
    readonly WETH: string;
    constructor(wethAddress: string);
    static isEqual: (addressA: string, addressB: string) => boolean;
    /**
     * Tests whether `token` is ETH (represented by `0x0000...0000`).
     *
     * @param token - the address of the asset to be checked
     */
    isETH: (token: string) => boolean;
    /**
     * Tests whether `token` is WETH.
     *
     * @param token - the address of the asset to be checked
     */
    isWETH: (token: string) => boolean;
    /**
     * Converts an asset to the equivalent ERC20 address.
     *
     * For ERC20s this will return the passed address but passing ETH (`0x0000...0000`) will return the WETH address
     * @param token - the address of the asset to be translated to an equivalent ERC20
     * @returns the address of translated ERC20 asset
     */
    translateToERC20: (token: string) => string;
    /**
     * Sorts an array of token addresses into ascending order to match the format expected by the Vault.
     *
     * Passing additional arrays will result in each being sorted to maintain relative ordering to token addresses.
     *
     * The zero address (representing ETH) is sorted as if it were the WETH address.
     * This matches the behaviour expected by the Vault when receiving an array of addresses.
     *
     * @param tokens - an array of token addresses to be sorted in ascending order
     * @param others - a set of arrays to be sorted in the same order as the tokens, e.g. token weights or asset manager addresses
     * @returns an array of the form `[tokens, ...others]` where each subarray has been sorted to maintain its ordering relative to `tokens`
     *
     * @example
     * const [tokens] = sortTokens([tokenB, tokenC, tokenA])
     * const [tokens, weights] = sortTokens([tokenB, tokenC, tokenA], [weightB, weightC, weightA])
     * // where tokens = [tokenA, tokenB, tokenC], weights = [weightA, weightB, weightC]
     */
    sortTokens(tokens: string[], ...others: unknown[][]): [string[], ...unknown[][]];
}

declare class AaveHelpers {
    static getRate(rateProviderAddress: string, provider: JsonRpcProvider): Promise<string>;
}

declare const isSameAddress: (address1: string, address2: string) => boolean;

declare enum SwapType {
    SwapExactIn = 0,
    SwapExactOut = 1
}
declare type FundManagement = {
    sender: string;
    recipient: string;
    fromInternalBalance: boolean;
    toInternalBalance: boolean;
};
declare type SingleSwap = {
    poolId: string;
    kind: SwapType;
    assetIn: string;
    assetOut: string;
    amount: BigNumberish;
    userData: string;
};
declare type Swap = {
    kind: SwapType;
    singleSwap: SingleSwap;
    limit: BigNumberish;
    deadline: BigNumberish;
};
declare type BatchSwapStep = {
    poolId: string;
    assetInIndex: number;
    assetOutIndex: number;
    amount: string;
    userData: string;
};
declare type BatchSwap = {
    kind: SwapType;
    swaps: BatchSwapStep[];
    assets: string[];
    funds: FundManagement;
    limits: BigNumberish[];
    deadline: BigNumberish;
};
interface FetchPoolsInput {
    fetchPools: boolean;
    fetchOnChain: boolean;
}
interface QueryWithSorInput {
    tokensIn: string[];
    tokensOut: string[];
    swapType: SwapType;
    amounts: string[];
    fetchPools: FetchPoolsInput;
}
interface QueryWithSorOutput {
    returnAmounts: string[];
    swaps: BatchSwapStep[];
    assets: string[];
    deltas: string[];
}

declare class SwapsService {
    private readonly network;
    private readonly sor;
    private readonly provider;
    constructor(network: BalancerNetworkConfig, sor: SOR, provider: Provider);
    static getLimitsForSlippage(tokensIn: string[], tokensOut: string[], swapType: SwapType, deltas: string[], assets: string[], slippage: string): string[];
    /**
     * fetchPools saves updated pools data to SOR internal onChainBalanceCache.
     * @param {SubgraphPoolBase[]} [poolsData=[]] If poolsData passed uses this as pools source otherwise fetches from config.subgraphUrl.
     * @param {boolean} [isOnChain=true] If isOnChain is true will retrieve all required onChain data via multicall otherwise uses subgraph values.
     * @returns {boolean} Boolean indicating whether pools data was fetched correctly (true) or not (false).
     */
    fetchPools(): Promise<boolean>;
    /**
     * queryBatchSwap simulates a call to `batchSwap`, returning an array of Vault asset deltas.
     * @param batchSwap - BatchSwap information used for query.
     * @param {SwapType} batchSwap.kind - either exactIn or exactOut.
     * @param {BatchSwapStep[]} batchSwap.swaps - sequence of swaps.
     * @param {string[]} batchSwap.assets - array contains the addresses of all assets involved in the swaps.
     * @returns {Promise<string[]>} Returns an array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the
     * Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset at
     * the same index in the `assets` array.
     */
    queryBatchSwap(batchSwap: Pick<BatchSwap, 'kind' | 'swaps' | 'assets'>): Promise<string[]>;
    /**
     * Uses SOR to create and query a batchSwap.
     * @param {QueryWithSorInput} queryWithSor - Swap information used for querying using SOR.
     * @param {string[]} queryWithSor.tokensIn - Array of addresses of assets in.
     * @param {string[]} queryWithSor.tokensOut - Array of addresses of assets out.
     * @param {SwapType} queryWithSor.swapType - Type of Swap, ExactIn/Out.
     * @param {string[]} queryWithSor.amounts - Array of amounts used in swap.
     * @param {FetchPoolsInput} queryWithSor.fetchPools - Set whether SOR will fetch updated pool info.
     * @returns {Promise<QueryWithSorOutput>} Returns amount of tokens swaps along with swap and asset info that can be submitted to a batchSwap call.
     */
    queryBatchSwapWithSor(queryWithSor: QueryWithSorInput): Promise<QueryWithSorOutput>;
}

declare function getLimitsForSlippage(tokensIn: string[], tokensOut: string[], swapType: SwapType, deltas: BigNumberish[], assets: string[], slippage: BigNumberish): BigNumberish[];

declare type OutputReference = {
    index: number;
    key: BigNumber;
};
interface EncodeBatchSwapInput {
    swapType: SwapType;
    swaps: BatchSwapStep[];
    assets: string[];
    funds: FundManagement;
    limits: string[];
    deadline: BigNumberish;
    value: BigNumberish;
    outputReferences: OutputReference[];
}
interface EncodeExitPoolInput {
    poolId: string;
    poolKind: number;
    sender: string;
    recipient: string;
    outputReferences: OutputReference[];
    exitPoolRequest: ExitPoolRequest;
}
interface EncodeUnwrapAaveStaticTokenInput {
    staticToken: string;
    sender: string;
    recipient: string;
    amount: BigNumberish;
    toUnderlying: boolean;
    outputReferences: BigNumberish;
}
interface ExitAndBatchSwapInput {
    exiter: string;
    swapRecipient: string;
    poolId: string;
    exitTokens: string[];
    userData: string;
    expectedAmountsOut: string[];
    finalTokensOut: string[];
    slippage: string;
    fetchPools: FetchPoolsInput;
}
declare type ExitPoolData = ExitPoolRequest & EncodeExitPoolInput;

declare class RelayerService {
    swapsService: SwapsService;
    rpcUrl: string;
    static CHAINED_REFERENCE_PREFIX: string;
    constructor(swapsService: SwapsService, rpcUrl: string);
    static encodeBatchSwap(params: EncodeBatchSwapInput): string;
    static encodeExitPool(params: EncodeExitPoolInput): string;
    static encodeUnwrapAaveStaticToken(params: EncodeUnwrapAaveStaticTokenInput): string;
    static toChainedReference(key: BigNumberish): BigNumber;
    static constructExitCall(params: ExitPoolData): string;
    /**
     * exitPoolAndBatchSwap Chains poolExit with batchSwap to final tokens.
     * @param {ExitAndBatchSwapInput} params
     * @param {string} exiter - Address used to exit pool.
     * @param {string} swapRecipient - Address that receives final tokens.
     * @param {string} poolId - Id of pool being exited.
     * @param {string[]} exitTokens - Array containing addresses of tokens to receive after exiting pool. (must have the same length and order as the array returned by `getPoolTokens`.)
     * @param {string} userData - Encoded exitPool data.
     * @param {string[]} expectedAmountsOut - Expected amounts of exitTokens to receive when exiting pool.
     * @param {string[]} finalTokensOut - Array containing the addresses of the final tokens out.
     * @param {string} slippage - Slippage to be applied to swap section. i.e. 5%=50000000000000000.
     * @param {FetchPoolsInput} fetchPools - Set whether SOR will fetch updated pool info.
     * @returns Transaction data with calldata. Outputs.amountsOut has amounts of finalTokensOut returned.
     */
    exitPoolAndBatchSwap(params: ExitAndBatchSwapInput): Promise<TransactionData>;
    /**
     * swapUnwrapAaveStaticExactIn Finds swaps for tokenIn>wrapped Aave static tokens and chains with unwrap to underlying stable.
     * @param {string[]} tokensIn - array to token addresses for swapping as tokens in.
     * @param {string[]} aaveStaticTokens - array contains the addresses of the Aave static tokens that tokenIn will be swapped to. These will be unwrapped.
     * @param {string[]} amountsIn - amounts to be swapped for each token in.
     * @param {string[]} rates - The rate used to convert wrappedToken to underlying.
     * @param {FundManagement} funds - Funding info for swap. Note - recipient should be relayer and sender should be caller.
     * @param {string} slippage - Slippage to be applied to swap section. i.e. 5%=50000000000000000.
     * @param {FetchPoolsInput} fetchPools - Set whether SOR will fetch updated pool info.
     * @returns Transaction data with calldata. Outputs.amountsOut has final amounts out of unwrapped tokens.
     */
    swapUnwrapAaveStaticExactIn(tokensIn: string[], aaveStaticTokens: string[], amountsIn: string[], rates: string[], funds: FundManagement, slippage: string, fetchPools?: FetchPoolsInput): Promise<TransactionData>;
    /**
     * swapUnwrapAaveStaticExactOut Finds swaps for tokenIn>wrapped Aave static tokens and chains with unwrap to underlying stable.
     * @param {string[]} tokensIn - array to token addresses for swapping as tokens in.
     * @param {string[]} aaveStaticTokens - array contains the addresses of the Aave static tokens that tokenIn will be swapped to. These will be unwrapped.
     * @param {string[]} amountsUnwrapped - amounts of unwrapped tokens out.
     * @param {string[]} rates - The rate used to convert wrappedToken to underlying.
     * @param {FundManagement} funds - Funding info for swap. Note - recipient should be relayer and sender should be caller.
     * @param {string} slippage - Slippage to be applied to swap section. i.e. 5%=50000000000000000.
     * @param {FetchPoolsInput} fetchPools - Set whether SOR will fetch updated pool info.
     * @returns Transaction data with calldata. Outputs.amountsIn has the amounts of tokensIn.
     */
    swapUnwrapAaveStaticExactOut(tokensIn: string[], aaveStaticTokens: string[], amountsUnwrapped: string[], rates: string[], funds: FundManagement, slippage: string, fetchPools?: FetchPoolsInput): Promise<TransactionData>;
    /**
     * Creates encoded multicalls using swap outputs as input amounts for token unwrap.
     * @param wrappedTokens
     * @param swapType
     * @param swaps
     * @param assets
     * @param funds
     * @param limits
     * @returns
     */
    encodeSwapUnwrap(wrappedTokens: string[], swapType: SwapType, swaps: BatchSwapStep[], assets: string[], funds: FundManagement, limits: BigNumberish[]): string[];
}

declare type Maybe<T> = T | null;
declare type InputMaybe<T> = Maybe<T>;
declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: string;
    BigInt: string;
    Bytes: string;
};
declare type SubgraphAmpUpdate = {
    __typename?: 'AmpUpdate';
    endAmp: Scalars['BigInt'];
    endTimestamp: Scalars['Int'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    scheduledTimestamp: Scalars['Int'];
    startAmp: Scalars['BigInt'];
    startTimestamp: Scalars['Int'];
};
declare type SubgraphAmpUpdate_Filter = {
    endAmp?: InputMaybe<Scalars['BigInt']>;
    endAmp_gt?: InputMaybe<Scalars['BigInt']>;
    endAmp_gte?: InputMaybe<Scalars['BigInt']>;
    endAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    endAmp_lt?: InputMaybe<Scalars['BigInt']>;
    endAmp_lte?: InputMaybe<Scalars['BigInt']>;
    endAmp_not?: InputMaybe<Scalars['BigInt']>;
    endAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    endTimestamp?: InputMaybe<Scalars['Int']>;
    endTimestamp_gt?: InputMaybe<Scalars['Int']>;
    endTimestamp_gte?: InputMaybe<Scalars['Int']>;
    endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    endTimestamp_lt?: InputMaybe<Scalars['Int']>;
    endTimestamp_lte?: InputMaybe<Scalars['Int']>;
    endTimestamp_not?: InputMaybe<Scalars['Int']>;
    endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    scheduledTimestamp?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    startAmp?: InputMaybe<Scalars['BigInt']>;
    startAmp_gt?: InputMaybe<Scalars['BigInt']>;
    startAmp_gte?: InputMaybe<Scalars['BigInt']>;
    startAmp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    startAmp_lt?: InputMaybe<Scalars['BigInt']>;
    startAmp_lte?: InputMaybe<Scalars['BigInt']>;
    startAmp_not?: InputMaybe<Scalars['BigInt']>;
    startAmp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    startTimestamp?: InputMaybe<Scalars['Int']>;
    startTimestamp_gt?: InputMaybe<Scalars['Int']>;
    startTimestamp_gte?: InputMaybe<Scalars['Int']>;
    startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    startTimestamp_lt?: InputMaybe<Scalars['Int']>;
    startTimestamp_lte?: InputMaybe<Scalars['Int']>;
    startTimestamp_not?: InputMaybe<Scalars['Int']>;
    startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
declare type SubgraphAmpUpdate_OrderBy = 'endAmp' | 'endTimestamp' | 'id' | 'poolId' | 'scheduledTimestamp' | 'startAmp' | 'startTimestamp';
declare type SubgraphBalancer = {
    __typename?: 'Balancer';
    id: Scalars['ID'];
    poolCount: Scalars['Int'];
    pools?: Maybe<Array<SubgraphPool>>;
    totalLiquidity: Scalars['BigDecimal'];
    totalSwapCount: Scalars['BigInt'];
    totalSwapFee: Scalars['BigDecimal'];
    totalSwapVolume: Scalars['BigDecimal'];
};
declare type SubgraphBalancerPoolsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPool_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPool_Filter>;
};
declare type SubgraphBalancerSnapshot = {
    __typename?: 'BalancerSnapshot';
    id: Scalars['ID'];
    poolCount: Scalars['Int'];
    timestamp: Scalars['Int'];
    totalLiquidity: Scalars['BigDecimal'];
    totalSwapCount: Scalars['BigInt'];
    totalSwapFee: Scalars['BigDecimal'];
    totalSwapVolume: Scalars['BigDecimal'];
    vault: SubgraphBalancer;
};
declare type SubgraphBalancerSnapshot_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolCount?: InputMaybe<Scalars['Int']>;
    poolCount_gt?: InputMaybe<Scalars['Int']>;
    poolCount_gte?: InputMaybe<Scalars['Int']>;
    poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
    poolCount_lt?: InputMaybe<Scalars['Int']>;
    poolCount_lte?: InputMaybe<Scalars['Int']>;
    poolCount_not?: InputMaybe<Scalars['Int']>;
    poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapCount?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vault?: InputMaybe<Scalars['String']>;
    vault_contains?: InputMaybe<Scalars['String']>;
    vault_ends_with?: InputMaybe<Scalars['String']>;
    vault_gt?: InputMaybe<Scalars['String']>;
    vault_gte?: InputMaybe<Scalars['String']>;
    vault_in?: InputMaybe<Array<Scalars['String']>>;
    vault_lt?: InputMaybe<Scalars['String']>;
    vault_lte?: InputMaybe<Scalars['String']>;
    vault_not?: InputMaybe<Scalars['String']>;
    vault_not_contains?: InputMaybe<Scalars['String']>;
    vault_not_ends_with?: InputMaybe<Scalars['String']>;
    vault_not_in?: InputMaybe<Array<Scalars['String']>>;
    vault_not_starts_with?: InputMaybe<Scalars['String']>;
    vault_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphBalancerSnapshot_OrderBy = 'id' | 'poolCount' | 'timestamp' | 'totalLiquidity' | 'totalSwapCount' | 'totalSwapFee' | 'totalSwapVolume' | 'vault';
declare type SubgraphBalancer_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolCount?: InputMaybe<Scalars['Int']>;
    poolCount_gt?: InputMaybe<Scalars['Int']>;
    poolCount_gte?: InputMaybe<Scalars['Int']>;
    poolCount_in?: InputMaybe<Array<Scalars['Int']>>;
    poolCount_lt?: InputMaybe<Scalars['Int']>;
    poolCount_lte?: InputMaybe<Scalars['Int']>;
    poolCount_not?: InputMaybe<Scalars['Int']>;
    poolCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
    totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapCount?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphBalancer_OrderBy = 'id' | 'poolCount' | 'pools' | 'totalLiquidity' | 'totalSwapCount' | 'totalSwapFee' | 'totalSwapVolume';
declare type SubgraphBlock_Height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
declare type SubgraphGradualWeightUpdate = {
    __typename?: 'GradualWeightUpdate';
    endTimestamp: Scalars['Int'];
    endWeights: Array<Scalars['BigInt']>;
    id: Scalars['ID'];
    poolId: SubgraphPool;
    scheduledTimestamp: Scalars['Int'];
    startTimestamp: Scalars['Int'];
    startWeights: Array<Scalars['BigInt']>;
};
declare type SubgraphGradualWeightUpdate_Filter = {
    endTimestamp?: InputMaybe<Scalars['Int']>;
    endTimestamp_gt?: InputMaybe<Scalars['Int']>;
    endTimestamp_gte?: InputMaybe<Scalars['Int']>;
    endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    endTimestamp_lt?: InputMaybe<Scalars['Int']>;
    endTimestamp_lte?: InputMaybe<Scalars['Int']>;
    endTimestamp_not?: InputMaybe<Scalars['Int']>;
    endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    endWeights?: InputMaybe<Array<Scalars['BigInt']>>;
    endWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    endWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
    endWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    scheduledTimestamp?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_gt?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_gte?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    scheduledTimestamp_lt?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_lte?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_not?: InputMaybe<Scalars['Int']>;
    scheduledTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    startTimestamp?: InputMaybe<Scalars['Int']>;
    startTimestamp_gt?: InputMaybe<Scalars['Int']>;
    startTimestamp_gte?: InputMaybe<Scalars['Int']>;
    startTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    startTimestamp_lt?: InputMaybe<Scalars['Int']>;
    startTimestamp_lte?: InputMaybe<Scalars['Int']>;
    startTimestamp_not?: InputMaybe<Scalars['Int']>;
    startTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    startWeights?: InputMaybe<Array<Scalars['BigInt']>>;
    startWeights_contains?: InputMaybe<Array<Scalars['BigInt']>>;
    startWeights_not?: InputMaybe<Array<Scalars['BigInt']>>;
    startWeights_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
};
declare type SubgraphGradualWeightUpdate_OrderBy = 'endTimestamp' | 'endWeights' | 'id' | 'poolId' | 'scheduledTimestamp' | 'startTimestamp' | 'startWeights';
declare type SubgraphInvestType = 'Exit' | 'Join';
declare type SubgraphInvestment = {
    __typename?: 'Investment';
    amount: Scalars['BigDecimal'];
    assetManagerAddress: Scalars['Bytes'];
    id: Scalars['ID'];
    poolTokenId: SubgraphPoolToken;
    timestamp: Scalars['Int'];
};
declare type SubgraphInvestment_Filter = {
    amount?: InputMaybe<Scalars['BigDecimal']>;
    amount_gt?: InputMaybe<Scalars['BigDecimal']>;
    amount_gte?: InputMaybe<Scalars['BigDecimal']>;
    amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amount_lt?: InputMaybe<Scalars['BigDecimal']>;
    amount_lte?: InputMaybe<Scalars['BigDecimal']>;
    amount_not?: InputMaybe<Scalars['BigDecimal']>;
    amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    assetManagerAddress?: InputMaybe<Scalars['Bytes']>;
    assetManagerAddress_contains?: InputMaybe<Scalars['Bytes']>;
    assetManagerAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    assetManagerAddress_not?: InputMaybe<Scalars['Bytes']>;
    assetManagerAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    assetManagerAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolTokenId?: InputMaybe<Scalars['String']>;
    poolTokenId_contains?: InputMaybe<Scalars['String']>;
    poolTokenId_ends_with?: InputMaybe<Scalars['String']>;
    poolTokenId_gt?: InputMaybe<Scalars['String']>;
    poolTokenId_gte?: InputMaybe<Scalars['String']>;
    poolTokenId_in?: InputMaybe<Array<Scalars['String']>>;
    poolTokenId_lt?: InputMaybe<Scalars['String']>;
    poolTokenId_lte?: InputMaybe<Scalars['String']>;
    poolTokenId_not?: InputMaybe<Scalars['String']>;
    poolTokenId_not_contains?: InputMaybe<Scalars['String']>;
    poolTokenId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolTokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolTokenId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolTokenId_starts_with?: InputMaybe<Scalars['String']>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
declare type SubgraphInvestment_OrderBy = 'amount' | 'assetManagerAddress' | 'id' | 'poolTokenId' | 'timestamp';
declare type SubgraphJoinExit = {
    __typename?: 'JoinExit';
    amounts: Array<Scalars['BigDecimal']>;
    id: Scalars['ID'];
    pool: SubgraphPool;
    sender: Scalars['Bytes'];
    timestamp: Scalars['Int'];
    tx: Scalars['Bytes'];
    type: SubgraphInvestType;
    user: SubgraphUser;
};
declare type SubgraphJoinExit_Filter = {
    amounts?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    pool?: InputMaybe<Scalars['String']>;
    pool_contains?: InputMaybe<Scalars['String']>;
    pool_ends_with?: InputMaybe<Scalars['String']>;
    pool_gt?: InputMaybe<Scalars['String']>;
    pool_gte?: InputMaybe<Scalars['String']>;
    pool_in?: InputMaybe<Array<Scalars['String']>>;
    pool_lt?: InputMaybe<Scalars['String']>;
    pool_lte?: InputMaybe<Scalars['String']>;
    pool_not?: InputMaybe<Scalars['String']>;
    pool_not_contains?: InputMaybe<Scalars['String']>;
    pool_not_ends_with?: InputMaybe<Scalars['String']>;
    pool_not_in?: InputMaybe<Array<Scalars['String']>>;
    pool_not_starts_with?: InputMaybe<Scalars['String']>;
    pool_starts_with?: InputMaybe<Scalars['String']>;
    sender?: InputMaybe<Scalars['Bytes']>;
    sender_contains?: InputMaybe<Scalars['Bytes']>;
    sender_in?: InputMaybe<Array<Scalars['Bytes']>>;
    sender_not?: InputMaybe<Scalars['Bytes']>;
    sender_not_contains?: InputMaybe<Scalars['Bytes']>;
    sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    tx?: InputMaybe<Scalars['Bytes']>;
    tx_contains?: InputMaybe<Scalars['Bytes']>;
    tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tx_not?: InputMaybe<Scalars['Bytes']>;
    tx_not_contains?: InputMaybe<Scalars['Bytes']>;
    tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    type?: InputMaybe<SubgraphInvestType>;
    type_in?: InputMaybe<Array<SubgraphInvestType>>;
    type_not?: InputMaybe<SubgraphInvestType>;
    type_not_in?: InputMaybe<Array<SubgraphInvestType>>;
    user?: InputMaybe<Scalars['String']>;
    user_contains?: InputMaybe<Scalars['String']>;
    user_ends_with?: InputMaybe<Scalars['String']>;
    user_gt?: InputMaybe<Scalars['String']>;
    user_gte?: InputMaybe<Scalars['String']>;
    user_in?: InputMaybe<Array<Scalars['String']>>;
    user_lt?: InputMaybe<Scalars['String']>;
    user_lte?: InputMaybe<Scalars['String']>;
    user_not?: InputMaybe<Scalars['String']>;
    user_not_contains?: InputMaybe<Scalars['String']>;
    user_not_ends_with?: InputMaybe<Scalars['String']>;
    user_not_in?: InputMaybe<Array<Scalars['String']>>;
    user_not_starts_with?: InputMaybe<Scalars['String']>;
    user_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphJoinExit_OrderBy = 'amounts' | 'id' | 'pool' | 'sender' | 'timestamp' | 'tx' | 'type' | 'user';
declare type SubgraphLatestPrice = {
    __typename?: 'LatestPrice';
    asset: Scalars['Bytes'];
    block: Scalars['BigInt'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    price: Scalars['BigDecimal'];
    pricingAsset: Scalars['Bytes'];
};
declare type SubgraphLatestPrice_Filter = {
    asset?: InputMaybe<Scalars['Bytes']>;
    asset_contains?: InputMaybe<Scalars['Bytes']>;
    asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
    asset_not?: InputMaybe<Scalars['Bytes']>;
    asset_not_contains?: InputMaybe<Scalars['Bytes']>;
    asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    block?: InputMaybe<Scalars['BigInt']>;
    block_gt?: InputMaybe<Scalars['BigInt']>;
    block_gte?: InputMaybe<Scalars['BigInt']>;
    block_in?: InputMaybe<Array<Scalars['BigInt']>>;
    block_lt?: InputMaybe<Scalars['BigInt']>;
    block_lte?: InputMaybe<Scalars['BigInt']>;
    block_not?: InputMaybe<Scalars['BigInt']>;
    block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    price?: InputMaybe<Scalars['BigDecimal']>;
    price_gt?: InputMaybe<Scalars['BigDecimal']>;
    price_gte?: InputMaybe<Scalars['BigDecimal']>;
    price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    price_lt?: InputMaybe<Scalars['BigDecimal']>;
    price_lte?: InputMaybe<Scalars['BigDecimal']>;
    price_not?: InputMaybe<Scalars['BigDecimal']>;
    price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    pricingAsset?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
    pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};
declare type SubgraphLatestPrice_OrderBy = 'asset' | 'block' | 'id' | 'poolId' | 'price' | 'pricingAsset';
declare type SubgraphOrderDirection = 'asc' | 'desc';
declare type SubgraphPool = {
    __typename?: 'Pool';
    address: Scalars['Bytes'];
    amp?: Maybe<Scalars['BigInt']>;
    baseToken?: Maybe<Scalars['Bytes']>;
    createTime: Scalars['Int'];
    expiryTime?: Maybe<Scalars['BigInt']>;
    factory?: Maybe<Scalars['Bytes']>;
    historicalValues?: Maybe<Array<SubgraphPoolHistoricalLiquidity>>;
    holdersCount: Scalars['BigInt'];
    id: Scalars['ID'];
    lowerTarget?: Maybe<Scalars['BigDecimal']>;
    mainIndex?: Maybe<Scalars['Int']>;
    managementFee?: Maybe<Scalars['BigDecimal']>;
    name?: Maybe<Scalars['String']>;
    owner?: Maybe<Scalars['Bytes']>;
    poolType?: Maybe<Scalars['String']>;
    priceRateProviders?: Maybe<Array<SubgraphPriceRateProvider>>;
    principalToken?: Maybe<Scalars['Bytes']>;
    shares?: Maybe<Array<SubgraphPoolShare>>;
    strategyType: Scalars['Int'];
    swapEnabled: Scalars['Boolean'];
    swapFee: Scalars['BigDecimal'];
    swaps?: Maybe<Array<SubgraphSwap>>;
    swapsCount: Scalars['BigInt'];
    symbol?: Maybe<Scalars['String']>;
    tokens?: Maybe<Array<SubgraphPoolToken>>;
    tokensList: Array<Scalars['Bytes']>;
    totalLiquidity: Scalars['BigDecimal'];
    totalShares: Scalars['BigDecimal'];
    totalSwapFee: Scalars['BigDecimal'];
    totalSwapVolume: Scalars['BigDecimal'];
    totalWeight?: Maybe<Scalars['BigDecimal']>;
    tx?: Maybe<Scalars['Bytes']>;
    unitSeconds?: Maybe<Scalars['BigInt']>;
    upperTarget?: Maybe<Scalars['BigDecimal']>;
    vaultID: SubgraphBalancer;
    weightUpdates?: Maybe<Array<SubgraphGradualWeightUpdate>>;
    wrappedIndex?: Maybe<Scalars['Int']>;
};
declare type SubgraphPoolHistoricalValuesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolHistoricalLiquidity_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPoolHistoricalLiquidity_Filter>;
};
declare type SubgraphPoolPriceRateProvidersArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPriceRateProvider_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPriceRateProvider_Filter>;
};
declare type SubgraphPoolSharesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolShare_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPoolShare_Filter>;
};
declare type SubgraphPoolSwapsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphSwap_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphSwap_Filter>;
};
declare type SubgraphPoolTokensArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolToken_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPoolToken_Filter>;
};
declare type SubgraphPoolWeightUpdatesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphGradualWeightUpdate_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphGradualWeightUpdate_Filter>;
};
declare type SubgraphPoolHistoricalLiquidity = {
    __typename?: 'PoolHistoricalLiquidity';
    block: Scalars['BigInt'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    poolLiquidity: Scalars['BigDecimal'];
    poolShareValue: Scalars['BigDecimal'];
    poolTotalShares: Scalars['BigDecimal'];
    pricingAsset: Scalars['Bytes'];
};
declare type SubgraphPoolHistoricalLiquidity_Filter = {
    block?: InputMaybe<Scalars['BigInt']>;
    block_gt?: InputMaybe<Scalars['BigInt']>;
    block_gte?: InputMaybe<Scalars['BigInt']>;
    block_in?: InputMaybe<Array<Scalars['BigInt']>>;
    block_lt?: InputMaybe<Scalars['BigInt']>;
    block_lte?: InputMaybe<Scalars['BigInt']>;
    block_not?: InputMaybe<Scalars['BigInt']>;
    block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    poolLiquidity?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    poolLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
    poolLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    poolShareValue?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_gt?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_gte?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    poolShareValue_lt?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_lte?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_not?: InputMaybe<Scalars['BigDecimal']>;
    poolShareValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    poolTotalShares?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    poolTotalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_not?: InputMaybe<Scalars['BigDecimal']>;
    poolTotalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    pricingAsset?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
    pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};
declare type SubgraphPoolHistoricalLiquidity_OrderBy = 'block' | 'id' | 'poolId' | 'poolLiquidity' | 'poolShareValue' | 'poolTotalShares' | 'pricingAsset';
declare type SubgraphPoolShare = {
    __typename?: 'PoolShare';
    balance: Scalars['BigDecimal'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    userAddress: SubgraphUser;
};
declare type SubgraphPoolShare_Filter = {
    balance?: InputMaybe<Scalars['BigDecimal']>;
    balance_gt?: InputMaybe<Scalars['BigDecimal']>;
    balance_gte?: InputMaybe<Scalars['BigDecimal']>;
    balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    balance_lt?: InputMaybe<Scalars['BigDecimal']>;
    balance_lte?: InputMaybe<Scalars['BigDecimal']>;
    balance_not?: InputMaybe<Scalars['BigDecimal']>;
    balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    userAddress?: InputMaybe<Scalars['String']>;
    userAddress_contains?: InputMaybe<Scalars['String']>;
    userAddress_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_gt?: InputMaybe<Scalars['String']>;
    userAddress_gte?: InputMaybe<Scalars['String']>;
    userAddress_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_lt?: InputMaybe<Scalars['String']>;
    userAddress_lte?: InputMaybe<Scalars['String']>;
    userAddress_not?: InputMaybe<Scalars['String']>;
    userAddress_not_contains?: InputMaybe<Scalars['String']>;
    userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
    userAddress_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphPoolShare_OrderBy = 'balance' | 'id' | 'poolId' | 'userAddress';
declare type SubgraphPoolSnapshot = {
    __typename?: 'PoolSnapshot';
    amounts: Array<Scalars['BigDecimal']>;
    id: Scalars['ID'];
    liquidity: Scalars['BigDecimal'];
    pool: SubgraphPool;
    swapFees: Scalars['BigDecimal'];
    swapVolume: Scalars['BigDecimal'];
    timestamp: Scalars['Int'];
    totalShares: Scalars['BigDecimal'];
};
declare type SubgraphPoolSnapshot_Filter = {
    amounts?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_not?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amounts_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    liquidity?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    liquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_not?: InputMaybe<Scalars['BigDecimal']>;
    liquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    pool?: InputMaybe<Scalars['String']>;
    pool_contains?: InputMaybe<Scalars['String']>;
    pool_ends_with?: InputMaybe<Scalars['String']>;
    pool_gt?: InputMaybe<Scalars['String']>;
    pool_gte?: InputMaybe<Scalars['String']>;
    pool_in?: InputMaybe<Array<Scalars['String']>>;
    pool_lt?: InputMaybe<Scalars['String']>;
    pool_lte?: InputMaybe<Scalars['String']>;
    pool_not?: InputMaybe<Scalars['String']>;
    pool_not_contains?: InputMaybe<Scalars['String']>;
    pool_not_ends_with?: InputMaybe<Scalars['String']>;
    pool_not_in?: InputMaybe<Array<Scalars['String']>>;
    pool_not_starts_with?: InputMaybe<Scalars['String']>;
    pool_starts_with?: InputMaybe<Scalars['String']>;
    swapFees?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_gt?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_gte?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    swapFees_lt?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_lte?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_not?: InputMaybe<Scalars['BigDecimal']>;
    swapFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    swapVolume?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    swapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    swapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    totalShares?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_not?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphPoolSnapshot_OrderBy = 'amounts' | 'id' | 'liquidity' | 'pool' | 'swapFees' | 'swapVolume' | 'timestamp' | 'totalShares';
declare type SubgraphPoolToken = {
    __typename?: 'PoolToken';
    address: Scalars['String'];
    balance: Scalars['BigDecimal'];
    decimals: Scalars['Int'];
    id: Scalars['ID'];
    invested: Scalars['BigDecimal'];
    investments?: Maybe<Array<SubgraphInvestment>>;
    name: Scalars['String'];
    poolId: SubgraphPool;
    priceRate: Scalars['BigDecimal'];
    symbol: Scalars['String'];
    token: SubgraphToken;
    weight?: Maybe<Scalars['BigDecimal']>;
};
declare type SubgraphPoolTokenInvestmentsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphInvestment_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphInvestment_Filter>;
};
declare type SubgraphPoolToken_Filter = {
    address?: InputMaybe<Scalars['String']>;
    address_contains?: InputMaybe<Scalars['String']>;
    address_ends_with?: InputMaybe<Scalars['String']>;
    address_gt?: InputMaybe<Scalars['String']>;
    address_gte?: InputMaybe<Scalars['String']>;
    address_in?: InputMaybe<Array<Scalars['String']>>;
    address_lt?: InputMaybe<Scalars['String']>;
    address_lte?: InputMaybe<Scalars['String']>;
    address_not?: InputMaybe<Scalars['String']>;
    address_not_contains?: InputMaybe<Scalars['String']>;
    address_not_ends_with?: InputMaybe<Scalars['String']>;
    address_not_in?: InputMaybe<Array<Scalars['String']>>;
    address_not_starts_with?: InputMaybe<Scalars['String']>;
    address_starts_with?: InputMaybe<Scalars['String']>;
    balance?: InputMaybe<Scalars['BigDecimal']>;
    balance_gt?: InputMaybe<Scalars['BigDecimal']>;
    balance_gte?: InputMaybe<Scalars['BigDecimal']>;
    balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    balance_lt?: InputMaybe<Scalars['BigDecimal']>;
    balance_lte?: InputMaybe<Scalars['BigDecimal']>;
    balance_not?: InputMaybe<Scalars['BigDecimal']>;
    balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    decimals?: InputMaybe<Scalars['Int']>;
    decimals_gt?: InputMaybe<Scalars['Int']>;
    decimals_gte?: InputMaybe<Scalars['Int']>;
    decimals_in?: InputMaybe<Array<Scalars['Int']>>;
    decimals_lt?: InputMaybe<Scalars['Int']>;
    decimals_lte?: InputMaybe<Scalars['Int']>;
    decimals_not?: InputMaybe<Scalars['Int']>;
    decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    invested?: InputMaybe<Scalars['BigDecimal']>;
    invested_gt?: InputMaybe<Scalars['BigDecimal']>;
    invested_gte?: InputMaybe<Scalars['BigDecimal']>;
    invested_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    invested_lt?: InputMaybe<Scalars['BigDecimal']>;
    invested_lte?: InputMaybe<Scalars['BigDecimal']>;
    invested_not?: InputMaybe<Scalars['BigDecimal']>;
    invested_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    priceRate?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_gt?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_gte?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    priceRate_lt?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_lte?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_not?: InputMaybe<Scalars['BigDecimal']>;
    priceRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    token?: InputMaybe<Scalars['String']>;
    token_contains?: InputMaybe<Scalars['String']>;
    token_ends_with?: InputMaybe<Scalars['String']>;
    token_gt?: InputMaybe<Scalars['String']>;
    token_gte?: InputMaybe<Scalars['String']>;
    token_in?: InputMaybe<Array<Scalars['String']>>;
    token_lt?: InputMaybe<Scalars['String']>;
    token_lte?: InputMaybe<Scalars['String']>;
    token_not?: InputMaybe<Scalars['String']>;
    token_not_contains?: InputMaybe<Scalars['String']>;
    token_not_ends_with?: InputMaybe<Scalars['String']>;
    token_not_in?: InputMaybe<Array<Scalars['String']>>;
    token_not_starts_with?: InputMaybe<Scalars['String']>;
    token_starts_with?: InputMaybe<Scalars['String']>;
    weight?: InputMaybe<Scalars['BigDecimal']>;
    weight_gt?: InputMaybe<Scalars['BigDecimal']>;
    weight_gte?: InputMaybe<Scalars['BigDecimal']>;
    weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    weight_lt?: InputMaybe<Scalars['BigDecimal']>;
    weight_lte?: InputMaybe<Scalars['BigDecimal']>;
    weight_not?: InputMaybe<Scalars['BigDecimal']>;
    weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphPoolToken_OrderBy = 'address' | 'balance' | 'decimals' | 'id' | 'invested' | 'investments' | 'name' | 'poolId' | 'priceRate' | 'symbol' | 'token' | 'weight';
declare type SubgraphPool_Filter = {
    address?: InputMaybe<Scalars['Bytes']>;
    address_contains?: InputMaybe<Scalars['Bytes']>;
    address_in?: InputMaybe<Array<Scalars['Bytes']>>;
    address_not?: InputMaybe<Scalars['Bytes']>;
    address_not_contains?: InputMaybe<Scalars['Bytes']>;
    address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    amp?: InputMaybe<Scalars['BigInt']>;
    amp_gt?: InputMaybe<Scalars['BigInt']>;
    amp_gte?: InputMaybe<Scalars['BigInt']>;
    amp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    amp_lt?: InputMaybe<Scalars['BigInt']>;
    amp_lte?: InputMaybe<Scalars['BigInt']>;
    amp_not?: InputMaybe<Scalars['BigInt']>;
    amp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    baseToken?: InputMaybe<Scalars['Bytes']>;
    baseToken_contains?: InputMaybe<Scalars['Bytes']>;
    baseToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
    baseToken_not?: InputMaybe<Scalars['Bytes']>;
    baseToken_not_contains?: InputMaybe<Scalars['Bytes']>;
    baseToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    createTime?: InputMaybe<Scalars['Int']>;
    createTime_gt?: InputMaybe<Scalars['Int']>;
    createTime_gte?: InputMaybe<Scalars['Int']>;
    createTime_in?: InputMaybe<Array<Scalars['Int']>>;
    createTime_lt?: InputMaybe<Scalars['Int']>;
    createTime_lte?: InputMaybe<Scalars['Int']>;
    createTime_not?: InputMaybe<Scalars['Int']>;
    createTime_not_in?: InputMaybe<Array<Scalars['Int']>>;
    expiryTime?: InputMaybe<Scalars['BigInt']>;
    expiryTime_gt?: InputMaybe<Scalars['BigInt']>;
    expiryTime_gte?: InputMaybe<Scalars['BigInt']>;
    expiryTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
    expiryTime_lt?: InputMaybe<Scalars['BigInt']>;
    expiryTime_lte?: InputMaybe<Scalars['BigInt']>;
    expiryTime_not?: InputMaybe<Scalars['BigInt']>;
    expiryTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    factory?: InputMaybe<Scalars['Bytes']>;
    factory_contains?: InputMaybe<Scalars['Bytes']>;
    factory_in?: InputMaybe<Array<Scalars['Bytes']>>;
    factory_not?: InputMaybe<Scalars['Bytes']>;
    factory_not_contains?: InputMaybe<Scalars['Bytes']>;
    factory_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    holdersCount?: InputMaybe<Scalars['BigInt']>;
    holdersCount_gt?: InputMaybe<Scalars['BigInt']>;
    holdersCount_gte?: InputMaybe<Scalars['BigInt']>;
    holdersCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    holdersCount_lt?: InputMaybe<Scalars['BigInt']>;
    holdersCount_lte?: InputMaybe<Scalars['BigInt']>;
    holdersCount_not?: InputMaybe<Scalars['BigInt']>;
    holdersCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    lowerTarget?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_gt?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_gte?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    lowerTarget_lt?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_lte?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_not?: InputMaybe<Scalars['BigDecimal']>;
    lowerTarget_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    mainIndex?: InputMaybe<Scalars['Int']>;
    mainIndex_gt?: InputMaybe<Scalars['Int']>;
    mainIndex_gte?: InputMaybe<Scalars['Int']>;
    mainIndex_in?: InputMaybe<Array<Scalars['Int']>>;
    mainIndex_lt?: InputMaybe<Scalars['Int']>;
    mainIndex_lte?: InputMaybe<Scalars['Int']>;
    mainIndex_not?: InputMaybe<Scalars['Int']>;
    mainIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
    managementFee?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    managementFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_not?: InputMaybe<Scalars['BigDecimal']>;
    managementFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    poolType?: InputMaybe<Scalars['String']>;
    poolType_contains?: InputMaybe<Scalars['String']>;
    poolType_ends_with?: InputMaybe<Scalars['String']>;
    poolType_gt?: InputMaybe<Scalars['String']>;
    poolType_gte?: InputMaybe<Scalars['String']>;
    poolType_in?: InputMaybe<Array<Scalars['String']>>;
    poolType_lt?: InputMaybe<Scalars['String']>;
    poolType_lte?: InputMaybe<Scalars['String']>;
    poolType_not?: InputMaybe<Scalars['String']>;
    poolType_not_contains?: InputMaybe<Scalars['String']>;
    poolType_not_ends_with?: InputMaybe<Scalars['String']>;
    poolType_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolType_not_starts_with?: InputMaybe<Scalars['String']>;
    poolType_starts_with?: InputMaybe<Scalars['String']>;
    principalToken?: InputMaybe<Scalars['Bytes']>;
    principalToken_contains?: InputMaybe<Scalars['Bytes']>;
    principalToken_in?: InputMaybe<Array<Scalars['Bytes']>>;
    principalToken_not?: InputMaybe<Scalars['Bytes']>;
    principalToken_not_contains?: InputMaybe<Scalars['Bytes']>;
    principalToken_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    strategyType?: InputMaybe<Scalars['Int']>;
    strategyType_gt?: InputMaybe<Scalars['Int']>;
    strategyType_gte?: InputMaybe<Scalars['Int']>;
    strategyType_in?: InputMaybe<Array<Scalars['Int']>>;
    strategyType_lt?: InputMaybe<Scalars['Int']>;
    strategyType_lte?: InputMaybe<Scalars['Int']>;
    strategyType_not?: InputMaybe<Scalars['Int']>;
    strategyType_not_in?: InputMaybe<Array<Scalars['Int']>>;
    swapEnabled?: InputMaybe<Scalars['Boolean']>;
    swapEnabled_in?: InputMaybe<Array<Scalars['Boolean']>>;
    swapEnabled_not?: InputMaybe<Scalars['Boolean']>;
    swapEnabled_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    swapFee?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    swapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    swapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    swapsCount?: InputMaybe<Scalars['BigInt']>;
    swapsCount_gt?: InputMaybe<Scalars['BigInt']>;
    swapsCount_gte?: InputMaybe<Scalars['BigInt']>;
    swapsCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    swapsCount_lt?: InputMaybe<Scalars['BigInt']>;
    swapsCount_lte?: InputMaybe<Scalars['BigInt']>;
    swapsCount_not?: InputMaybe<Scalars['BigInt']>;
    swapsCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    tokensList?: InputMaybe<Array<Scalars['Bytes']>>;
    tokensList_contains?: InputMaybe<Array<Scalars['Bytes']>>;
    tokensList_not?: InputMaybe<Array<Scalars['Bytes']>>;
    tokensList_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
    totalLiquidity?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalLiquidity_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not?: InputMaybe<Scalars['BigDecimal']>;
    totalLiquidity_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalShares?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalShares_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_not?: InputMaybe<Scalars['BigDecimal']>;
    totalShares_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalWeight?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalWeight_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_not?: InputMaybe<Scalars['BigDecimal']>;
    totalWeight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    tx?: InputMaybe<Scalars['Bytes']>;
    tx_contains?: InputMaybe<Scalars['Bytes']>;
    tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tx_not?: InputMaybe<Scalars['Bytes']>;
    tx_not_contains?: InputMaybe<Scalars['Bytes']>;
    tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    unitSeconds?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_gt?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_gte?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_in?: InputMaybe<Array<Scalars['BigInt']>>;
    unitSeconds_lt?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_lte?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_not?: InputMaybe<Scalars['BigInt']>;
    unitSeconds_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    upperTarget?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_gt?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_gte?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    upperTarget_lt?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_lte?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_not?: InputMaybe<Scalars['BigDecimal']>;
    upperTarget_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    vaultID?: InputMaybe<Scalars['String']>;
    vaultID_contains?: InputMaybe<Scalars['String']>;
    vaultID_ends_with?: InputMaybe<Scalars['String']>;
    vaultID_gt?: InputMaybe<Scalars['String']>;
    vaultID_gte?: InputMaybe<Scalars['String']>;
    vaultID_in?: InputMaybe<Array<Scalars['String']>>;
    vaultID_lt?: InputMaybe<Scalars['String']>;
    vaultID_lte?: InputMaybe<Scalars['String']>;
    vaultID_not?: InputMaybe<Scalars['String']>;
    vaultID_not_contains?: InputMaybe<Scalars['String']>;
    vaultID_not_ends_with?: InputMaybe<Scalars['String']>;
    vaultID_not_in?: InputMaybe<Array<Scalars['String']>>;
    vaultID_not_starts_with?: InputMaybe<Scalars['String']>;
    vaultID_starts_with?: InputMaybe<Scalars['String']>;
    wrappedIndex?: InputMaybe<Scalars['Int']>;
    wrappedIndex_gt?: InputMaybe<Scalars['Int']>;
    wrappedIndex_gte?: InputMaybe<Scalars['Int']>;
    wrappedIndex_in?: InputMaybe<Array<Scalars['Int']>>;
    wrappedIndex_lt?: InputMaybe<Scalars['Int']>;
    wrappedIndex_lte?: InputMaybe<Scalars['Int']>;
    wrappedIndex_not?: InputMaybe<Scalars['Int']>;
    wrappedIndex_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
declare type SubgraphPool_OrderBy = 'address' | 'amp' | 'baseToken' | 'createTime' | 'expiryTime' | 'factory' | 'historicalValues' | 'holdersCount' | 'id' | 'lowerTarget' | 'mainIndex' | 'managementFee' | 'name' | 'owner' | 'poolType' | 'priceRateProviders' | 'principalToken' | 'shares' | 'strategyType' | 'swapEnabled' | 'swapFee' | 'swaps' | 'swapsCount' | 'symbol' | 'tokens' | 'tokensList' | 'totalLiquidity' | 'totalShares' | 'totalSwapFee' | 'totalSwapVolume' | 'totalWeight' | 'tx' | 'unitSeconds' | 'upperTarget' | 'vaultID' | 'weightUpdates' | 'wrappedIndex';
declare type SubgraphPriceRateProvider = {
    __typename?: 'PriceRateProvider';
    address: Scalars['Bytes'];
    cacheDuration: Scalars['Int'];
    cacheExpiry: Scalars['Int'];
    id: Scalars['ID'];
    lastCached: Scalars['Int'];
    poolId: SubgraphPool;
    rate: Scalars['BigDecimal'];
    token: SubgraphPoolToken;
};
declare type SubgraphPriceRateProvider_Filter = {
    address?: InputMaybe<Scalars['Bytes']>;
    address_contains?: InputMaybe<Scalars['Bytes']>;
    address_in?: InputMaybe<Array<Scalars['Bytes']>>;
    address_not?: InputMaybe<Scalars['Bytes']>;
    address_not_contains?: InputMaybe<Scalars['Bytes']>;
    address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    cacheDuration?: InputMaybe<Scalars['Int']>;
    cacheDuration_gt?: InputMaybe<Scalars['Int']>;
    cacheDuration_gte?: InputMaybe<Scalars['Int']>;
    cacheDuration_in?: InputMaybe<Array<Scalars['Int']>>;
    cacheDuration_lt?: InputMaybe<Scalars['Int']>;
    cacheDuration_lte?: InputMaybe<Scalars['Int']>;
    cacheDuration_not?: InputMaybe<Scalars['Int']>;
    cacheDuration_not_in?: InputMaybe<Array<Scalars['Int']>>;
    cacheExpiry?: InputMaybe<Scalars['Int']>;
    cacheExpiry_gt?: InputMaybe<Scalars['Int']>;
    cacheExpiry_gte?: InputMaybe<Scalars['Int']>;
    cacheExpiry_in?: InputMaybe<Array<Scalars['Int']>>;
    cacheExpiry_lt?: InputMaybe<Scalars['Int']>;
    cacheExpiry_lte?: InputMaybe<Scalars['Int']>;
    cacheExpiry_not?: InputMaybe<Scalars['Int']>;
    cacheExpiry_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    lastCached?: InputMaybe<Scalars['Int']>;
    lastCached_gt?: InputMaybe<Scalars['Int']>;
    lastCached_gte?: InputMaybe<Scalars['Int']>;
    lastCached_in?: InputMaybe<Array<Scalars['Int']>>;
    lastCached_lt?: InputMaybe<Scalars['Int']>;
    lastCached_lte?: InputMaybe<Scalars['Int']>;
    lastCached_not?: InputMaybe<Scalars['Int']>;
    lastCached_not_in?: InputMaybe<Array<Scalars['Int']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    rate?: InputMaybe<Scalars['BigDecimal']>;
    rate_gt?: InputMaybe<Scalars['BigDecimal']>;
    rate_gte?: InputMaybe<Scalars['BigDecimal']>;
    rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    rate_lt?: InputMaybe<Scalars['BigDecimal']>;
    rate_lte?: InputMaybe<Scalars['BigDecimal']>;
    rate_not?: InputMaybe<Scalars['BigDecimal']>;
    rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    token?: InputMaybe<Scalars['String']>;
    token_contains?: InputMaybe<Scalars['String']>;
    token_ends_with?: InputMaybe<Scalars['String']>;
    token_gt?: InputMaybe<Scalars['String']>;
    token_gte?: InputMaybe<Scalars['String']>;
    token_in?: InputMaybe<Array<Scalars['String']>>;
    token_lt?: InputMaybe<Scalars['String']>;
    token_lte?: InputMaybe<Scalars['String']>;
    token_not?: InputMaybe<Scalars['String']>;
    token_not_contains?: InputMaybe<Scalars['String']>;
    token_not_ends_with?: InputMaybe<Scalars['String']>;
    token_not_in?: InputMaybe<Array<Scalars['String']>>;
    token_not_starts_with?: InputMaybe<Scalars['String']>;
    token_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphPriceRateProvider_OrderBy = 'address' | 'cacheDuration' | 'cacheExpiry' | 'id' | 'lastCached' | 'poolId' | 'rate' | 'token';
declare type SubgraphQuery = {
    __typename?: 'Query';
    /** Access to subgraph metadata */
    _meta?: Maybe<Subgraph_Meta_>;
    ampUpdate?: Maybe<SubgraphAmpUpdate>;
    ampUpdates: Array<SubgraphAmpUpdate>;
    balancer?: Maybe<SubgraphBalancer>;
    balancerSnapshot?: Maybe<SubgraphBalancerSnapshot>;
    balancerSnapshots: Array<SubgraphBalancerSnapshot>;
    balancers: Array<SubgraphBalancer>;
    gradualWeightUpdate?: Maybe<SubgraphGradualWeightUpdate>;
    gradualWeightUpdates: Array<SubgraphGradualWeightUpdate>;
    investment?: Maybe<SubgraphInvestment>;
    investments: Array<SubgraphInvestment>;
    joinExit?: Maybe<SubgraphJoinExit>;
    joinExits: Array<SubgraphJoinExit>;
    latestPrice?: Maybe<SubgraphLatestPrice>;
    latestPrices: Array<SubgraphLatestPrice>;
    pool?: Maybe<SubgraphPool>;
    poolHistoricalLiquidities: Array<SubgraphPoolHistoricalLiquidity>;
    poolHistoricalLiquidity?: Maybe<SubgraphPoolHistoricalLiquidity>;
    poolShare?: Maybe<SubgraphPoolShare>;
    poolShares: Array<SubgraphPoolShare>;
    poolSnapshot?: Maybe<SubgraphPoolSnapshot>;
    poolSnapshots: Array<SubgraphPoolSnapshot>;
    poolToken?: Maybe<SubgraphPoolToken>;
    poolTokens: Array<SubgraphPoolToken>;
    pools: Array<SubgraphPool>;
    priceRateProvider?: Maybe<SubgraphPriceRateProvider>;
    priceRateProviders: Array<SubgraphPriceRateProvider>;
    swap?: Maybe<SubgraphSwap>;
    swaps: Array<SubgraphSwap>;
    token?: Maybe<SubgraphToken>;
    tokenPrice?: Maybe<SubgraphTokenPrice>;
    tokenPrices: Array<SubgraphTokenPrice>;
    tokenSnapshot?: Maybe<SubgraphTokenSnapshot>;
    tokenSnapshots: Array<SubgraphTokenSnapshot>;
    tokens: Array<SubgraphToken>;
    tradePair?: Maybe<SubgraphTradePair>;
    tradePairSnapshot?: Maybe<SubgraphTradePairSnapshot>;
    tradePairSnapshots: Array<SubgraphTradePairSnapshot>;
    tradePairs: Array<SubgraphTradePair>;
    user?: Maybe<SubgraphUser>;
    userInternalBalance?: Maybe<SubgraphUserInternalBalance>;
    userInternalBalances: Array<SubgraphUserInternalBalance>;
    users: Array<SubgraphUser>;
};
declare type SubgraphQuery_MetaArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
};
declare type SubgraphQueryAmpUpdateArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryAmpUpdatesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphAmpUpdate_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphAmpUpdate_Filter>;
};
declare type SubgraphQueryBalancerArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryBalancerSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryBalancerSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphBalancerSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphBalancerSnapshot_Filter>;
};
declare type SubgraphQueryBalancersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphBalancer_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphBalancer_Filter>;
};
declare type SubgraphQueryGradualWeightUpdateArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryGradualWeightUpdatesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphGradualWeightUpdate_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphGradualWeightUpdate_Filter>;
};
declare type SubgraphQueryInvestmentArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryInvestmentsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphInvestment_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphInvestment_Filter>;
};
declare type SubgraphQueryJoinExitArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryJoinExitsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphJoinExit_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphJoinExit_Filter>;
};
declare type SubgraphQueryLatestPriceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryLatestPricesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphLatestPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphLatestPrice_Filter>;
};
declare type SubgraphQueryPoolArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPoolHistoricalLiquiditiesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolHistoricalLiquidity_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolHistoricalLiquidity_Filter>;
};
declare type SubgraphQueryPoolHistoricalLiquidityArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPoolShareArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPoolSharesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolShare_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolShare_Filter>;
};
declare type SubgraphQueryPoolSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPoolSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolSnapshot_Filter>;
};
declare type SubgraphQueryPoolTokenArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPoolTokensArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolToken_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolToken_Filter>;
};
declare type SubgraphQueryPoolsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPool_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPool_Filter>;
};
declare type SubgraphQueryPriceRateProviderArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryPriceRateProvidersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPriceRateProvider_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPriceRateProvider_Filter>;
};
declare type SubgraphQuerySwapArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQuerySwapsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphSwap_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphSwap_Filter>;
};
declare type SubgraphQueryTokenArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryTokenPriceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryTokenPricesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTokenPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTokenPrice_Filter>;
};
declare type SubgraphQueryTokenSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryTokenSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTokenSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTokenSnapshot_Filter>;
};
declare type SubgraphQueryTokensArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphToken_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphToken_Filter>;
};
declare type SubgraphQueryTradePairArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryTradePairSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryTradePairSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTradePairSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTradePairSnapshot_Filter>;
};
declare type SubgraphQueryTradePairsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTradePair_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTradePair_Filter>;
};
declare type SubgraphQueryUserArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryUserInternalBalanceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphQueryUserInternalBalancesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUserInternalBalance_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphUserInternalBalance_Filter>;
};
declare type SubgraphQueryUsersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUser_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphUser_Filter>;
};
declare type SubgraphSubscription = {
    __typename?: 'Subscription';
    /** Access to subgraph metadata */
    _meta?: Maybe<Subgraph_Meta_>;
    ampUpdate?: Maybe<SubgraphAmpUpdate>;
    ampUpdates: Array<SubgraphAmpUpdate>;
    balancer?: Maybe<SubgraphBalancer>;
    balancerSnapshot?: Maybe<SubgraphBalancerSnapshot>;
    balancerSnapshots: Array<SubgraphBalancerSnapshot>;
    balancers: Array<SubgraphBalancer>;
    gradualWeightUpdate?: Maybe<SubgraphGradualWeightUpdate>;
    gradualWeightUpdates: Array<SubgraphGradualWeightUpdate>;
    investment?: Maybe<SubgraphInvestment>;
    investments: Array<SubgraphInvestment>;
    joinExit?: Maybe<SubgraphJoinExit>;
    joinExits: Array<SubgraphJoinExit>;
    latestPrice?: Maybe<SubgraphLatestPrice>;
    latestPrices: Array<SubgraphLatestPrice>;
    pool?: Maybe<SubgraphPool>;
    poolHistoricalLiquidities: Array<SubgraphPoolHistoricalLiquidity>;
    poolHistoricalLiquidity?: Maybe<SubgraphPoolHistoricalLiquidity>;
    poolShare?: Maybe<SubgraphPoolShare>;
    poolShares: Array<SubgraphPoolShare>;
    poolSnapshot?: Maybe<SubgraphPoolSnapshot>;
    poolSnapshots: Array<SubgraphPoolSnapshot>;
    poolToken?: Maybe<SubgraphPoolToken>;
    poolTokens: Array<SubgraphPoolToken>;
    pools: Array<SubgraphPool>;
    priceRateProvider?: Maybe<SubgraphPriceRateProvider>;
    priceRateProviders: Array<SubgraphPriceRateProvider>;
    swap?: Maybe<SubgraphSwap>;
    swaps: Array<SubgraphSwap>;
    token?: Maybe<SubgraphToken>;
    tokenPrice?: Maybe<SubgraphTokenPrice>;
    tokenPrices: Array<SubgraphTokenPrice>;
    tokenSnapshot?: Maybe<SubgraphTokenSnapshot>;
    tokenSnapshots: Array<SubgraphTokenSnapshot>;
    tokens: Array<SubgraphToken>;
    tradePair?: Maybe<SubgraphTradePair>;
    tradePairSnapshot?: Maybe<SubgraphTradePairSnapshot>;
    tradePairSnapshots: Array<SubgraphTradePairSnapshot>;
    tradePairs: Array<SubgraphTradePair>;
    user?: Maybe<SubgraphUser>;
    userInternalBalance?: Maybe<SubgraphUserInternalBalance>;
    userInternalBalances: Array<SubgraphUserInternalBalance>;
    users: Array<SubgraphUser>;
};
declare type SubgraphSubscription_MetaArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
};
declare type SubgraphSubscriptionAmpUpdateArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionAmpUpdatesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphAmpUpdate_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphAmpUpdate_Filter>;
};
declare type SubgraphSubscriptionBalancerArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionBalancerSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionBalancerSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphBalancerSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphBalancerSnapshot_Filter>;
};
declare type SubgraphSubscriptionBalancersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphBalancer_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphBalancer_Filter>;
};
declare type SubgraphSubscriptionGradualWeightUpdateArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionGradualWeightUpdatesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphGradualWeightUpdate_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphGradualWeightUpdate_Filter>;
};
declare type SubgraphSubscriptionInvestmentArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionInvestmentsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphInvestment_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphInvestment_Filter>;
};
declare type SubgraphSubscriptionJoinExitArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionJoinExitsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphJoinExit_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphJoinExit_Filter>;
};
declare type SubgraphSubscriptionLatestPriceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionLatestPricesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphLatestPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphLatestPrice_Filter>;
};
declare type SubgraphSubscriptionPoolArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPoolHistoricalLiquiditiesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolHistoricalLiquidity_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolHistoricalLiquidity_Filter>;
};
declare type SubgraphSubscriptionPoolHistoricalLiquidityArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPoolShareArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPoolSharesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolShare_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolShare_Filter>;
};
declare type SubgraphSubscriptionPoolSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPoolSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolSnapshot_Filter>;
};
declare type SubgraphSubscriptionPoolTokenArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPoolTokensArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolToken_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPoolToken_Filter>;
};
declare type SubgraphSubscriptionPoolsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPool_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPool_Filter>;
};
declare type SubgraphSubscriptionPriceRateProviderArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionPriceRateProvidersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPriceRateProvider_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphPriceRateProvider_Filter>;
};
declare type SubgraphSubscriptionSwapArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionSwapsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphSwap_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphSwap_Filter>;
};
declare type SubgraphSubscriptionTokenArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionTokenPriceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionTokenPricesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTokenPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTokenPrice_Filter>;
};
declare type SubgraphSubscriptionTokenSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionTokenSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTokenSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTokenSnapshot_Filter>;
};
declare type SubgraphSubscriptionTokensArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphToken_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphToken_Filter>;
};
declare type SubgraphSubscriptionTradePairArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionTradePairSnapshotArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionTradePairSnapshotsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTradePairSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTradePairSnapshot_Filter>;
};
declare type SubgraphSubscriptionTradePairsArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTradePair_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphTradePair_Filter>;
};
declare type SubgraphSubscriptionUserArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionUserInternalBalanceArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    id: Scalars['ID'];
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
};
declare type SubgraphSubscriptionUserInternalBalancesArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUserInternalBalance_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphUserInternalBalance_Filter>;
};
declare type SubgraphSubscriptionUsersArgs = {
    block?: InputMaybe<SubgraphBlock_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUser_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: Subgraph_SubgraphErrorPolicy_;
    where?: InputMaybe<SubgraphUser_Filter>;
};
declare type SubgraphSwap = {
    __typename?: 'Swap';
    caller: Scalars['Bytes'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    timestamp: Scalars['Int'];
    tokenAmountIn: Scalars['BigDecimal'];
    tokenAmountOut: Scalars['BigDecimal'];
    tokenIn: Scalars['Bytes'];
    tokenInSym: Scalars['String'];
    tokenOut: Scalars['Bytes'];
    tokenOutSym: Scalars['String'];
    tx: Scalars['Bytes'];
    userAddress: SubgraphUser;
};
declare type SubgraphSwap_Filter = {
    caller?: InputMaybe<Scalars['Bytes']>;
    caller_contains?: InputMaybe<Scalars['Bytes']>;
    caller_in?: InputMaybe<Array<Scalars['Bytes']>>;
    caller_not?: InputMaybe<Scalars['Bytes']>;
    caller_not_contains?: InputMaybe<Scalars['Bytes']>;
    caller_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    tokenAmountIn?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_gt?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_gte?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    tokenAmountIn_lt?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_lte?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_not?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountIn_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    tokenAmountOut?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_gt?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_gte?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    tokenAmountOut_lt?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_lte?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_not?: InputMaybe<Scalars['BigDecimal']>;
    tokenAmountOut_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    tokenIn?: InputMaybe<Scalars['Bytes']>;
    tokenInSym?: InputMaybe<Scalars['String']>;
    tokenInSym_contains?: InputMaybe<Scalars['String']>;
    tokenInSym_ends_with?: InputMaybe<Scalars['String']>;
    tokenInSym_gt?: InputMaybe<Scalars['String']>;
    tokenInSym_gte?: InputMaybe<Scalars['String']>;
    tokenInSym_in?: InputMaybe<Array<Scalars['String']>>;
    tokenInSym_lt?: InputMaybe<Scalars['String']>;
    tokenInSym_lte?: InputMaybe<Scalars['String']>;
    tokenInSym_not?: InputMaybe<Scalars['String']>;
    tokenInSym_not_contains?: InputMaybe<Scalars['String']>;
    tokenInSym_not_ends_with?: InputMaybe<Scalars['String']>;
    tokenInSym_not_in?: InputMaybe<Array<Scalars['String']>>;
    tokenInSym_not_starts_with?: InputMaybe<Scalars['String']>;
    tokenInSym_starts_with?: InputMaybe<Scalars['String']>;
    tokenIn_contains?: InputMaybe<Scalars['Bytes']>;
    tokenIn_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tokenIn_not?: InputMaybe<Scalars['Bytes']>;
    tokenIn_not_contains?: InputMaybe<Scalars['Bytes']>;
    tokenIn_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tokenOut?: InputMaybe<Scalars['Bytes']>;
    tokenOutSym?: InputMaybe<Scalars['String']>;
    tokenOutSym_contains?: InputMaybe<Scalars['String']>;
    tokenOutSym_ends_with?: InputMaybe<Scalars['String']>;
    tokenOutSym_gt?: InputMaybe<Scalars['String']>;
    tokenOutSym_gte?: InputMaybe<Scalars['String']>;
    tokenOutSym_in?: InputMaybe<Array<Scalars['String']>>;
    tokenOutSym_lt?: InputMaybe<Scalars['String']>;
    tokenOutSym_lte?: InputMaybe<Scalars['String']>;
    tokenOutSym_not?: InputMaybe<Scalars['String']>;
    tokenOutSym_not_contains?: InputMaybe<Scalars['String']>;
    tokenOutSym_not_ends_with?: InputMaybe<Scalars['String']>;
    tokenOutSym_not_in?: InputMaybe<Array<Scalars['String']>>;
    tokenOutSym_not_starts_with?: InputMaybe<Scalars['String']>;
    tokenOutSym_starts_with?: InputMaybe<Scalars['String']>;
    tokenOut_contains?: InputMaybe<Scalars['Bytes']>;
    tokenOut_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tokenOut_not?: InputMaybe<Scalars['Bytes']>;
    tokenOut_not_contains?: InputMaybe<Scalars['Bytes']>;
    tokenOut_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tx?: InputMaybe<Scalars['Bytes']>;
    tx_contains?: InputMaybe<Scalars['Bytes']>;
    tx_in?: InputMaybe<Array<Scalars['Bytes']>>;
    tx_not?: InputMaybe<Scalars['Bytes']>;
    tx_not_contains?: InputMaybe<Scalars['Bytes']>;
    tx_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    userAddress?: InputMaybe<Scalars['String']>;
    userAddress_contains?: InputMaybe<Scalars['String']>;
    userAddress_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_gt?: InputMaybe<Scalars['String']>;
    userAddress_gte?: InputMaybe<Scalars['String']>;
    userAddress_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_lt?: InputMaybe<Scalars['String']>;
    userAddress_lte?: InputMaybe<Scalars['String']>;
    userAddress_not?: InputMaybe<Scalars['String']>;
    userAddress_not_contains?: InputMaybe<Scalars['String']>;
    userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
    userAddress_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphSwap_OrderBy = 'caller' | 'id' | 'poolId' | 'timestamp' | 'tokenAmountIn' | 'tokenAmountOut' | 'tokenIn' | 'tokenInSym' | 'tokenOut' | 'tokenOutSym' | 'tx' | 'userAddress';
declare type SubgraphToken = {
    __typename?: 'Token';
    address: Scalars['String'];
    decimals: Scalars['Int'];
    id: Scalars['ID'];
    latestPrice?: Maybe<SubgraphLatestPrice>;
    name?: Maybe<Scalars['String']>;
    symbol?: Maybe<Scalars['String']>;
    totalBalanceNotional: Scalars['BigDecimal'];
    totalBalanceUSD: Scalars['BigDecimal'];
    totalSwapCount: Scalars['BigInt'];
    totalVolumeNotional: Scalars['BigDecimal'];
    totalVolumeUSD: Scalars['BigDecimal'];
};
declare type SubgraphTokenPrice = {
    __typename?: 'TokenPrice';
    amount: Scalars['BigDecimal'];
    asset: Scalars['Bytes'];
    block: Scalars['BigInt'];
    id: Scalars['ID'];
    poolId: SubgraphPool;
    price: Scalars['BigDecimal'];
    pricingAsset: Scalars['Bytes'];
    timestamp: Scalars['Int'];
};
declare type SubgraphTokenPrice_Filter = {
    amount?: InputMaybe<Scalars['BigDecimal']>;
    amount_gt?: InputMaybe<Scalars['BigDecimal']>;
    amount_gte?: InputMaybe<Scalars['BigDecimal']>;
    amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    amount_lt?: InputMaybe<Scalars['BigDecimal']>;
    amount_lte?: InputMaybe<Scalars['BigDecimal']>;
    amount_not?: InputMaybe<Scalars['BigDecimal']>;
    amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    asset?: InputMaybe<Scalars['Bytes']>;
    asset_contains?: InputMaybe<Scalars['Bytes']>;
    asset_in?: InputMaybe<Array<Scalars['Bytes']>>;
    asset_not?: InputMaybe<Scalars['Bytes']>;
    asset_not_contains?: InputMaybe<Scalars['Bytes']>;
    asset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    block?: InputMaybe<Scalars['BigInt']>;
    block_gt?: InputMaybe<Scalars['BigInt']>;
    block_gte?: InputMaybe<Scalars['BigInt']>;
    block_in?: InputMaybe<Array<Scalars['BigInt']>>;
    block_lt?: InputMaybe<Scalars['BigInt']>;
    block_lte?: InputMaybe<Scalars['BigInt']>;
    block_not?: InputMaybe<Scalars['BigInt']>;
    block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    poolId?: InputMaybe<Scalars['String']>;
    poolId_contains?: InputMaybe<Scalars['String']>;
    poolId_ends_with?: InputMaybe<Scalars['String']>;
    poolId_gt?: InputMaybe<Scalars['String']>;
    poolId_gte?: InputMaybe<Scalars['String']>;
    poolId_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_lt?: InputMaybe<Scalars['String']>;
    poolId_lte?: InputMaybe<Scalars['String']>;
    poolId_not?: InputMaybe<Scalars['String']>;
    poolId_not_contains?: InputMaybe<Scalars['String']>;
    poolId_not_ends_with?: InputMaybe<Scalars['String']>;
    poolId_not_in?: InputMaybe<Array<Scalars['String']>>;
    poolId_not_starts_with?: InputMaybe<Scalars['String']>;
    poolId_starts_with?: InputMaybe<Scalars['String']>;
    price?: InputMaybe<Scalars['BigDecimal']>;
    price_gt?: InputMaybe<Scalars['BigDecimal']>;
    price_gte?: InputMaybe<Scalars['BigDecimal']>;
    price_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    price_lt?: InputMaybe<Scalars['BigDecimal']>;
    price_lte?: InputMaybe<Scalars['BigDecimal']>;
    price_not?: InputMaybe<Scalars['BigDecimal']>;
    price_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    pricingAsset?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_in?: InputMaybe<Array<Scalars['Bytes']>>;
    pricingAsset_not?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_contains?: InputMaybe<Scalars['Bytes']>;
    pricingAsset_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
declare type SubgraphTokenPrice_OrderBy = 'amount' | 'asset' | 'block' | 'id' | 'poolId' | 'price' | 'pricingAsset' | 'timestamp';
declare type SubgraphTokenSnapshot = {
    __typename?: 'TokenSnapshot';
    id: Scalars['ID'];
    timestamp: Scalars['Int'];
    token: SubgraphToken;
    totalBalanceNotional: Scalars['BigDecimal'];
    totalBalanceUSD: Scalars['BigDecimal'];
    totalSwapCount: Scalars['BigInt'];
    totalVolumeNotional: Scalars['BigDecimal'];
    totalVolumeUSD: Scalars['BigDecimal'];
};
declare type SubgraphTokenSnapshot_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    token?: InputMaybe<Scalars['String']>;
    token_contains?: InputMaybe<Scalars['String']>;
    token_ends_with?: InputMaybe<Scalars['String']>;
    token_gt?: InputMaybe<Scalars['String']>;
    token_gte?: InputMaybe<Scalars['String']>;
    token_in?: InputMaybe<Array<Scalars['String']>>;
    token_lt?: InputMaybe<Scalars['String']>;
    token_lte?: InputMaybe<Scalars['String']>;
    token_not?: InputMaybe<Scalars['String']>;
    token_not_contains?: InputMaybe<Scalars['String']>;
    token_not_ends_with?: InputMaybe<Scalars['String']>;
    token_not_in?: InputMaybe<Array<Scalars['String']>>;
    token_not_starts_with?: InputMaybe<Scalars['String']>;
    token_starts_with?: InputMaybe<Scalars['String']>;
    totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapCount?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphTokenSnapshot_OrderBy = 'id' | 'timestamp' | 'token' | 'totalBalanceNotional' | 'totalBalanceUSD' | 'totalSwapCount' | 'totalVolumeNotional' | 'totalVolumeUSD';
declare type SubgraphToken_Filter = {
    address?: InputMaybe<Scalars['String']>;
    address_contains?: InputMaybe<Scalars['String']>;
    address_ends_with?: InputMaybe<Scalars['String']>;
    address_gt?: InputMaybe<Scalars['String']>;
    address_gte?: InputMaybe<Scalars['String']>;
    address_in?: InputMaybe<Array<Scalars['String']>>;
    address_lt?: InputMaybe<Scalars['String']>;
    address_lte?: InputMaybe<Scalars['String']>;
    address_not?: InputMaybe<Scalars['String']>;
    address_not_contains?: InputMaybe<Scalars['String']>;
    address_not_ends_with?: InputMaybe<Scalars['String']>;
    address_not_in?: InputMaybe<Array<Scalars['String']>>;
    address_not_starts_with?: InputMaybe<Scalars['String']>;
    address_starts_with?: InputMaybe<Scalars['String']>;
    decimals?: InputMaybe<Scalars['Int']>;
    decimals_gt?: InputMaybe<Scalars['Int']>;
    decimals_gte?: InputMaybe<Scalars['Int']>;
    decimals_in?: InputMaybe<Array<Scalars['Int']>>;
    decimals_lt?: InputMaybe<Scalars['Int']>;
    decimals_lte?: InputMaybe<Scalars['Int']>;
    decimals_not?: InputMaybe<Scalars['Int']>;
    decimals_not_in?: InputMaybe<Array<Scalars['Int']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    latestPrice?: InputMaybe<Scalars['String']>;
    latestPrice_contains?: InputMaybe<Scalars['String']>;
    latestPrice_ends_with?: InputMaybe<Scalars['String']>;
    latestPrice_gt?: InputMaybe<Scalars['String']>;
    latestPrice_gte?: InputMaybe<Scalars['String']>;
    latestPrice_in?: InputMaybe<Array<Scalars['String']>>;
    latestPrice_lt?: InputMaybe<Scalars['String']>;
    latestPrice_lte?: InputMaybe<Scalars['String']>;
    latestPrice_not?: InputMaybe<Scalars['String']>;
    latestPrice_not_contains?: InputMaybe<Scalars['String']>;
    latestPrice_not_ends_with?: InputMaybe<Scalars['String']>;
    latestPrice_not_in?: InputMaybe<Array<Scalars['String']>>;
    latestPrice_not_starts_with?: InputMaybe<Scalars['String']>;
    latestPrice_starts_with?: InputMaybe<Scalars['String']>;
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    symbol?: InputMaybe<Scalars['String']>;
    symbol_contains?: InputMaybe<Scalars['String']>;
    symbol_ends_with?: InputMaybe<Scalars['String']>;
    symbol_gt?: InputMaybe<Scalars['String']>;
    symbol_gte?: InputMaybe<Scalars['String']>;
    symbol_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_lt?: InputMaybe<Scalars['String']>;
    symbol_lte?: InputMaybe<Scalars['String']>;
    symbol_not?: InputMaybe<Scalars['String']>;
    symbol_not_contains?: InputMaybe<Scalars['String']>;
    symbol_not_ends_with?: InputMaybe<Scalars['String']>;
    symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
    symbol_not_starts_with?: InputMaybe<Scalars['String']>;
    symbol_starts_with?: InputMaybe<Scalars['String']>;
    totalBalanceNotional?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_not?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceUSD?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalBalanceUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_not?: InputMaybe<Scalars['BigDecimal']>;
    totalBalanceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapCount?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_gte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalSwapCount_lt?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_lte?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not?: InputMaybe<Scalars['BigInt']>;
    totalSwapCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    totalVolumeNotional?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeNotional_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_not?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeNotional_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
    totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphToken_OrderBy = 'address' | 'decimals' | 'id' | 'latestPrice' | 'name' | 'symbol' | 'totalBalanceNotional' | 'totalBalanceUSD' | 'totalSwapCount' | 'totalVolumeNotional' | 'totalVolumeUSD';
declare type SubgraphTradePair = {
    __typename?: 'TradePair';
    /** Token Address - Token Address */
    id: Scalars['ID'];
    token0: SubgraphToken;
    token1: SubgraphToken;
    totalSwapFee: Scalars['BigDecimal'];
    totalSwapVolume: Scalars['BigDecimal'];
};
declare type SubgraphTradePairSnapshot = {
    __typename?: 'TradePairSnapshot';
    id: Scalars['ID'];
    pair: SubgraphTradePair;
    timestamp: Scalars['Int'];
    totalSwapFee: Scalars['BigDecimal'];
    totalSwapVolume: Scalars['BigDecimal'];
};
declare type SubgraphTradePairSnapshot_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    pair?: InputMaybe<Scalars['String']>;
    pair_contains?: InputMaybe<Scalars['String']>;
    pair_ends_with?: InputMaybe<Scalars['String']>;
    pair_gt?: InputMaybe<Scalars['String']>;
    pair_gte?: InputMaybe<Scalars['String']>;
    pair_in?: InputMaybe<Array<Scalars['String']>>;
    pair_lt?: InputMaybe<Scalars['String']>;
    pair_lte?: InputMaybe<Scalars['String']>;
    pair_not?: InputMaybe<Scalars['String']>;
    pair_not_contains?: InputMaybe<Scalars['String']>;
    pair_not_ends_with?: InputMaybe<Scalars['String']>;
    pair_not_in?: InputMaybe<Array<Scalars['String']>>;
    pair_not_starts_with?: InputMaybe<Scalars['String']>;
    pair_starts_with?: InputMaybe<Scalars['String']>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphTradePairSnapshot_OrderBy = 'id' | 'pair' | 'timestamp' | 'totalSwapFee' | 'totalSwapVolume';
declare type SubgraphTradePair_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    token0?: InputMaybe<Scalars['String']>;
    token0_contains?: InputMaybe<Scalars['String']>;
    token0_ends_with?: InputMaybe<Scalars['String']>;
    token0_gt?: InputMaybe<Scalars['String']>;
    token0_gte?: InputMaybe<Scalars['String']>;
    token0_in?: InputMaybe<Array<Scalars['String']>>;
    token0_lt?: InputMaybe<Scalars['String']>;
    token0_lte?: InputMaybe<Scalars['String']>;
    token0_not?: InputMaybe<Scalars['String']>;
    token0_not_contains?: InputMaybe<Scalars['String']>;
    token0_not_ends_with?: InputMaybe<Scalars['String']>;
    token0_not_in?: InputMaybe<Array<Scalars['String']>>;
    token0_not_starts_with?: InputMaybe<Scalars['String']>;
    token0_starts_with?: InputMaybe<Scalars['String']>;
    token1?: InputMaybe<Scalars['String']>;
    token1_contains?: InputMaybe<Scalars['String']>;
    token1_ends_with?: InputMaybe<Scalars['String']>;
    token1_gt?: InputMaybe<Scalars['String']>;
    token1_gte?: InputMaybe<Scalars['String']>;
    token1_in?: InputMaybe<Array<Scalars['String']>>;
    token1_lt?: InputMaybe<Scalars['String']>;
    token1_lte?: InputMaybe<Scalars['String']>;
    token1_not?: InputMaybe<Scalars['String']>;
    token1_not_contains?: InputMaybe<Scalars['String']>;
    token1_not_ends_with?: InputMaybe<Scalars['String']>;
    token1_not_in?: InputMaybe<Array<Scalars['String']>>;
    token1_not_starts_with?: InputMaybe<Scalars['String']>;
    token1_starts_with?: InputMaybe<Scalars['String']>;
    totalSwapFee?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapFee_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_gte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    totalSwapVolume_lt?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_lte?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not?: InputMaybe<Scalars['BigDecimal']>;
    totalSwapVolume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};
declare type SubgraphTradePair_OrderBy = 'id' | 'token0' | 'token1' | 'totalSwapFee' | 'totalSwapVolume';
declare type SubgraphUser = {
    __typename?: 'User';
    id: Scalars['ID'];
    sharesOwned?: Maybe<Array<SubgraphPoolShare>>;
    swaps?: Maybe<Array<SubgraphSwap>>;
    userInternalBalances?: Maybe<Array<SubgraphUserInternalBalance>>;
};
declare type SubgraphUserSharesOwnedArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolShare_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphPoolShare_Filter>;
};
declare type SubgraphUserSwapsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphSwap_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphSwap_Filter>;
};
declare type SubgraphUserUserInternalBalancesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUserInternalBalance_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<SubgraphUserInternalBalance_Filter>;
};
declare type SubgraphUserInternalBalance = {
    __typename?: 'UserInternalBalance';
    balance: Scalars['BigDecimal'];
    id: Scalars['ID'];
    token: Scalars['Bytes'];
    userAddress?: Maybe<SubgraphUser>;
};
declare type SubgraphUserInternalBalance_Filter = {
    balance?: InputMaybe<Scalars['BigDecimal']>;
    balance_gt?: InputMaybe<Scalars['BigDecimal']>;
    balance_gte?: InputMaybe<Scalars['BigDecimal']>;
    balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    balance_lt?: InputMaybe<Scalars['BigDecimal']>;
    balance_lte?: InputMaybe<Scalars['BigDecimal']>;
    balance_not?: InputMaybe<Scalars['BigDecimal']>;
    balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    token?: InputMaybe<Scalars['Bytes']>;
    token_contains?: InputMaybe<Scalars['Bytes']>;
    token_in?: InputMaybe<Array<Scalars['Bytes']>>;
    token_not?: InputMaybe<Scalars['Bytes']>;
    token_not_contains?: InputMaybe<Scalars['Bytes']>;
    token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    userAddress?: InputMaybe<Scalars['String']>;
    userAddress_contains?: InputMaybe<Scalars['String']>;
    userAddress_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_gt?: InputMaybe<Scalars['String']>;
    userAddress_gte?: InputMaybe<Scalars['String']>;
    userAddress_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_lt?: InputMaybe<Scalars['String']>;
    userAddress_lte?: InputMaybe<Scalars['String']>;
    userAddress_not?: InputMaybe<Scalars['String']>;
    userAddress_not_contains?: InputMaybe<Scalars['String']>;
    userAddress_not_ends_with?: InputMaybe<Scalars['String']>;
    userAddress_not_in?: InputMaybe<Array<Scalars['String']>>;
    userAddress_not_starts_with?: InputMaybe<Scalars['String']>;
    userAddress_starts_with?: InputMaybe<Scalars['String']>;
};
declare type SubgraphUserInternalBalance_OrderBy = 'balance' | 'id' | 'token' | 'userAddress';
declare type SubgraphUser_Filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};
declare type SubgraphUser_OrderBy = 'id' | 'sharesOwned' | 'swaps' | 'userInternalBalances';
declare type Subgraph_Block_ = {
    __typename?: '_Block_';
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};
/** The type for the top-level _meta field */
declare type Subgraph_Meta_ = {
    __typename?: '_Meta_';
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: Subgraph_Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
declare type Subgraph_SubgraphErrorPolicy_ = 
/** Data will be returned even if the subgraph has indexing errors */
'allow'
/** If the subgraph has indexing errors, data will be omitted. The default. */
 | 'deny';
declare type SubgraphPoolsQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPool_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphPool_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolsQuery = {
    __typename?: 'Query';
    pools: Array<{
        __typename?: 'Pool';
        id: string;
        address: string;
        poolType?: string | null | undefined;
        symbol?: string | null | undefined;
        name?: string | null | undefined;
        swapFee: string;
        totalWeight?: string | null | undefined;
        totalSwapVolume: string;
        totalSwapFee: string;
        totalLiquidity: string;
        totalShares: string;
        swapsCount: string;
        holdersCount: string;
        tokensList: Array<string>;
        amp?: string | null | undefined;
        expiryTime?: string | null | undefined;
        unitSeconds?: string | null | undefined;
        principalToken?: string | null | undefined;
        baseToken?: string | null | undefined;
        swapEnabled: boolean;
        wrappedIndex?: number | null | undefined;
        mainIndex?: number | null | undefined;
        lowerTarget?: string | null | undefined;
        upperTarget?: string | null | undefined;
        tokens?: Array<{
            __typename?: 'PoolToken';
            id: string;
            symbol: string;
            name: string;
            decimals: number;
            address: string;
            balance: string;
            invested: string;
            weight?: string | null | undefined;
            priceRate: string;
        }> | null | undefined;
    }>;
};
declare type SubgraphPoolQueryVariables = Exact<{
    id: Scalars['ID'];
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolQuery = {
    __typename?: 'Query';
    pool?: {
        __typename?: 'Pool';
        id: string;
        address: string;
        poolType?: string | null | undefined;
        symbol?: string | null | undefined;
        name?: string | null | undefined;
        swapFee: string;
        totalWeight?: string | null | undefined;
        totalSwapVolume: string;
        totalSwapFee: string;
        totalLiquidity: string;
        totalShares: string;
        swapsCount: string;
        holdersCount: string;
        tokensList: Array<string>;
        amp?: string | null | undefined;
        expiryTime?: string | null | undefined;
        unitSeconds?: string | null | undefined;
        principalToken?: string | null | undefined;
        baseToken?: string | null | undefined;
        swapEnabled: boolean;
        wrappedIndex?: number | null | undefined;
        mainIndex?: number | null | undefined;
        lowerTarget?: string | null | undefined;
        upperTarget?: string | null | undefined;
        tokens?: Array<{
            __typename?: 'PoolToken';
            id: string;
            symbol: string;
            name: string;
            decimals: number;
            address: string;
            balance: string;
            invested: string;
            weight?: string | null | undefined;
            priceRate: string;
        }> | null | undefined;
    } | null | undefined;
};
declare type SubgraphPoolsWithoutLinearQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPool_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphPool_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolsWithoutLinearQuery = {
    __typename?: 'Query';
    pools: Array<{
        __typename?: 'Pool';
        id: string;
        address: string;
        poolType?: string | null | undefined;
        symbol?: string | null | undefined;
        name?: string | null | undefined;
        swapFee: string;
        totalWeight?: string | null | undefined;
        totalSwapVolume: string;
        totalSwapFee: string;
        totalLiquidity: string;
        totalShares: string;
        swapsCount: string;
        holdersCount: string;
        tokensList: Array<string>;
        amp?: string | null | undefined;
        expiryTime?: string | null | undefined;
        unitSeconds?: string | null | undefined;
        principalToken?: string | null | undefined;
        baseToken?: string | null | undefined;
        swapEnabled: boolean;
        tokens?: Array<{
            __typename?: 'PoolToken';
            id: string;
            symbol: string;
            name: string;
            decimals: number;
            address: string;
            balance: string;
            invested: string;
            weight?: string | null | undefined;
            priceRate: string;
        }> | null | undefined;
    }>;
};
declare type SubgraphPoolWithoutLinearQueryVariables = Exact<{
    id: Scalars['ID'];
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolWithoutLinearQuery = {
    __typename?: 'Query';
    pool?: {
        __typename?: 'Pool';
        id: string;
        address: string;
        poolType?: string | null | undefined;
        symbol?: string | null | undefined;
        name?: string | null | undefined;
        swapFee: string;
        totalWeight?: string | null | undefined;
        totalSwapVolume: string;
        totalSwapFee: string;
        totalLiquidity: string;
        totalShares: string;
        swapsCount: string;
        holdersCount: string;
        tokensList: Array<string>;
        amp?: string | null | undefined;
        expiryTime?: string | null | undefined;
        unitSeconds?: string | null | undefined;
        principalToken?: string | null | undefined;
        baseToken?: string | null | undefined;
        swapEnabled: boolean;
        tokens?: Array<{
            __typename?: 'PoolToken';
            id: string;
            symbol: string;
            name: string;
            decimals: number;
            address: string;
            balance: string;
            invested: string;
            weight?: string | null | undefined;
            priceRate: string;
        }> | null | undefined;
    } | null | undefined;
};
declare type SubgraphPoolFragment = {
    __typename?: 'Pool';
    id: string;
    address: string;
    poolType?: string | null | undefined;
    symbol?: string | null | undefined;
    name?: string | null | undefined;
    swapFee: string;
    totalWeight?: string | null | undefined;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    tokensList: Array<string>;
    amp?: string | null | undefined;
    expiryTime?: string | null | undefined;
    unitSeconds?: string | null | undefined;
    principalToken?: string | null | undefined;
    baseToken?: string | null | undefined;
    swapEnabled: boolean;
    wrappedIndex?: number | null | undefined;
    mainIndex?: number | null | undefined;
    lowerTarget?: string | null | undefined;
    upperTarget?: string | null | undefined;
    tokens?: Array<{
        __typename?: 'PoolToken';
        id: string;
        symbol: string;
        name: string;
        decimals: number;
        address: string;
        balance: string;
        invested: string;
        weight?: string | null | undefined;
        priceRate: string;
    }> | null | undefined;
};
declare type SubgraphPoolWithoutLinearFragment = {
    __typename?: 'Pool';
    id: string;
    address: string;
    poolType?: string | null | undefined;
    symbol?: string | null | undefined;
    name?: string | null | undefined;
    swapFee: string;
    totalWeight?: string | null | undefined;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalLiquidity: string;
    totalShares: string;
    swapsCount: string;
    holdersCount: string;
    tokensList: Array<string>;
    amp?: string | null | undefined;
    expiryTime?: string | null | undefined;
    unitSeconds?: string | null | undefined;
    principalToken?: string | null | undefined;
    baseToken?: string | null | undefined;
    swapEnabled: boolean;
    tokens?: Array<{
        __typename?: 'PoolToken';
        id: string;
        symbol: string;
        name: string;
        decimals: number;
        address: string;
        balance: string;
        invested: string;
        weight?: string | null | undefined;
        priceRate: string;
    }> | null | undefined;
};
declare type SubgraphPoolTokenFragment = {
    __typename?: 'PoolToken';
    id: string;
    symbol: string;
    name: string;
    decimals: number;
    address: string;
    balance: string;
    invested: string;
    weight?: string | null | undefined;
    priceRate: string;
};
declare type SubgraphPoolHistoricalLiquiditiesQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolHistoricalLiquidity_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphPoolHistoricalLiquidity_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolHistoricalLiquiditiesQuery = {
    __typename?: 'Query';
    poolHistoricalLiquidities: Array<{
        __typename?: 'PoolHistoricalLiquidity';
        id: string;
        poolTotalShares: string;
        poolLiquidity: string;
        poolShareValue: string;
        pricingAsset: string;
        block: string;
        poolId: {
            __typename?: 'Pool';
            id: string;
        };
    }>;
};
declare type SubgraphPoolSnapshotsQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphPoolSnapshot_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphPoolSnapshot_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphPoolSnapshotsQuery = {
    __typename?: 'Query';
    poolSnapshots: Array<{
        __typename?: 'PoolSnapshot';
        id: string;
        totalShares: string;
        swapVolume: string;
        swapFees: string;
        timestamp: number;
        pool: {
            __typename?: 'Pool';
            id: string;
        };
    }>;
};
declare type SubgraphPoolSnapshotFragment = {
    __typename?: 'PoolSnapshot';
    id: string;
    totalShares: string;
    swapVolume: string;
    swapFees: string;
    timestamp: number;
    pool: {
        __typename?: 'Pool';
        id: string;
    };
};
declare type SubgraphJoinExitsQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphJoinExit_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphJoinExit_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphJoinExitsQuery = {
    __typename?: 'Query';
    joinExits: Array<{
        __typename?: 'JoinExit';
        amounts: Array<string>;
        id: string;
        sender: string;
        timestamp: number;
        tx: string;
        type: SubgraphInvestType;
        user: {
            __typename?: 'User';
            id: string;
        };
        pool: {
            __typename?: 'Pool';
            id: string;
            tokensList: Array<string>;
        };
    }>;
};
declare type SubgraphJoinExitFragment = {
    __typename?: 'JoinExit';
    amounts: Array<string>;
    id: string;
    sender: string;
    timestamp: number;
    tx: string;
    type: SubgraphInvestType;
    user: {
        __typename?: 'User';
        id: string;
    };
    pool: {
        __typename?: 'Pool';
        id: string;
        tokensList: Array<string>;
    };
};
declare type SubgraphBalancersQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphBalancer_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphBalancer_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphBalancersQuery = {
    __typename?: 'Query';
    balancers: Array<{
        __typename?: 'Balancer';
        id: string;
        totalLiquidity: string;
        totalSwapVolume: string;
        totalSwapFee: string;
        totalSwapCount: string;
        poolCount: number;
    }>;
};
declare type SubgraphSubgraphBalancerFragment = {
    __typename?: 'Balancer';
    id: string;
    totalLiquidity: string;
    totalSwapVolume: string;
    totalSwapFee: string;
    totalSwapCount: string;
    poolCount: number;
};
declare type SubgraphTokenPricesQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphTokenPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphTokenPrice_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphTokenPricesQuery = {
    __typename?: 'Query';
    tokenPrices: Array<{
        __typename?: 'TokenPrice';
        id: string;
        asset: string;
        amount: string;
        pricingAsset: string;
        price: string;
        block: string;
        timestamp: number;
        poolId: {
            __typename?: 'Pool';
            id: string;
        };
    }>;
};
declare type SubgraphSubgraphTokenPriceFragment = {
    __typename?: 'TokenPrice';
    id: string;
    asset: string;
    amount: string;
    pricingAsset: string;
    price: string;
    block: string;
    timestamp: number;
    poolId: {
        __typename?: 'Pool';
        id: string;
    };
};
declare type SubgraphTokenLatestPricesQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphLatestPrice_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphLatestPrice_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphTokenLatestPricesQuery = {
    __typename?: 'Query';
    latestPrices: Array<{
        __typename?: 'LatestPrice';
        id: string;
        asset: string;
        price: string;
        pricingAsset: string;
        poolId: {
            __typename?: 'Pool';
            id: string;
        };
    }>;
};
declare type SubgraphTokenLatestPriceQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
declare type SubgraphTokenLatestPriceQuery = {
    __typename?: 'Query';
    latestPrice?: {
        __typename?: 'LatestPrice';
        id: string;
        asset: string;
        price: string;
        pricingAsset: string;
        poolId: {
            __typename?: 'Pool';
            id: string;
        };
    } | null | undefined;
};
declare type SubgraphSubgraphTokenLatestPriceFragment = {
    __typename?: 'LatestPrice';
    id: string;
    asset: string;
    price: string;
    pricingAsset: string;
    poolId: {
        __typename?: 'Pool';
        id: string;
    };
};
declare type SubgraphUserQueryVariables = Exact<{
    id: Scalars['ID'];
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphUserQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        id: string;
        sharesOwned?: Array<{
            __typename?: 'PoolShare';
            balance: string;
            poolId: {
                __typename?: 'Pool';
                id: string;
            };
        }> | null | undefined;
    } | null | undefined;
};
declare type SubgraphUsersQueryVariables = Exact<{
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SubgraphUser_OrderBy>;
    orderDirection?: InputMaybe<SubgraphOrderDirection>;
    where?: InputMaybe<SubgraphUser_Filter>;
    block?: InputMaybe<SubgraphBlock_Height>;
}>;
declare type SubgraphUsersQuery = {
    __typename?: 'Query';
    users: Array<{
        __typename?: 'User';
        id: string;
        sharesOwned?: Array<{
            __typename?: 'PoolShare';
            balance: string;
            poolId: {
                __typename?: 'Pool';
                id: string;
            };
        }> | null | undefined;
    }>;
};
declare type SubgraphSubgraphUserFragment = {
    __typename?: 'User';
    id: string;
    sharesOwned?: Array<{
        __typename?: 'PoolShare';
        balance: string;
        poolId: {
            __typename?: 'Pool';
            id: string;
        };
    }> | null | undefined;
};
declare const PoolTokenFragmentDoc: graphql_language_ast.DocumentNode;
declare const PoolFragmentDoc: graphql_language_ast.DocumentNode;
declare const PoolWithoutLinearFragmentDoc: graphql_language_ast.DocumentNode;
declare const PoolSnapshotFragmentDoc: graphql_language_ast.DocumentNode;
declare const JoinExitFragmentDoc: graphql_language_ast.DocumentNode;
declare const SubgraphBalancerFragmentDoc: graphql_language_ast.DocumentNode;
declare const SubgraphTokenPriceFragmentDoc: graphql_language_ast.DocumentNode;
declare const SubgraphTokenLatestPriceFragmentDoc: graphql_language_ast.DocumentNode;
declare const SubgraphUserFragmentDoc: graphql_language_ast.DocumentNode;
declare const PoolsDocument: graphql_language_ast.DocumentNode;
declare const PoolDocument: graphql_language_ast.DocumentNode;
declare const PoolsWithoutLinearDocument: graphql_language_ast.DocumentNode;
declare const PoolWithoutLinearDocument: graphql_language_ast.DocumentNode;
declare const PoolHistoricalLiquiditiesDocument: graphql_language_ast.DocumentNode;
declare const PoolSnapshotsDocument: graphql_language_ast.DocumentNode;
declare const JoinExitsDocument: graphql_language_ast.DocumentNode;
declare const BalancersDocument: graphql_language_ast.DocumentNode;
declare const TokenPricesDocument: graphql_language_ast.DocumentNode;
declare const TokenLatestPricesDocument: graphql_language_ast.DocumentNode;
declare const TokenLatestPriceDocument: graphql_language_ast.DocumentNode;
declare const UserDocument: graphql_language_ast.DocumentNode;
declare const UsersDocument: graphql_language_ast.DocumentNode;
declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    Pools(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphPool_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphPool_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolsQuery>;
    Pool(variables: SubgraphPoolQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolQuery>;
    PoolsWithoutLinear(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphPool_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphPool_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolsWithoutLinearQuery>;
    PoolWithoutLinear(variables: SubgraphPoolWithoutLinearQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolWithoutLinearQuery>;
    PoolHistoricalLiquidities(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphPoolHistoricalLiquidity_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphPoolHistoricalLiquidity_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolHistoricalLiquiditiesQuery>;
    PoolSnapshots(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphPoolSnapshot_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphPoolSnapshot_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphPoolSnapshotsQuery>;
    JoinExits(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphJoinExit_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphJoinExit_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphJoinExitsQuery>;
    Balancers(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphBalancer_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphBalancer_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphBalancersQuery>;
    TokenPrices(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphTokenPrice_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphTokenPrice_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphTokenPricesQuery>;
    TokenLatestPrices(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphLatestPrice_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphLatestPrice_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphTokenLatestPricesQuery>;
    TokenLatestPrice(variables: SubgraphTokenLatestPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphTokenLatestPriceQuery>;
    User(variables: SubgraphUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphUserQuery>;
    Users(variables?: Exact<{
        skip?: InputMaybe<number> | undefined;
        first?: InputMaybe<number> | undefined;
        orderBy?: InputMaybe<SubgraphUser_OrderBy> | undefined;
        orderDirection?: InputMaybe<SubgraphOrderDirection> | undefined;
        where?: InputMaybe<SubgraphUser_Filter> | undefined;
        block?: InputMaybe<SubgraphBlock_Height> | undefined;
    }> | undefined, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphUsersQuery>;
};
declare type Sdk = ReturnType<typeof getSdk>;

declare type SubgraphClient = Sdk;

declare class BalancerSDK {
    readonly network: BalancerNetworkConfig;
    readonly rpcUrl: string;
    readonly swaps: SwapsService;
    readonly relayer: RelayerService;
    readonly sor: SOR;
    readonly provider: Provider;
    readonly subgraphClient: SubgraphClient;
    constructor(config: BalancerSdkConfig);
    private getNetworkConfig;
}

export { AaveHelpers, Account, AssetHelpers, BalancerErrors, BalancerNetworkConfig, BalancerSDK, BalancerSdkConfig, BalancerSdkSorConfig, BalancersDocument, BatchSwap, BatchSwapStep, EncodeBatchSwapInput, EncodeExitPoolInput, EncodeUnwrapAaveStaticTokenInput, Exact, ExitAndBatchSwapInput, ExitPoolData, ExitPoolRequest, FetchPoolsInput, FundManagement, InputMaybe, JoinExitFragmentDoc, JoinExitsDocument, JoinPoolRequest, MakeMaybe, MakeOptional, ManagedPoolEncoder, Maybe, Network, OutputReference, PoolBalanceOp, PoolBalanceOpKind, PoolDocument, PoolFragmentDoc, PoolHistoricalLiquiditiesDocument, PoolSnapshotFragmentDoc, PoolSnapshotsDocument, PoolSpecialization, PoolTokenFragmentDoc, PoolWithoutLinearDocument, PoolWithoutLinearFragmentDoc, PoolsDocument, PoolsWithoutLinearDocument, QueryWithSorInput, QueryWithSorOutput, RelayerAction, RelayerAuthorization, RelayerService, Scalars, Sdk, SdkFunctionWrapper, SingleSwap, StablePhantomPoolJoinKind, StablePoolEncoder, StablePoolExitKind, StablePoolJoinKind, SubgraphAmpUpdate, SubgraphAmpUpdate_Filter, SubgraphAmpUpdate_OrderBy, SubgraphBalancer, SubgraphBalancerFragmentDoc, SubgraphBalancerPoolsArgs, SubgraphBalancerSnapshot, SubgraphBalancerSnapshot_Filter, SubgraphBalancerSnapshot_OrderBy, SubgraphBalancer_Filter, SubgraphBalancer_OrderBy, SubgraphBalancersQuery, SubgraphBalancersQueryVariables, SubgraphBlock_Height, SubgraphGradualWeightUpdate, SubgraphGradualWeightUpdate_Filter, SubgraphGradualWeightUpdate_OrderBy, SubgraphInvestType, SubgraphInvestment, SubgraphInvestment_Filter, SubgraphInvestment_OrderBy, SubgraphJoinExit, SubgraphJoinExitFragment, SubgraphJoinExit_Filter, SubgraphJoinExit_OrderBy, SubgraphJoinExitsQuery, SubgraphJoinExitsQueryVariables, SubgraphLatestPrice, SubgraphLatestPrice_Filter, SubgraphLatestPrice_OrderBy, SubgraphOrderDirection, SubgraphPool, SubgraphPoolFragment, SubgraphPoolHistoricalLiquiditiesQuery, SubgraphPoolHistoricalLiquiditiesQueryVariables, SubgraphPoolHistoricalLiquidity, SubgraphPoolHistoricalLiquidity_Filter, SubgraphPoolHistoricalLiquidity_OrderBy, SubgraphPoolHistoricalValuesArgs, SubgraphPoolPriceRateProvidersArgs, SubgraphPoolQuery, SubgraphPoolQueryVariables, SubgraphPoolShare, SubgraphPoolShare_Filter, SubgraphPoolShare_OrderBy, SubgraphPoolSharesArgs, SubgraphPoolSnapshot, SubgraphPoolSnapshotFragment, SubgraphPoolSnapshot_Filter, SubgraphPoolSnapshot_OrderBy, SubgraphPoolSnapshotsQuery, SubgraphPoolSnapshotsQueryVariables, SubgraphPoolSwapsArgs, SubgraphPoolToken, SubgraphPoolTokenFragment, SubgraphPoolTokenInvestmentsArgs, SubgraphPoolToken_Filter, SubgraphPoolToken_OrderBy, SubgraphPoolTokensArgs, SubgraphPoolWeightUpdatesArgs, SubgraphPoolWithoutLinearFragment, SubgraphPoolWithoutLinearQuery, SubgraphPoolWithoutLinearQueryVariables, SubgraphPool_Filter, SubgraphPool_OrderBy, SubgraphPoolsQuery, SubgraphPoolsQueryVariables, SubgraphPoolsWithoutLinearQuery, SubgraphPoolsWithoutLinearQueryVariables, SubgraphPriceRateProvider, SubgraphPriceRateProvider_Filter, SubgraphPriceRateProvider_OrderBy, SubgraphQuery, SubgraphQueryAmpUpdateArgs, SubgraphQueryAmpUpdatesArgs, SubgraphQueryBalancerArgs, SubgraphQueryBalancerSnapshotArgs, SubgraphQueryBalancerSnapshotsArgs, SubgraphQueryBalancersArgs, SubgraphQueryGradualWeightUpdateArgs, SubgraphQueryGradualWeightUpdatesArgs, SubgraphQueryInvestmentArgs, SubgraphQueryInvestmentsArgs, SubgraphQueryJoinExitArgs, SubgraphQueryJoinExitsArgs, SubgraphQueryLatestPriceArgs, SubgraphQueryLatestPricesArgs, SubgraphQueryPoolArgs, SubgraphQueryPoolHistoricalLiquiditiesArgs, SubgraphQueryPoolHistoricalLiquidityArgs, SubgraphQueryPoolShareArgs, SubgraphQueryPoolSharesArgs, SubgraphQueryPoolSnapshotArgs, SubgraphQueryPoolSnapshotsArgs, SubgraphQueryPoolTokenArgs, SubgraphQueryPoolTokensArgs, SubgraphQueryPoolsArgs, SubgraphQueryPriceRateProviderArgs, SubgraphQueryPriceRateProvidersArgs, SubgraphQuerySwapArgs, SubgraphQuerySwapsArgs, SubgraphQueryTokenArgs, SubgraphQueryTokenPriceArgs, SubgraphQueryTokenPricesArgs, SubgraphQueryTokenSnapshotArgs, SubgraphQueryTokenSnapshotsArgs, SubgraphQueryTokensArgs, SubgraphQueryTradePairArgs, SubgraphQueryTradePairSnapshotArgs, SubgraphQueryTradePairSnapshotsArgs, SubgraphQueryTradePairsArgs, SubgraphQueryUserArgs, SubgraphQueryUserInternalBalanceArgs, SubgraphQueryUserInternalBalancesArgs, SubgraphQueryUsersArgs, SubgraphQuery_MetaArgs, SubgraphSubgraphBalancerFragment, SubgraphSubgraphTokenLatestPriceFragment, SubgraphSubgraphTokenPriceFragment, SubgraphSubgraphUserFragment, SubgraphSubscription, SubgraphSubscriptionAmpUpdateArgs, SubgraphSubscriptionAmpUpdatesArgs, SubgraphSubscriptionBalancerArgs, SubgraphSubscriptionBalancerSnapshotArgs, SubgraphSubscriptionBalancerSnapshotsArgs, SubgraphSubscriptionBalancersArgs, SubgraphSubscriptionGradualWeightUpdateArgs, SubgraphSubscriptionGradualWeightUpdatesArgs, SubgraphSubscriptionInvestmentArgs, SubgraphSubscriptionInvestmentsArgs, SubgraphSubscriptionJoinExitArgs, SubgraphSubscriptionJoinExitsArgs, SubgraphSubscriptionLatestPriceArgs, SubgraphSubscriptionLatestPricesArgs, SubgraphSubscriptionPoolArgs, SubgraphSubscriptionPoolHistoricalLiquiditiesArgs, SubgraphSubscriptionPoolHistoricalLiquidityArgs, SubgraphSubscriptionPoolShareArgs, SubgraphSubscriptionPoolSharesArgs, SubgraphSubscriptionPoolSnapshotArgs, SubgraphSubscriptionPoolSnapshotsArgs, SubgraphSubscriptionPoolTokenArgs, SubgraphSubscriptionPoolTokensArgs, SubgraphSubscriptionPoolsArgs, SubgraphSubscriptionPriceRateProviderArgs, SubgraphSubscriptionPriceRateProvidersArgs, SubgraphSubscriptionSwapArgs, SubgraphSubscriptionSwapsArgs, SubgraphSubscriptionTokenArgs, SubgraphSubscriptionTokenPriceArgs, SubgraphSubscriptionTokenPricesArgs, SubgraphSubscriptionTokenSnapshotArgs, SubgraphSubscriptionTokenSnapshotsArgs, SubgraphSubscriptionTokensArgs, SubgraphSubscriptionTradePairArgs, SubgraphSubscriptionTradePairSnapshotArgs, SubgraphSubscriptionTradePairSnapshotsArgs, SubgraphSubscriptionTradePairsArgs, SubgraphSubscriptionUserArgs, SubgraphSubscriptionUserInternalBalanceArgs, SubgraphSubscriptionUserInternalBalancesArgs, SubgraphSubscriptionUsersArgs, SubgraphSubscription_MetaArgs, SubgraphSwap, SubgraphSwap_Filter, SubgraphSwap_OrderBy, SubgraphToken, SubgraphTokenLatestPriceFragmentDoc, SubgraphTokenLatestPriceQuery, SubgraphTokenLatestPriceQueryVariables, SubgraphTokenLatestPricesQuery, SubgraphTokenLatestPricesQueryVariables, SubgraphTokenPrice, SubgraphTokenPriceFragmentDoc, SubgraphTokenPrice_Filter, SubgraphTokenPrice_OrderBy, SubgraphTokenPricesQuery, SubgraphTokenPricesQueryVariables, SubgraphTokenSnapshot, SubgraphTokenSnapshot_Filter, SubgraphTokenSnapshot_OrderBy, SubgraphToken_Filter, SubgraphToken_OrderBy, SubgraphTradePair, SubgraphTradePairSnapshot, SubgraphTradePairSnapshot_Filter, SubgraphTradePairSnapshot_OrderBy, SubgraphTradePair_Filter, SubgraphTradePair_OrderBy, SubgraphUser, SubgraphUserFragmentDoc, SubgraphUserInternalBalance, SubgraphUserInternalBalance_Filter, SubgraphUserInternalBalance_OrderBy, SubgraphUserQuery, SubgraphUserQueryVariables, SubgraphUserSharesOwnedArgs, SubgraphUserSwapsArgs, SubgraphUserUserInternalBalancesArgs, SubgraphUser_Filter, SubgraphUser_OrderBy, SubgraphUsersQuery, SubgraphUsersQueryVariables, Subgraph_Block_, Subgraph_Meta_, Subgraph_SubgraphErrorPolicy_, Swap, SwapType, SwapsService, TokenLatestPriceDocument, TokenLatestPricesDocument, TokenPricesDocument, TransactionData, UserBalanceOp, UserBalanceOpKind, UserDocument, UsersDocument, WeightedPoolEncoder, WeightedPoolExitKind, WeightedPoolJoinKind, accountToAddress, getLimitsForSlippage, getPoolAddress, getPoolNonce, getPoolSpecialization, getSdk, isNormalizedWeights, isSameAddress, signPermit, splitPoolId, toNormalizedWeights };
