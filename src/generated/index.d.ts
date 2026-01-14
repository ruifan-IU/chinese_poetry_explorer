
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Dynasty
 * 
 */
export type Dynasty = $Result.DefaultSelection<Prisma.$DynastyPayload>
/**
 * Model Author
 * 
 */
export type Author = $Result.DefaultSelection<Prisma.$AuthorPayload>
/**
 * Model Text
 * 
 */
export type Text = $Result.DefaultSelection<Prisma.$TextPayload>
/**
 * Model Type
 * 
 */
export type Type = $Result.DefaultSelection<Prisma.$TypePayload>
/**
 * Model TextType
 * 
 */
export type TextType = $Result.DefaultSelection<Prisma.$TextTypePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Dynasties
 * const dynasties = await prisma.dynasty.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Dynasties
   * const dynasties = await prisma.dynasty.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.dynasty`: Exposes CRUD operations for the **Dynasty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dynasties
    * const dynasties = await prisma.dynasty.findMany()
    * ```
    */
  get dynasty(): Prisma.DynastyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.author`: Exposes CRUD operations for the **Author** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authors
    * const authors = await prisma.author.findMany()
    * ```
    */
  get author(): Prisma.AuthorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.text`: Exposes CRUD operations for the **Text** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Texts
    * const texts = await prisma.text.findMany()
    * ```
    */
  get text(): Prisma.TextDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.type`: Exposes CRUD operations for the **Type** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Types
    * const types = await prisma.type.findMany()
    * ```
    */
  get type(): Prisma.TypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.textType`: Exposes CRUD operations for the **TextType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TextTypes
    * const textTypes = await prisma.textType.findMany()
    * ```
    */
  get textType(): Prisma.TextTypeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Dynasty: 'Dynasty',
    Author: 'Author',
    Text: 'Text',
    Type: 'Type',
    TextType: 'TextType'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "dynasty" | "author" | "text" | "type" | "textType"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Dynasty: {
        payload: Prisma.$DynastyPayload<ExtArgs>
        fields: Prisma.DynastyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DynastyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DynastyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          findFirst: {
            args: Prisma.DynastyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DynastyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          findMany: {
            args: Prisma.DynastyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>[]
          }
          create: {
            args: Prisma.DynastyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          createMany: {
            args: Prisma.DynastyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DynastyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>[]
          }
          delete: {
            args: Prisma.DynastyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          update: {
            args: Prisma.DynastyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          deleteMany: {
            args: Prisma.DynastyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DynastyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DynastyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>[]
          }
          upsert: {
            args: Prisma.DynastyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DynastyPayload>
          }
          aggregate: {
            args: Prisma.DynastyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDynasty>
          }
          groupBy: {
            args: Prisma.DynastyGroupByArgs<ExtArgs>
            result: $Utils.Optional<DynastyGroupByOutputType>[]
          }
          count: {
            args: Prisma.DynastyCountArgs<ExtArgs>
            result: $Utils.Optional<DynastyCountAggregateOutputType> | number
          }
        }
      }
      Author: {
        payload: Prisma.$AuthorPayload<ExtArgs>
        fields: Prisma.AuthorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findFirst: {
            args: Prisma.AuthorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          findMany: {
            args: Prisma.AuthorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          create: {
            args: Prisma.AuthorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          createMany: {
            args: Prisma.AuthorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          delete: {
            args: Prisma.AuthorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          update: {
            args: Prisma.AuthorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          deleteMany: {
            args: Prisma.AuthorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>[]
          }
          upsert: {
            args: Prisma.AuthorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorPayload>
          }
          aggregate: {
            args: Prisma.AuthorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthor>
          }
          groupBy: {
            args: Prisma.AuthorGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorCountAggregateOutputType> | number
          }
        }
      }
      Text: {
        payload: Prisma.$TextPayload<ExtArgs>
        fields: Prisma.TextFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TextFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TextFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          findFirst: {
            args: Prisma.TextFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TextFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          findMany: {
            args: Prisma.TextFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>[]
          }
          create: {
            args: Prisma.TextCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          createMany: {
            args: Prisma.TextCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TextCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>[]
          }
          delete: {
            args: Prisma.TextDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          update: {
            args: Prisma.TextUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          deleteMany: {
            args: Prisma.TextDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TextUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TextUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>[]
          }
          upsert: {
            args: Prisma.TextUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextPayload>
          }
          aggregate: {
            args: Prisma.TextAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateText>
          }
          groupBy: {
            args: Prisma.TextGroupByArgs<ExtArgs>
            result: $Utils.Optional<TextGroupByOutputType>[]
          }
          count: {
            args: Prisma.TextCountArgs<ExtArgs>
            result: $Utils.Optional<TextCountAggregateOutputType> | number
          }
        }
      }
      Type: {
        payload: Prisma.$TypePayload<ExtArgs>
        fields: Prisma.TypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          findFirst: {
            args: Prisma.TypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          findMany: {
            args: Prisma.TypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>[]
          }
          create: {
            args: Prisma.TypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          createMany: {
            args: Prisma.TypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>[]
          }
          delete: {
            args: Prisma.TypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          update: {
            args: Prisma.TypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          deleteMany: {
            args: Prisma.TypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>[]
          }
          upsert: {
            args: Prisma.TypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TypePayload>
          }
          aggregate: {
            args: Prisma.TypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateType>
          }
          groupBy: {
            args: Prisma.TypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TypeCountArgs<ExtArgs>
            result: $Utils.Optional<TypeCountAggregateOutputType> | number
          }
        }
      }
      TextType: {
        payload: Prisma.$TextTypePayload<ExtArgs>
        fields: Prisma.TextTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TextTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TextTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          findFirst: {
            args: Prisma.TextTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TextTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          findMany: {
            args: Prisma.TextTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>[]
          }
          create: {
            args: Prisma.TextTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          createMany: {
            args: Prisma.TextTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TextTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>[]
          }
          delete: {
            args: Prisma.TextTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          update: {
            args: Prisma.TextTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          deleteMany: {
            args: Prisma.TextTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TextTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TextTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>[]
          }
          upsert: {
            args: Prisma.TextTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TextTypePayload>
          }
          aggregate: {
            args: Prisma.TextTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTextType>
          }
          groupBy: {
            args: Prisma.TextTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TextTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TextTypeCountArgs<ExtArgs>
            result: $Utils.Optional<TextTypeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    dynasty?: DynastyOmit
    author?: AuthorOmit
    text?: TextOmit
    type?: TypeOmit
    textType?: TextTypeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DynastyCountOutputType
   */

  export type DynastyCountOutputType = {
    authors: number
    texts: number
  }

  export type DynastyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authors?: boolean | DynastyCountOutputTypeCountAuthorsArgs
    texts?: boolean | DynastyCountOutputTypeCountTextsArgs
  }

  // Custom InputTypes
  /**
   * DynastyCountOutputType without action
   */
  export type DynastyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DynastyCountOutputType
     */
    select?: DynastyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DynastyCountOutputType without action
   */
  export type DynastyCountOutputTypeCountAuthorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWhereInput
  }

  /**
   * DynastyCountOutputType without action
   */
  export type DynastyCountOutputTypeCountTextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextWhereInput
  }


  /**
   * Count Type AuthorCountOutputType
   */

  export type AuthorCountOutputType = {
    texts: number
  }

  export type AuthorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    texts?: boolean | AuthorCountOutputTypeCountTextsArgs
  }

  // Custom InputTypes
  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorCountOutputType
     */
    select?: AuthorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AuthorCountOutputType without action
   */
  export type AuthorCountOutputTypeCountTextsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextWhereInput
  }


  /**
   * Count Type TextCountOutputType
   */

  export type TextCountOutputType = {
    textTypes: number
  }

  export type TextCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    textTypes?: boolean | TextCountOutputTypeCountTextTypesArgs
  }

  // Custom InputTypes
  /**
   * TextCountOutputType without action
   */
  export type TextCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextCountOutputType
     */
    select?: TextCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TextCountOutputType without action
   */
  export type TextCountOutputTypeCountTextTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextTypeWhereInput
  }


  /**
   * Count Type TypeCountOutputType
   */

  export type TypeCountOutputType = {
    textTypes: number
  }

  export type TypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    textTypes?: boolean | TypeCountOutputTypeCountTextTypesArgs
  }

  // Custom InputTypes
  /**
   * TypeCountOutputType without action
   */
  export type TypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TypeCountOutputType
     */
    select?: TypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TypeCountOutputType without action
   */
  export type TypeCountOutputTypeCountTextTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextTypeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Dynasty
   */

  export type AggregateDynasty = {
    _count: DynastyCountAggregateOutputType | null
    _avg: DynastyAvgAggregateOutputType | null
    _sum: DynastySumAggregateOutputType | null
    _min: DynastyMinAggregateOutputType | null
    _max: DynastyMaxAggregateOutputType | null
  }

  export type DynastyAvgAggregateOutputType = {
    id: number | null
  }

  export type DynastySumAggregateOutputType = {
    id: number | null
  }

  export type DynastyMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type DynastyMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type DynastyCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type DynastyAvgAggregateInputType = {
    id?: true
  }

  export type DynastySumAggregateInputType = {
    id?: true
  }

  export type DynastyMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type DynastyMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type DynastyCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type DynastyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dynasty to aggregate.
     */
    where?: DynastyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dynasties to fetch.
     */
    orderBy?: DynastyOrderByWithRelationInput | DynastyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DynastyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dynasties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dynasties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dynasties
    **/
    _count?: true | DynastyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DynastyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DynastySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DynastyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DynastyMaxAggregateInputType
  }

  export type GetDynastyAggregateType<T extends DynastyAggregateArgs> = {
        [P in keyof T & keyof AggregateDynasty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDynasty[P]>
      : GetScalarType<T[P], AggregateDynasty[P]>
  }




  export type DynastyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DynastyWhereInput
    orderBy?: DynastyOrderByWithAggregationInput | DynastyOrderByWithAggregationInput[]
    by: DynastyScalarFieldEnum[] | DynastyScalarFieldEnum
    having?: DynastyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DynastyCountAggregateInputType | true
    _avg?: DynastyAvgAggregateInputType
    _sum?: DynastySumAggregateInputType
    _min?: DynastyMinAggregateInputType
    _max?: DynastyMaxAggregateInputType
  }

  export type DynastyGroupByOutputType = {
    id: number
    name: string
    _count: DynastyCountAggregateOutputType | null
    _avg: DynastyAvgAggregateOutputType | null
    _sum: DynastySumAggregateOutputType | null
    _min: DynastyMinAggregateOutputType | null
    _max: DynastyMaxAggregateOutputType | null
  }

  type GetDynastyGroupByPayload<T extends DynastyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DynastyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DynastyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DynastyGroupByOutputType[P]>
            : GetScalarType<T[P], DynastyGroupByOutputType[P]>
        }
      >
    >


  export type DynastySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    authors?: boolean | Dynasty$authorsArgs<ExtArgs>
    texts?: boolean | Dynasty$textsArgs<ExtArgs>
    _count?: boolean | DynastyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dynasty"]>

  export type DynastySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["dynasty"]>

  export type DynastySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["dynasty"]>

  export type DynastySelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type DynastyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["dynasty"]>
  export type DynastyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authors?: boolean | Dynasty$authorsArgs<ExtArgs>
    texts?: boolean | Dynasty$textsArgs<ExtArgs>
    _count?: boolean | DynastyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DynastyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DynastyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DynastyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dynasty"
    objects: {
      authors: Prisma.$AuthorPayload<ExtArgs>[]
      texts: Prisma.$TextPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["dynasty"]>
    composites: {}
  }

  type DynastyGetPayload<S extends boolean | null | undefined | DynastyDefaultArgs> = $Result.GetResult<Prisma.$DynastyPayload, S>

  type DynastyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DynastyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DynastyCountAggregateInputType | true
    }

  export interface DynastyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dynasty'], meta: { name: 'Dynasty' } }
    /**
     * Find zero or one Dynasty that matches the filter.
     * @param {DynastyFindUniqueArgs} args - Arguments to find a Dynasty
     * @example
     * // Get one Dynasty
     * const dynasty = await prisma.dynasty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DynastyFindUniqueArgs>(args: SelectSubset<T, DynastyFindUniqueArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dynasty that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DynastyFindUniqueOrThrowArgs} args - Arguments to find a Dynasty
     * @example
     * // Get one Dynasty
     * const dynasty = await prisma.dynasty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DynastyFindUniqueOrThrowArgs>(args: SelectSubset<T, DynastyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dynasty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyFindFirstArgs} args - Arguments to find a Dynasty
     * @example
     * // Get one Dynasty
     * const dynasty = await prisma.dynasty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DynastyFindFirstArgs>(args?: SelectSubset<T, DynastyFindFirstArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dynasty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyFindFirstOrThrowArgs} args - Arguments to find a Dynasty
     * @example
     * // Get one Dynasty
     * const dynasty = await prisma.dynasty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DynastyFindFirstOrThrowArgs>(args?: SelectSubset<T, DynastyFindFirstOrThrowArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dynasties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dynasties
     * const dynasties = await prisma.dynasty.findMany()
     * 
     * // Get first 10 Dynasties
     * const dynasties = await prisma.dynasty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dynastyWithIdOnly = await prisma.dynasty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DynastyFindManyArgs>(args?: SelectSubset<T, DynastyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dynasty.
     * @param {DynastyCreateArgs} args - Arguments to create a Dynasty.
     * @example
     * // Create one Dynasty
     * const Dynasty = await prisma.dynasty.create({
     *   data: {
     *     // ... data to create a Dynasty
     *   }
     * })
     * 
     */
    create<T extends DynastyCreateArgs>(args: SelectSubset<T, DynastyCreateArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dynasties.
     * @param {DynastyCreateManyArgs} args - Arguments to create many Dynasties.
     * @example
     * // Create many Dynasties
     * const dynasty = await prisma.dynasty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DynastyCreateManyArgs>(args?: SelectSubset<T, DynastyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dynasties and returns the data saved in the database.
     * @param {DynastyCreateManyAndReturnArgs} args - Arguments to create many Dynasties.
     * @example
     * // Create many Dynasties
     * const dynasty = await prisma.dynasty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dynasties and only return the `id`
     * const dynastyWithIdOnly = await prisma.dynasty.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DynastyCreateManyAndReturnArgs>(args?: SelectSubset<T, DynastyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dynasty.
     * @param {DynastyDeleteArgs} args - Arguments to delete one Dynasty.
     * @example
     * // Delete one Dynasty
     * const Dynasty = await prisma.dynasty.delete({
     *   where: {
     *     // ... filter to delete one Dynasty
     *   }
     * })
     * 
     */
    delete<T extends DynastyDeleteArgs>(args: SelectSubset<T, DynastyDeleteArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dynasty.
     * @param {DynastyUpdateArgs} args - Arguments to update one Dynasty.
     * @example
     * // Update one Dynasty
     * const dynasty = await prisma.dynasty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DynastyUpdateArgs>(args: SelectSubset<T, DynastyUpdateArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dynasties.
     * @param {DynastyDeleteManyArgs} args - Arguments to filter Dynasties to delete.
     * @example
     * // Delete a few Dynasties
     * const { count } = await prisma.dynasty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DynastyDeleteManyArgs>(args?: SelectSubset<T, DynastyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dynasties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dynasties
     * const dynasty = await prisma.dynasty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DynastyUpdateManyArgs>(args: SelectSubset<T, DynastyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dynasties and returns the data updated in the database.
     * @param {DynastyUpdateManyAndReturnArgs} args - Arguments to update many Dynasties.
     * @example
     * // Update many Dynasties
     * const dynasty = await prisma.dynasty.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dynasties and only return the `id`
     * const dynastyWithIdOnly = await prisma.dynasty.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DynastyUpdateManyAndReturnArgs>(args: SelectSubset<T, DynastyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dynasty.
     * @param {DynastyUpsertArgs} args - Arguments to update or create a Dynasty.
     * @example
     * // Update or create a Dynasty
     * const dynasty = await prisma.dynasty.upsert({
     *   create: {
     *     // ... data to create a Dynasty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dynasty we want to update
     *   }
     * })
     */
    upsert<T extends DynastyUpsertArgs>(args: SelectSubset<T, DynastyUpsertArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dynasties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyCountArgs} args - Arguments to filter Dynasties to count.
     * @example
     * // Count the number of Dynasties
     * const count = await prisma.dynasty.count({
     *   where: {
     *     // ... the filter for the Dynasties we want to count
     *   }
     * })
    **/
    count<T extends DynastyCountArgs>(
      args?: Subset<T, DynastyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DynastyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dynasty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DynastyAggregateArgs>(args: Subset<T, DynastyAggregateArgs>): Prisma.PrismaPromise<GetDynastyAggregateType<T>>

    /**
     * Group by Dynasty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DynastyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DynastyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DynastyGroupByArgs['orderBy'] }
        : { orderBy?: DynastyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DynastyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDynastyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dynasty model
   */
  readonly fields: DynastyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dynasty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DynastyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authors<T extends Dynasty$authorsArgs<ExtArgs> = {}>(args?: Subset<T, Dynasty$authorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    texts<T extends Dynasty$textsArgs<ExtArgs> = {}>(args?: Subset<T, Dynasty$textsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dynasty model
   */
  interface DynastyFieldRefs {
    readonly id: FieldRef<"Dynasty", 'Int'>
    readonly name: FieldRef<"Dynasty", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dynasty findUnique
   */
  export type DynastyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter, which Dynasty to fetch.
     */
    where: DynastyWhereUniqueInput
  }

  /**
   * Dynasty findUniqueOrThrow
   */
  export type DynastyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter, which Dynasty to fetch.
     */
    where: DynastyWhereUniqueInput
  }

  /**
   * Dynasty findFirst
   */
  export type DynastyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter, which Dynasty to fetch.
     */
    where?: DynastyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dynasties to fetch.
     */
    orderBy?: DynastyOrderByWithRelationInput | DynastyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dynasties.
     */
    cursor?: DynastyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dynasties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dynasties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dynasties.
     */
    distinct?: DynastyScalarFieldEnum | DynastyScalarFieldEnum[]
  }

  /**
   * Dynasty findFirstOrThrow
   */
  export type DynastyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter, which Dynasty to fetch.
     */
    where?: DynastyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dynasties to fetch.
     */
    orderBy?: DynastyOrderByWithRelationInput | DynastyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dynasties.
     */
    cursor?: DynastyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dynasties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dynasties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dynasties.
     */
    distinct?: DynastyScalarFieldEnum | DynastyScalarFieldEnum[]
  }

  /**
   * Dynasty findMany
   */
  export type DynastyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter, which Dynasties to fetch.
     */
    where?: DynastyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dynasties to fetch.
     */
    orderBy?: DynastyOrderByWithRelationInput | DynastyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dynasties.
     */
    cursor?: DynastyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dynasties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dynasties.
     */
    skip?: number
    distinct?: DynastyScalarFieldEnum | DynastyScalarFieldEnum[]
  }

  /**
   * Dynasty create
   */
  export type DynastyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * The data needed to create a Dynasty.
     */
    data: XOR<DynastyCreateInput, DynastyUncheckedCreateInput>
  }

  /**
   * Dynasty createMany
   */
  export type DynastyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dynasties.
     */
    data: DynastyCreateManyInput | DynastyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dynasty createManyAndReturn
   */
  export type DynastyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * The data used to create many Dynasties.
     */
    data: DynastyCreateManyInput | DynastyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dynasty update
   */
  export type DynastyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * The data needed to update a Dynasty.
     */
    data: XOR<DynastyUpdateInput, DynastyUncheckedUpdateInput>
    /**
     * Choose, which Dynasty to update.
     */
    where: DynastyWhereUniqueInput
  }

  /**
   * Dynasty updateMany
   */
  export type DynastyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dynasties.
     */
    data: XOR<DynastyUpdateManyMutationInput, DynastyUncheckedUpdateManyInput>
    /**
     * Filter which Dynasties to update
     */
    where?: DynastyWhereInput
    /**
     * Limit how many Dynasties to update.
     */
    limit?: number
  }

  /**
   * Dynasty updateManyAndReturn
   */
  export type DynastyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * The data used to update Dynasties.
     */
    data: XOR<DynastyUpdateManyMutationInput, DynastyUncheckedUpdateManyInput>
    /**
     * Filter which Dynasties to update
     */
    where?: DynastyWhereInput
    /**
     * Limit how many Dynasties to update.
     */
    limit?: number
  }

  /**
   * Dynasty upsert
   */
  export type DynastyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * The filter to search for the Dynasty to update in case it exists.
     */
    where: DynastyWhereUniqueInput
    /**
     * In case the Dynasty found by the `where` argument doesn't exist, create a new Dynasty with this data.
     */
    create: XOR<DynastyCreateInput, DynastyUncheckedCreateInput>
    /**
     * In case the Dynasty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DynastyUpdateInput, DynastyUncheckedUpdateInput>
  }

  /**
   * Dynasty delete
   */
  export type DynastyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    /**
     * Filter which Dynasty to delete.
     */
    where: DynastyWhereUniqueInput
  }

  /**
   * Dynasty deleteMany
   */
  export type DynastyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dynasties to delete
     */
    where?: DynastyWhereInput
    /**
     * Limit how many Dynasties to delete.
     */
    limit?: number
  }

  /**
   * Dynasty.authors
   */
  export type Dynasty$authorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    where?: AuthorWhereInput
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    cursor?: AuthorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Dynasty.texts
   */
  export type Dynasty$textsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    where?: TextWhereInput
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    cursor?: TextWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TextScalarFieldEnum | TextScalarFieldEnum[]
  }

  /**
   * Dynasty without action
   */
  export type DynastyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
  }


  /**
   * Model Author
   */

  export type AggregateAuthor = {
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  export type AuthorAvgAggregateOutputType = {
    id: number | null
    dynastyId: number | null
  }

  export type AuthorSumAggregateOutputType = {
    id: number | null
    dynastyId: number | null
  }

  export type AuthorMinAggregateOutputType = {
    id: number | null
    name: string | null
    introduction: string | null
    dynastyId: number | null
  }

  export type AuthorMaxAggregateOutputType = {
    id: number | null
    name: string | null
    introduction: string | null
    dynastyId: number | null
  }

  export type AuthorCountAggregateOutputType = {
    id: number
    name: number
    introduction: number
    dynastyId: number
    _all: number
  }


  export type AuthorAvgAggregateInputType = {
    id?: true
    dynastyId?: true
  }

  export type AuthorSumAggregateInputType = {
    id?: true
    dynastyId?: true
  }

  export type AuthorMinAggregateInputType = {
    id?: true
    name?: true
    introduction?: true
    dynastyId?: true
  }

  export type AuthorMaxAggregateInputType = {
    id?: true
    name?: true
    introduction?: true
    dynastyId?: true
  }

  export type AuthorCountAggregateInputType = {
    id?: true
    name?: true
    introduction?: true
    dynastyId?: true
    _all?: true
  }

  export type AuthorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Author to aggregate.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authors
    **/
    _count?: true | AuthorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorMaxAggregateInputType
  }

  export type GetAuthorAggregateType<T extends AuthorAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthor[P]>
      : GetScalarType<T[P], AggregateAuthor[P]>
  }




  export type AuthorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorWhereInput
    orderBy?: AuthorOrderByWithAggregationInput | AuthorOrderByWithAggregationInput[]
    by: AuthorScalarFieldEnum[] | AuthorScalarFieldEnum
    having?: AuthorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorCountAggregateInputType | true
    _avg?: AuthorAvgAggregateInputType
    _sum?: AuthorSumAggregateInputType
    _min?: AuthorMinAggregateInputType
    _max?: AuthorMaxAggregateInputType
  }

  export type AuthorGroupByOutputType = {
    id: number
    name: string
    introduction: string | null
    dynastyId: number | null
    _count: AuthorCountAggregateOutputType | null
    _avg: AuthorAvgAggregateOutputType | null
    _sum: AuthorSumAggregateOutputType | null
    _min: AuthorMinAggregateOutputType | null
    _max: AuthorMaxAggregateOutputType | null
  }

  type GetAuthorGroupByPayload<T extends AuthorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorGroupByOutputType[P]>
        }
      >
    >


  export type AuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    introduction?: boolean
    dynastyId?: boolean
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
    texts?: boolean | Author$textsArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    introduction?: boolean
    dynastyId?: boolean
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    introduction?: boolean
    dynastyId?: boolean
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
  }, ExtArgs["result"]["author"]>

  export type AuthorSelectScalar = {
    id?: boolean
    name?: boolean
    introduction?: boolean
    dynastyId?: boolean
  }

  export type AuthorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "introduction" | "dynastyId", ExtArgs["result"]["author"]>
  export type AuthorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
    texts?: boolean | Author$textsArgs<ExtArgs>
    _count?: boolean | AuthorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AuthorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
  }
  export type AuthorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dynasty?: boolean | Author$dynastyArgs<ExtArgs>
  }

  export type $AuthorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Author"
    objects: {
      dynasty: Prisma.$DynastyPayload<ExtArgs> | null
      texts: Prisma.$TextPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      introduction: string | null
      dynastyId: number | null
    }, ExtArgs["result"]["author"]>
    composites: {}
  }

  type AuthorGetPayload<S extends boolean | null | undefined | AuthorDefaultArgs> = $Result.GetResult<Prisma.$AuthorPayload, S>

  type AuthorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorCountAggregateInputType | true
    }

  export interface AuthorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Author'], meta: { name: 'Author' } }
    /**
     * Find zero or one Author that matches the filter.
     * @param {AuthorFindUniqueArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorFindUniqueArgs>(args: SelectSubset<T, AuthorFindUniqueArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Author that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorFindUniqueOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Author that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorFindFirstArgs>(args?: SelectSubset<T, AuthorFindFirstArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Author that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindFirstOrThrowArgs} args - Arguments to find a Author
     * @example
     * // Get one Author
     * const author = await prisma.author.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Authors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authors
     * const authors = await prisma.author.findMany()
     * 
     * // Get first 10 Authors
     * const authors = await prisma.author.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorWithIdOnly = await prisma.author.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorFindManyArgs>(args?: SelectSubset<T, AuthorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Author.
     * @param {AuthorCreateArgs} args - Arguments to create a Author.
     * @example
     * // Create one Author
     * const Author = await prisma.author.create({
     *   data: {
     *     // ... data to create a Author
     *   }
     * })
     * 
     */
    create<T extends AuthorCreateArgs>(args: SelectSubset<T, AuthorCreateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Authors.
     * @param {AuthorCreateManyArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorCreateManyArgs>(args?: SelectSubset<T, AuthorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Authors and returns the data saved in the database.
     * @param {AuthorCreateManyAndReturnArgs} args - Arguments to create many Authors.
     * @example
     * // Create many Authors
     * const author = await prisma.author.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthorCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Author.
     * @param {AuthorDeleteArgs} args - Arguments to delete one Author.
     * @example
     * // Delete one Author
     * const Author = await prisma.author.delete({
     *   where: {
     *     // ... filter to delete one Author
     *   }
     * })
     * 
     */
    delete<T extends AuthorDeleteArgs>(args: SelectSubset<T, AuthorDeleteArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Author.
     * @param {AuthorUpdateArgs} args - Arguments to update one Author.
     * @example
     * // Update one Author
     * const author = await prisma.author.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorUpdateArgs>(args: SelectSubset<T, AuthorUpdateArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Authors.
     * @param {AuthorDeleteManyArgs} args - Arguments to filter Authors to delete.
     * @example
     * // Delete a few Authors
     * const { count } = await prisma.author.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorDeleteManyArgs>(args?: SelectSubset<T, AuthorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorUpdateManyArgs>(args: SelectSubset<T, AuthorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authors and returns the data updated in the database.
     * @param {AuthorUpdateManyAndReturnArgs} args - Arguments to update many Authors.
     * @example
     * // Update many Authors
     * const author = await prisma.author.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Authors and only return the `id`
     * const authorWithIdOnly = await prisma.author.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthorUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Author.
     * @param {AuthorUpsertArgs} args - Arguments to update or create a Author.
     * @example
     * // Update or create a Author
     * const author = await prisma.author.upsert({
     *   create: {
     *     // ... data to create a Author
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Author we want to update
     *   }
     * })
     */
    upsert<T extends AuthorUpsertArgs>(args: SelectSubset<T, AuthorUpsertArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Authors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorCountArgs} args - Arguments to filter Authors to count.
     * @example
     * // Count the number of Authors
     * const count = await prisma.author.count({
     *   where: {
     *     // ... the filter for the Authors we want to count
     *   }
     * })
    **/
    count<T extends AuthorCountArgs>(
      args?: Subset<T, AuthorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorAggregateArgs>(args: Subset<T, AuthorAggregateArgs>): Prisma.PrismaPromise<GetAuthorAggregateType<T>>

    /**
     * Group by Author.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorGroupByArgs['orderBy'] }
        : { orderBy?: AuthorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Author model
   */
  readonly fields: AuthorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Author.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dynasty<T extends Author$dynastyArgs<ExtArgs> = {}>(args?: Subset<T, Author$dynastyArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    texts<T extends Author$textsArgs<ExtArgs> = {}>(args?: Subset<T, Author$textsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Author model
   */
  interface AuthorFieldRefs {
    readonly id: FieldRef<"Author", 'Int'>
    readonly name: FieldRef<"Author", 'String'>
    readonly introduction: FieldRef<"Author", 'String'>
    readonly dynastyId: FieldRef<"Author", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Author findUnique
   */
  export type AuthorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findUniqueOrThrow
   */
  export type AuthorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author findFirst
   */
  export type AuthorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findFirstOrThrow
   */
  export type AuthorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Author to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authors.
     */
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author findMany
   */
  export type AuthorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter, which Authors to fetch.
     */
    where?: AuthorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authors to fetch.
     */
    orderBy?: AuthorOrderByWithRelationInput | AuthorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authors.
     */
    cursor?: AuthorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authors.
     */
    skip?: number
    distinct?: AuthorScalarFieldEnum | AuthorScalarFieldEnum[]
  }

  /**
   * Author create
   */
  export type AuthorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to create a Author.
     */
    data: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
  }

  /**
   * Author createMany
   */
  export type AuthorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Author createManyAndReturn
   */
  export type AuthorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to create many Authors.
     */
    data: AuthorCreateManyInput | AuthorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Author update
   */
  export type AuthorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The data needed to update a Author.
     */
    data: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
    /**
     * Choose, which Author to update.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author updateMany
   */
  export type AuthorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
  }

  /**
   * Author updateManyAndReturn
   */
  export type AuthorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * The data used to update Authors.
     */
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyInput>
    /**
     * Filter which Authors to update
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Author upsert
   */
  export type AuthorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * The filter to search for the Author to update in case it exists.
     */
    where: AuthorWhereUniqueInput
    /**
     * In case the Author found by the `where` argument doesn't exist, create a new Author with this data.
     */
    create: XOR<AuthorCreateInput, AuthorUncheckedCreateInput>
    /**
     * In case the Author was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorUpdateInput, AuthorUncheckedUpdateInput>
  }

  /**
   * Author delete
   */
  export type AuthorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
    /**
     * Filter which Author to delete.
     */
    where: AuthorWhereUniqueInput
  }

  /**
   * Author deleteMany
   */
  export type AuthorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Authors to delete
     */
    where?: AuthorWhereInput
    /**
     * Limit how many Authors to delete.
     */
    limit?: number
  }

  /**
   * Author.dynasty
   */
  export type Author$dynastyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dynasty
     */
    select?: DynastySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dynasty
     */
    omit?: DynastyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DynastyInclude<ExtArgs> | null
    where?: DynastyWhereInput
  }

  /**
   * Author.texts
   */
  export type Author$textsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    where?: TextWhereInput
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    cursor?: TextWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TextScalarFieldEnum | TextScalarFieldEnum[]
  }

  /**
   * Author without action
   */
  export type AuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Author
     */
    select?: AuthorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Author
     */
    omit?: AuthorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorInclude<ExtArgs> | null
  }


  /**
   * Model Text
   */

  export type AggregateText = {
    _count: TextCountAggregateOutputType | null
    _avg: TextAvgAggregateOutputType | null
    _sum: TextSumAggregateOutputType | null
    _min: TextMinAggregateOutputType | null
    _max: TextMaxAggregateOutputType | null
  }

  export type TextAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    dynastyId: number | null
  }

  export type TextSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    dynastyId: number | null
  }

  export type TextMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    contentHash: string | null
    annotation: string | null
    comments: string | null
    translation: string | null
    authorId: number | null
    dynastyId: number | null
  }

  export type TextMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    contentHash: string | null
    annotation: string | null
    comments: string | null
    translation: string | null
    authorId: number | null
    dynastyId: number | null
  }

  export type TextCountAggregateOutputType = {
    id: number
    title: number
    content: number
    contentHash: number
    annotation: number
    comments: number
    translation: number
    authorId: number
    dynastyId: number
    _all: number
  }


  export type TextAvgAggregateInputType = {
    id?: true
    authorId?: true
    dynastyId?: true
  }

  export type TextSumAggregateInputType = {
    id?: true
    authorId?: true
    dynastyId?: true
  }

  export type TextMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    contentHash?: true
    annotation?: true
    comments?: true
    translation?: true
    authorId?: true
    dynastyId?: true
  }

  export type TextMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    contentHash?: true
    annotation?: true
    comments?: true
    translation?: true
    authorId?: true
    dynastyId?: true
  }

  export type TextCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    contentHash?: true
    annotation?: true
    comments?: true
    translation?: true
    authorId?: true
    dynastyId?: true
    _all?: true
  }

  export type TextAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Text to aggregate.
     */
    where?: TextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Texts to fetch.
     */
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Texts
    **/
    _count?: true | TextCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TextAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TextSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TextMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TextMaxAggregateInputType
  }

  export type GetTextAggregateType<T extends TextAggregateArgs> = {
        [P in keyof T & keyof AggregateText]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateText[P]>
      : GetScalarType<T[P], AggregateText[P]>
  }




  export type TextGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextWhereInput
    orderBy?: TextOrderByWithAggregationInput | TextOrderByWithAggregationInput[]
    by: TextScalarFieldEnum[] | TextScalarFieldEnum
    having?: TextScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TextCountAggregateInputType | true
    _avg?: TextAvgAggregateInputType
    _sum?: TextSumAggregateInputType
    _min?: TextMinAggregateInputType
    _max?: TextMaxAggregateInputType
  }

  export type TextGroupByOutputType = {
    id: number
    title: string
    content: string
    contentHash: string
    annotation: string | null
    comments: string | null
    translation: string | null
    authorId: number
    dynastyId: number
    _count: TextCountAggregateOutputType | null
    _avg: TextAvgAggregateOutputType | null
    _sum: TextSumAggregateOutputType | null
    _min: TextMinAggregateOutputType | null
    _max: TextMaxAggregateOutputType | null
  }

  type GetTextGroupByPayload<T extends TextGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TextGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TextGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TextGroupByOutputType[P]>
            : GetScalarType<T[P], TextGroupByOutputType[P]>
        }
      >
    >


  export type TextSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    contentHash?: boolean
    annotation?: boolean
    comments?: boolean
    translation?: boolean
    authorId?: boolean
    dynastyId?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
    textTypes?: boolean | Text$textTypesArgs<ExtArgs>
    _count?: boolean | TextCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["text"]>

  export type TextSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    contentHash?: boolean
    annotation?: boolean
    comments?: boolean
    translation?: boolean
    authorId?: boolean
    dynastyId?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["text"]>

  export type TextSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    contentHash?: boolean
    annotation?: boolean
    comments?: boolean
    translation?: boolean
    authorId?: boolean
    dynastyId?: boolean
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["text"]>

  export type TextSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    contentHash?: boolean
    annotation?: boolean
    comments?: boolean
    translation?: boolean
    authorId?: boolean
    dynastyId?: boolean
  }

  export type TextOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "contentHash" | "annotation" | "comments" | "translation" | "authorId" | "dynastyId", ExtArgs["result"]["text"]>
  export type TextInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
    textTypes?: boolean | Text$textTypesArgs<ExtArgs>
    _count?: boolean | TextCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TextIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
  }
  export type TextIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | AuthorDefaultArgs<ExtArgs>
    dynasty?: boolean | DynastyDefaultArgs<ExtArgs>
  }

  export type $TextPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Text"
    objects: {
      author: Prisma.$AuthorPayload<ExtArgs>
      dynasty: Prisma.$DynastyPayload<ExtArgs>
      textTypes: Prisma.$TextTypePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      contentHash: string
      annotation: string | null
      comments: string | null
      translation: string | null
      authorId: number
      dynastyId: number
    }, ExtArgs["result"]["text"]>
    composites: {}
  }

  type TextGetPayload<S extends boolean | null | undefined | TextDefaultArgs> = $Result.GetResult<Prisma.$TextPayload, S>

  type TextCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TextFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TextCountAggregateInputType | true
    }

  export interface TextDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Text'], meta: { name: 'Text' } }
    /**
     * Find zero or one Text that matches the filter.
     * @param {TextFindUniqueArgs} args - Arguments to find a Text
     * @example
     * // Get one Text
     * const text = await prisma.text.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TextFindUniqueArgs>(args: SelectSubset<T, TextFindUniqueArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Text that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TextFindUniqueOrThrowArgs} args - Arguments to find a Text
     * @example
     * // Get one Text
     * const text = await prisma.text.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TextFindUniqueOrThrowArgs>(args: SelectSubset<T, TextFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Text that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextFindFirstArgs} args - Arguments to find a Text
     * @example
     * // Get one Text
     * const text = await prisma.text.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TextFindFirstArgs>(args?: SelectSubset<T, TextFindFirstArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Text that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextFindFirstOrThrowArgs} args - Arguments to find a Text
     * @example
     * // Get one Text
     * const text = await prisma.text.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TextFindFirstOrThrowArgs>(args?: SelectSubset<T, TextFindFirstOrThrowArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Texts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Texts
     * const texts = await prisma.text.findMany()
     * 
     * // Get first 10 Texts
     * const texts = await prisma.text.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const textWithIdOnly = await prisma.text.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TextFindManyArgs>(args?: SelectSubset<T, TextFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Text.
     * @param {TextCreateArgs} args - Arguments to create a Text.
     * @example
     * // Create one Text
     * const Text = await prisma.text.create({
     *   data: {
     *     // ... data to create a Text
     *   }
     * })
     * 
     */
    create<T extends TextCreateArgs>(args: SelectSubset<T, TextCreateArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Texts.
     * @param {TextCreateManyArgs} args - Arguments to create many Texts.
     * @example
     * // Create many Texts
     * const text = await prisma.text.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TextCreateManyArgs>(args?: SelectSubset<T, TextCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Texts and returns the data saved in the database.
     * @param {TextCreateManyAndReturnArgs} args - Arguments to create many Texts.
     * @example
     * // Create many Texts
     * const text = await prisma.text.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Texts and only return the `id`
     * const textWithIdOnly = await prisma.text.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TextCreateManyAndReturnArgs>(args?: SelectSubset<T, TextCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Text.
     * @param {TextDeleteArgs} args - Arguments to delete one Text.
     * @example
     * // Delete one Text
     * const Text = await prisma.text.delete({
     *   where: {
     *     // ... filter to delete one Text
     *   }
     * })
     * 
     */
    delete<T extends TextDeleteArgs>(args: SelectSubset<T, TextDeleteArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Text.
     * @param {TextUpdateArgs} args - Arguments to update one Text.
     * @example
     * // Update one Text
     * const text = await prisma.text.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TextUpdateArgs>(args: SelectSubset<T, TextUpdateArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Texts.
     * @param {TextDeleteManyArgs} args - Arguments to filter Texts to delete.
     * @example
     * // Delete a few Texts
     * const { count } = await prisma.text.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TextDeleteManyArgs>(args?: SelectSubset<T, TextDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Texts
     * const text = await prisma.text.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TextUpdateManyArgs>(args: SelectSubset<T, TextUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Texts and returns the data updated in the database.
     * @param {TextUpdateManyAndReturnArgs} args - Arguments to update many Texts.
     * @example
     * // Update many Texts
     * const text = await prisma.text.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Texts and only return the `id`
     * const textWithIdOnly = await prisma.text.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TextUpdateManyAndReturnArgs>(args: SelectSubset<T, TextUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Text.
     * @param {TextUpsertArgs} args - Arguments to update or create a Text.
     * @example
     * // Update or create a Text
     * const text = await prisma.text.upsert({
     *   create: {
     *     // ... data to create a Text
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Text we want to update
     *   }
     * })
     */
    upsert<T extends TextUpsertArgs>(args: SelectSubset<T, TextUpsertArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Texts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextCountArgs} args - Arguments to filter Texts to count.
     * @example
     * // Count the number of Texts
     * const count = await prisma.text.count({
     *   where: {
     *     // ... the filter for the Texts we want to count
     *   }
     * })
    **/
    count<T extends TextCountArgs>(
      args?: Subset<T, TextCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TextCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Text.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TextAggregateArgs>(args: Subset<T, TextAggregateArgs>): Prisma.PrismaPromise<GetTextAggregateType<T>>

    /**
     * Group by Text.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TextGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TextGroupByArgs['orderBy'] }
        : { orderBy?: TextGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TextGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTextGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Text model
   */
  readonly fields: TextFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Text.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TextClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends AuthorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AuthorDefaultArgs<ExtArgs>>): Prisma__AuthorClient<$Result.GetResult<Prisma.$AuthorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dynasty<T extends DynastyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DynastyDefaultArgs<ExtArgs>>): Prisma__DynastyClient<$Result.GetResult<Prisma.$DynastyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    textTypes<T extends Text$textTypesArgs<ExtArgs> = {}>(args?: Subset<T, Text$textTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Text model
   */
  interface TextFieldRefs {
    readonly id: FieldRef<"Text", 'Int'>
    readonly title: FieldRef<"Text", 'String'>
    readonly content: FieldRef<"Text", 'String'>
    readonly contentHash: FieldRef<"Text", 'String'>
    readonly annotation: FieldRef<"Text", 'String'>
    readonly comments: FieldRef<"Text", 'String'>
    readonly translation: FieldRef<"Text", 'String'>
    readonly authorId: FieldRef<"Text", 'Int'>
    readonly dynastyId: FieldRef<"Text", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Text findUnique
   */
  export type TextFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter, which Text to fetch.
     */
    where: TextWhereUniqueInput
  }

  /**
   * Text findUniqueOrThrow
   */
  export type TextFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter, which Text to fetch.
     */
    where: TextWhereUniqueInput
  }

  /**
   * Text findFirst
   */
  export type TextFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter, which Text to fetch.
     */
    where?: TextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Texts to fetch.
     */
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Texts.
     */
    cursor?: TextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Texts.
     */
    distinct?: TextScalarFieldEnum | TextScalarFieldEnum[]
  }

  /**
   * Text findFirstOrThrow
   */
  export type TextFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter, which Text to fetch.
     */
    where?: TextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Texts to fetch.
     */
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Texts.
     */
    cursor?: TextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Texts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Texts.
     */
    distinct?: TextScalarFieldEnum | TextScalarFieldEnum[]
  }

  /**
   * Text findMany
   */
  export type TextFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter, which Texts to fetch.
     */
    where?: TextWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Texts to fetch.
     */
    orderBy?: TextOrderByWithRelationInput | TextOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Texts.
     */
    cursor?: TextWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Texts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Texts.
     */
    skip?: number
    distinct?: TextScalarFieldEnum | TextScalarFieldEnum[]
  }

  /**
   * Text create
   */
  export type TextCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * The data needed to create a Text.
     */
    data: XOR<TextCreateInput, TextUncheckedCreateInput>
  }

  /**
   * Text createMany
   */
  export type TextCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Texts.
     */
    data: TextCreateManyInput | TextCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Text createManyAndReturn
   */
  export type TextCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * The data used to create many Texts.
     */
    data: TextCreateManyInput | TextCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Text update
   */
  export type TextUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * The data needed to update a Text.
     */
    data: XOR<TextUpdateInput, TextUncheckedUpdateInput>
    /**
     * Choose, which Text to update.
     */
    where: TextWhereUniqueInput
  }

  /**
   * Text updateMany
   */
  export type TextUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Texts.
     */
    data: XOR<TextUpdateManyMutationInput, TextUncheckedUpdateManyInput>
    /**
     * Filter which Texts to update
     */
    where?: TextWhereInput
    /**
     * Limit how many Texts to update.
     */
    limit?: number
  }

  /**
   * Text updateManyAndReturn
   */
  export type TextUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * The data used to update Texts.
     */
    data: XOR<TextUpdateManyMutationInput, TextUncheckedUpdateManyInput>
    /**
     * Filter which Texts to update
     */
    where?: TextWhereInput
    /**
     * Limit how many Texts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Text upsert
   */
  export type TextUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * The filter to search for the Text to update in case it exists.
     */
    where: TextWhereUniqueInput
    /**
     * In case the Text found by the `where` argument doesn't exist, create a new Text with this data.
     */
    create: XOR<TextCreateInput, TextUncheckedCreateInput>
    /**
     * In case the Text was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TextUpdateInput, TextUncheckedUpdateInput>
  }

  /**
   * Text delete
   */
  export type TextDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
    /**
     * Filter which Text to delete.
     */
    where: TextWhereUniqueInput
  }

  /**
   * Text deleteMany
   */
  export type TextDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Texts to delete
     */
    where?: TextWhereInput
    /**
     * Limit how many Texts to delete.
     */
    limit?: number
  }

  /**
   * Text.textTypes
   */
  export type Text$textTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    where?: TextTypeWhereInput
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    cursor?: TextTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TextTypeScalarFieldEnum | TextTypeScalarFieldEnum[]
  }

  /**
   * Text without action
   */
  export type TextDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Text
     */
    select?: TextSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Text
     */
    omit?: TextOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextInclude<ExtArgs> | null
  }


  /**
   * Model Type
   */

  export type AggregateType = {
    _count: TypeCountAggregateOutputType | null
    _avg: TypeAvgAggregateOutputType | null
    _sum: TypeSumAggregateOutputType | null
    _min: TypeMinAggregateOutputType | null
    _max: TypeMaxAggregateOutputType | null
  }

  export type TypeAvgAggregateOutputType = {
    id: number | null
  }

  export type TypeSumAggregateOutputType = {
    id: number | null
  }

  export type TypeMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TypeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TypeAvgAggregateInputType = {
    id?: true
  }

  export type TypeSumAggregateInputType = {
    id?: true
  }

  export type TypeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TypeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TypeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Type to aggregate.
     */
    where?: TypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Types to fetch.
     */
    orderBy?: TypeOrderByWithRelationInput | TypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Types
    **/
    _count?: true | TypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TypeMaxAggregateInputType
  }

  export type GetTypeAggregateType<T extends TypeAggregateArgs> = {
        [P in keyof T & keyof AggregateType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateType[P]>
      : GetScalarType<T[P], AggregateType[P]>
  }




  export type TypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TypeWhereInput
    orderBy?: TypeOrderByWithAggregationInput | TypeOrderByWithAggregationInput[]
    by: TypeScalarFieldEnum[] | TypeScalarFieldEnum
    having?: TypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TypeCountAggregateInputType | true
    _avg?: TypeAvgAggregateInputType
    _sum?: TypeSumAggregateInputType
    _min?: TypeMinAggregateInputType
    _max?: TypeMaxAggregateInputType
  }

  export type TypeGroupByOutputType = {
    id: number
    name: string
    _count: TypeCountAggregateOutputType | null
    _avg: TypeAvgAggregateOutputType | null
    _sum: TypeSumAggregateOutputType | null
    _min: TypeMinAggregateOutputType | null
    _max: TypeMaxAggregateOutputType | null
  }

  type GetTypeGroupByPayload<T extends TypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TypeGroupByOutputType[P]>
            : GetScalarType<T[P], TypeGroupByOutputType[P]>
        }
      >
    >


  export type TypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    textTypes?: boolean | Type$textTypesArgs<ExtArgs>
    _count?: boolean | TypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["type"]>

  export type TypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["type"]>

  export type TypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["type"]>

  export type TypeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["type"]>
  export type TypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    textTypes?: boolean | Type$textTypesArgs<ExtArgs>
    _count?: boolean | TypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Type"
    objects: {
      textTypes: Prisma.$TextTypePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["type"]>
    composites: {}
  }

  type TypeGetPayload<S extends boolean | null | undefined | TypeDefaultArgs> = $Result.GetResult<Prisma.$TypePayload, S>

  type TypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TypeCountAggregateInputType | true
    }

  export interface TypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Type'], meta: { name: 'Type' } }
    /**
     * Find zero or one Type that matches the filter.
     * @param {TypeFindUniqueArgs} args - Arguments to find a Type
     * @example
     * // Get one Type
     * const type = await prisma.type.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TypeFindUniqueArgs>(args: SelectSubset<T, TypeFindUniqueArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Type that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TypeFindUniqueOrThrowArgs} args - Arguments to find a Type
     * @example
     * // Get one Type
     * const type = await prisma.type.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TypeFindUniqueOrThrowArgs>(args: SelectSubset<T, TypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Type that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeFindFirstArgs} args - Arguments to find a Type
     * @example
     * // Get one Type
     * const type = await prisma.type.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TypeFindFirstArgs>(args?: SelectSubset<T, TypeFindFirstArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Type that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeFindFirstOrThrowArgs} args - Arguments to find a Type
     * @example
     * // Get one Type
     * const type = await prisma.type.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TypeFindFirstOrThrowArgs>(args?: SelectSubset<T, TypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Types that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Types
     * const types = await prisma.type.findMany()
     * 
     * // Get first 10 Types
     * const types = await prisma.type.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const typeWithIdOnly = await prisma.type.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TypeFindManyArgs>(args?: SelectSubset<T, TypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Type.
     * @param {TypeCreateArgs} args - Arguments to create a Type.
     * @example
     * // Create one Type
     * const Type = await prisma.type.create({
     *   data: {
     *     // ... data to create a Type
     *   }
     * })
     * 
     */
    create<T extends TypeCreateArgs>(args: SelectSubset<T, TypeCreateArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Types.
     * @param {TypeCreateManyArgs} args - Arguments to create many Types.
     * @example
     * // Create many Types
     * const type = await prisma.type.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TypeCreateManyArgs>(args?: SelectSubset<T, TypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Types and returns the data saved in the database.
     * @param {TypeCreateManyAndReturnArgs} args - Arguments to create many Types.
     * @example
     * // Create many Types
     * const type = await prisma.type.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Types and only return the `id`
     * const typeWithIdOnly = await prisma.type.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TypeCreateManyAndReturnArgs>(args?: SelectSubset<T, TypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Type.
     * @param {TypeDeleteArgs} args - Arguments to delete one Type.
     * @example
     * // Delete one Type
     * const Type = await prisma.type.delete({
     *   where: {
     *     // ... filter to delete one Type
     *   }
     * })
     * 
     */
    delete<T extends TypeDeleteArgs>(args: SelectSubset<T, TypeDeleteArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Type.
     * @param {TypeUpdateArgs} args - Arguments to update one Type.
     * @example
     * // Update one Type
     * const type = await prisma.type.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TypeUpdateArgs>(args: SelectSubset<T, TypeUpdateArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Types.
     * @param {TypeDeleteManyArgs} args - Arguments to filter Types to delete.
     * @example
     * // Delete a few Types
     * const { count } = await prisma.type.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TypeDeleteManyArgs>(args?: SelectSubset<T, TypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Types
     * const type = await prisma.type.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TypeUpdateManyArgs>(args: SelectSubset<T, TypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Types and returns the data updated in the database.
     * @param {TypeUpdateManyAndReturnArgs} args - Arguments to update many Types.
     * @example
     * // Update many Types
     * const type = await prisma.type.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Types and only return the `id`
     * const typeWithIdOnly = await prisma.type.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TypeUpdateManyAndReturnArgs>(args: SelectSubset<T, TypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Type.
     * @param {TypeUpsertArgs} args - Arguments to update or create a Type.
     * @example
     * // Update or create a Type
     * const type = await prisma.type.upsert({
     *   create: {
     *     // ... data to create a Type
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Type we want to update
     *   }
     * })
     */
    upsert<T extends TypeUpsertArgs>(args: SelectSubset<T, TypeUpsertArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Types.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeCountArgs} args - Arguments to filter Types to count.
     * @example
     * // Count the number of Types
     * const count = await prisma.type.count({
     *   where: {
     *     // ... the filter for the Types we want to count
     *   }
     * })
    **/
    count<T extends TypeCountArgs>(
      args?: Subset<T, TypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TypeAggregateArgs>(args: Subset<T, TypeAggregateArgs>): Prisma.PrismaPromise<GetTypeAggregateType<T>>

    /**
     * Group by Type.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TypeGroupByArgs['orderBy'] }
        : { orderBy?: TypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Type model
   */
  readonly fields: TypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Type.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    textTypes<T extends Type$textTypesArgs<ExtArgs> = {}>(args?: Subset<T, Type$textTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Type model
   */
  interface TypeFieldRefs {
    readonly id: FieldRef<"Type", 'Int'>
    readonly name: FieldRef<"Type", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Type findUnique
   */
  export type TypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter, which Type to fetch.
     */
    where: TypeWhereUniqueInput
  }

  /**
   * Type findUniqueOrThrow
   */
  export type TypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter, which Type to fetch.
     */
    where: TypeWhereUniqueInput
  }

  /**
   * Type findFirst
   */
  export type TypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter, which Type to fetch.
     */
    where?: TypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Types to fetch.
     */
    orderBy?: TypeOrderByWithRelationInput | TypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Types.
     */
    cursor?: TypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Types.
     */
    distinct?: TypeScalarFieldEnum | TypeScalarFieldEnum[]
  }

  /**
   * Type findFirstOrThrow
   */
  export type TypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter, which Type to fetch.
     */
    where?: TypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Types to fetch.
     */
    orderBy?: TypeOrderByWithRelationInput | TypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Types.
     */
    cursor?: TypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Types.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Types.
     */
    distinct?: TypeScalarFieldEnum | TypeScalarFieldEnum[]
  }

  /**
   * Type findMany
   */
  export type TypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter, which Types to fetch.
     */
    where?: TypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Types to fetch.
     */
    orderBy?: TypeOrderByWithRelationInput | TypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Types.
     */
    cursor?: TypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Types from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Types.
     */
    skip?: number
    distinct?: TypeScalarFieldEnum | TypeScalarFieldEnum[]
  }

  /**
   * Type create
   */
  export type TypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * The data needed to create a Type.
     */
    data: XOR<TypeCreateInput, TypeUncheckedCreateInput>
  }

  /**
   * Type createMany
   */
  export type TypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Types.
     */
    data: TypeCreateManyInput | TypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Type createManyAndReturn
   */
  export type TypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * The data used to create many Types.
     */
    data: TypeCreateManyInput | TypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Type update
   */
  export type TypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * The data needed to update a Type.
     */
    data: XOR<TypeUpdateInput, TypeUncheckedUpdateInput>
    /**
     * Choose, which Type to update.
     */
    where: TypeWhereUniqueInput
  }

  /**
   * Type updateMany
   */
  export type TypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Types.
     */
    data: XOR<TypeUpdateManyMutationInput, TypeUncheckedUpdateManyInput>
    /**
     * Filter which Types to update
     */
    where?: TypeWhereInput
    /**
     * Limit how many Types to update.
     */
    limit?: number
  }

  /**
   * Type updateManyAndReturn
   */
  export type TypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * The data used to update Types.
     */
    data: XOR<TypeUpdateManyMutationInput, TypeUncheckedUpdateManyInput>
    /**
     * Filter which Types to update
     */
    where?: TypeWhereInput
    /**
     * Limit how many Types to update.
     */
    limit?: number
  }

  /**
   * Type upsert
   */
  export type TypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * The filter to search for the Type to update in case it exists.
     */
    where: TypeWhereUniqueInput
    /**
     * In case the Type found by the `where` argument doesn't exist, create a new Type with this data.
     */
    create: XOR<TypeCreateInput, TypeUncheckedCreateInput>
    /**
     * In case the Type was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TypeUpdateInput, TypeUncheckedUpdateInput>
  }

  /**
   * Type delete
   */
  export type TypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
    /**
     * Filter which Type to delete.
     */
    where: TypeWhereUniqueInput
  }

  /**
   * Type deleteMany
   */
  export type TypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Types to delete
     */
    where?: TypeWhereInput
    /**
     * Limit how many Types to delete.
     */
    limit?: number
  }

  /**
   * Type.textTypes
   */
  export type Type$textTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    where?: TextTypeWhereInput
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    cursor?: TextTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TextTypeScalarFieldEnum | TextTypeScalarFieldEnum[]
  }

  /**
   * Type without action
   */
  export type TypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Type
     */
    select?: TypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Type
     */
    omit?: TypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TypeInclude<ExtArgs> | null
  }


  /**
   * Model TextType
   */

  export type AggregateTextType = {
    _count: TextTypeCountAggregateOutputType | null
    _avg: TextTypeAvgAggregateOutputType | null
    _sum: TextTypeSumAggregateOutputType | null
    _min: TextTypeMinAggregateOutputType | null
    _max: TextTypeMaxAggregateOutputType | null
  }

  export type TextTypeAvgAggregateOutputType = {
    textId: number | null
    typeId: number | null
  }

  export type TextTypeSumAggregateOutputType = {
    textId: number | null
    typeId: number | null
  }

  export type TextTypeMinAggregateOutputType = {
    textId: number | null
    typeId: number | null
  }

  export type TextTypeMaxAggregateOutputType = {
    textId: number | null
    typeId: number | null
  }

  export type TextTypeCountAggregateOutputType = {
    textId: number
    typeId: number
    _all: number
  }


  export type TextTypeAvgAggregateInputType = {
    textId?: true
    typeId?: true
  }

  export type TextTypeSumAggregateInputType = {
    textId?: true
    typeId?: true
  }

  export type TextTypeMinAggregateInputType = {
    textId?: true
    typeId?: true
  }

  export type TextTypeMaxAggregateInputType = {
    textId?: true
    typeId?: true
  }

  export type TextTypeCountAggregateInputType = {
    textId?: true
    typeId?: true
    _all?: true
  }

  export type TextTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TextType to aggregate.
     */
    where?: TextTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextTypes to fetch.
     */
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TextTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TextTypes
    **/
    _count?: true | TextTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TextTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TextTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TextTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TextTypeMaxAggregateInputType
  }

  export type GetTextTypeAggregateType<T extends TextTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateTextType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTextType[P]>
      : GetScalarType<T[P], AggregateTextType[P]>
  }




  export type TextTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TextTypeWhereInput
    orderBy?: TextTypeOrderByWithAggregationInput | TextTypeOrderByWithAggregationInput[]
    by: TextTypeScalarFieldEnum[] | TextTypeScalarFieldEnum
    having?: TextTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TextTypeCountAggregateInputType | true
    _avg?: TextTypeAvgAggregateInputType
    _sum?: TextTypeSumAggregateInputType
    _min?: TextTypeMinAggregateInputType
    _max?: TextTypeMaxAggregateInputType
  }

  export type TextTypeGroupByOutputType = {
    textId: number
    typeId: number
    _count: TextTypeCountAggregateOutputType | null
    _avg: TextTypeAvgAggregateOutputType | null
    _sum: TextTypeSumAggregateOutputType | null
    _min: TextTypeMinAggregateOutputType | null
    _max: TextTypeMaxAggregateOutputType | null
  }

  type GetTextTypeGroupByPayload<T extends TextTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TextTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TextTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TextTypeGroupByOutputType[P]>
            : GetScalarType<T[P], TextTypeGroupByOutputType[P]>
        }
      >
    >


  export type TextTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    textId?: boolean
    typeId?: boolean
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textType"]>

  export type TextTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    textId?: boolean
    typeId?: boolean
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textType"]>

  export type TextTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    textId?: boolean
    typeId?: boolean
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["textType"]>

  export type TextTypeSelectScalar = {
    textId?: boolean
    typeId?: boolean
  }

  export type TextTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"textId" | "typeId", ExtArgs["result"]["textType"]>
  export type TextTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }
  export type TextTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }
  export type TextTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    text?: boolean | TextDefaultArgs<ExtArgs>
    type?: boolean | TypeDefaultArgs<ExtArgs>
  }

  export type $TextTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TextType"
    objects: {
      text: Prisma.$TextPayload<ExtArgs>
      type: Prisma.$TypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      textId: number
      typeId: number
    }, ExtArgs["result"]["textType"]>
    composites: {}
  }

  type TextTypeGetPayload<S extends boolean | null | undefined | TextTypeDefaultArgs> = $Result.GetResult<Prisma.$TextTypePayload, S>

  type TextTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TextTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TextTypeCountAggregateInputType | true
    }

  export interface TextTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TextType'], meta: { name: 'TextType' } }
    /**
     * Find zero or one TextType that matches the filter.
     * @param {TextTypeFindUniqueArgs} args - Arguments to find a TextType
     * @example
     * // Get one TextType
     * const textType = await prisma.textType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TextTypeFindUniqueArgs>(args: SelectSubset<T, TextTypeFindUniqueArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TextType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TextTypeFindUniqueOrThrowArgs} args - Arguments to find a TextType
     * @example
     * // Get one TextType
     * const textType = await prisma.textType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TextTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, TextTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TextType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeFindFirstArgs} args - Arguments to find a TextType
     * @example
     * // Get one TextType
     * const textType = await prisma.textType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TextTypeFindFirstArgs>(args?: SelectSubset<T, TextTypeFindFirstArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TextType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeFindFirstOrThrowArgs} args - Arguments to find a TextType
     * @example
     * // Get one TextType
     * const textType = await prisma.textType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TextTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, TextTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TextTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TextTypes
     * const textTypes = await prisma.textType.findMany()
     * 
     * // Get first 10 TextTypes
     * const textTypes = await prisma.textType.findMany({ take: 10 })
     * 
     * // Only select the `textId`
     * const textTypeWithTextIdOnly = await prisma.textType.findMany({ select: { textId: true } })
     * 
     */
    findMany<T extends TextTypeFindManyArgs>(args?: SelectSubset<T, TextTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TextType.
     * @param {TextTypeCreateArgs} args - Arguments to create a TextType.
     * @example
     * // Create one TextType
     * const TextType = await prisma.textType.create({
     *   data: {
     *     // ... data to create a TextType
     *   }
     * })
     * 
     */
    create<T extends TextTypeCreateArgs>(args: SelectSubset<T, TextTypeCreateArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TextTypes.
     * @param {TextTypeCreateManyArgs} args - Arguments to create many TextTypes.
     * @example
     * // Create many TextTypes
     * const textType = await prisma.textType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TextTypeCreateManyArgs>(args?: SelectSubset<T, TextTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TextTypes and returns the data saved in the database.
     * @param {TextTypeCreateManyAndReturnArgs} args - Arguments to create many TextTypes.
     * @example
     * // Create many TextTypes
     * const textType = await prisma.textType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TextTypes and only return the `textId`
     * const textTypeWithTextIdOnly = await prisma.textType.createManyAndReturn({
     *   select: { textId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TextTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, TextTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TextType.
     * @param {TextTypeDeleteArgs} args - Arguments to delete one TextType.
     * @example
     * // Delete one TextType
     * const TextType = await prisma.textType.delete({
     *   where: {
     *     // ... filter to delete one TextType
     *   }
     * })
     * 
     */
    delete<T extends TextTypeDeleteArgs>(args: SelectSubset<T, TextTypeDeleteArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TextType.
     * @param {TextTypeUpdateArgs} args - Arguments to update one TextType.
     * @example
     * // Update one TextType
     * const textType = await prisma.textType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TextTypeUpdateArgs>(args: SelectSubset<T, TextTypeUpdateArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TextTypes.
     * @param {TextTypeDeleteManyArgs} args - Arguments to filter TextTypes to delete.
     * @example
     * // Delete a few TextTypes
     * const { count } = await prisma.textType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TextTypeDeleteManyArgs>(args?: SelectSubset<T, TextTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TextTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TextTypes
     * const textType = await prisma.textType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TextTypeUpdateManyArgs>(args: SelectSubset<T, TextTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TextTypes and returns the data updated in the database.
     * @param {TextTypeUpdateManyAndReturnArgs} args - Arguments to update many TextTypes.
     * @example
     * // Update many TextTypes
     * const textType = await prisma.textType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TextTypes and only return the `textId`
     * const textTypeWithTextIdOnly = await prisma.textType.updateManyAndReturn({
     *   select: { textId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TextTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, TextTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TextType.
     * @param {TextTypeUpsertArgs} args - Arguments to update or create a TextType.
     * @example
     * // Update or create a TextType
     * const textType = await prisma.textType.upsert({
     *   create: {
     *     // ... data to create a TextType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TextType we want to update
     *   }
     * })
     */
    upsert<T extends TextTypeUpsertArgs>(args: SelectSubset<T, TextTypeUpsertArgs<ExtArgs>>): Prisma__TextTypeClient<$Result.GetResult<Prisma.$TextTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TextTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeCountArgs} args - Arguments to filter TextTypes to count.
     * @example
     * // Count the number of TextTypes
     * const count = await prisma.textType.count({
     *   where: {
     *     // ... the filter for the TextTypes we want to count
     *   }
     * })
    **/
    count<T extends TextTypeCountArgs>(
      args?: Subset<T, TextTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TextTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TextType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TextTypeAggregateArgs>(args: Subset<T, TextTypeAggregateArgs>): Prisma.PrismaPromise<GetTextTypeAggregateType<T>>

    /**
     * Group by TextType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TextTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TextTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TextTypeGroupByArgs['orderBy'] }
        : { orderBy?: TextTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TextTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTextTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TextType model
   */
  readonly fields: TextTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TextType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TextTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    text<T extends TextDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TextDefaultArgs<ExtArgs>>): Prisma__TextClient<$Result.GetResult<Prisma.$TextPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    type<T extends TypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TypeDefaultArgs<ExtArgs>>): Prisma__TypeClient<$Result.GetResult<Prisma.$TypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TextType model
   */
  interface TextTypeFieldRefs {
    readonly textId: FieldRef<"TextType", 'Int'>
    readonly typeId: FieldRef<"TextType", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TextType findUnique
   */
  export type TextTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter, which TextType to fetch.
     */
    where: TextTypeWhereUniqueInput
  }

  /**
   * TextType findUniqueOrThrow
   */
  export type TextTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter, which TextType to fetch.
     */
    where: TextTypeWhereUniqueInput
  }

  /**
   * TextType findFirst
   */
  export type TextTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter, which TextType to fetch.
     */
    where?: TextTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextTypes to fetch.
     */
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TextTypes.
     */
    cursor?: TextTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TextTypes.
     */
    distinct?: TextTypeScalarFieldEnum | TextTypeScalarFieldEnum[]
  }

  /**
   * TextType findFirstOrThrow
   */
  export type TextTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter, which TextType to fetch.
     */
    where?: TextTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextTypes to fetch.
     */
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TextTypes.
     */
    cursor?: TextTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TextTypes.
     */
    distinct?: TextTypeScalarFieldEnum | TextTypeScalarFieldEnum[]
  }

  /**
   * TextType findMany
   */
  export type TextTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter, which TextTypes to fetch.
     */
    where?: TextTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TextTypes to fetch.
     */
    orderBy?: TextTypeOrderByWithRelationInput | TextTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TextTypes.
     */
    cursor?: TextTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TextTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TextTypes.
     */
    skip?: number
    distinct?: TextTypeScalarFieldEnum | TextTypeScalarFieldEnum[]
  }

  /**
   * TextType create
   */
  export type TextTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a TextType.
     */
    data: XOR<TextTypeCreateInput, TextTypeUncheckedCreateInput>
  }

  /**
   * TextType createMany
   */
  export type TextTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TextTypes.
     */
    data: TextTypeCreateManyInput | TextTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TextType createManyAndReturn
   */
  export type TextTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * The data used to create many TextTypes.
     */
    data: TextTypeCreateManyInput | TextTypeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TextType update
   */
  export type TextTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a TextType.
     */
    data: XOR<TextTypeUpdateInput, TextTypeUncheckedUpdateInput>
    /**
     * Choose, which TextType to update.
     */
    where: TextTypeWhereUniqueInput
  }

  /**
   * TextType updateMany
   */
  export type TextTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TextTypes.
     */
    data: XOR<TextTypeUpdateManyMutationInput, TextTypeUncheckedUpdateManyInput>
    /**
     * Filter which TextTypes to update
     */
    where?: TextTypeWhereInput
    /**
     * Limit how many TextTypes to update.
     */
    limit?: number
  }

  /**
   * TextType updateManyAndReturn
   */
  export type TextTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * The data used to update TextTypes.
     */
    data: XOR<TextTypeUpdateManyMutationInput, TextTypeUncheckedUpdateManyInput>
    /**
     * Filter which TextTypes to update
     */
    where?: TextTypeWhereInput
    /**
     * Limit how many TextTypes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TextType upsert
   */
  export type TextTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the TextType to update in case it exists.
     */
    where: TextTypeWhereUniqueInput
    /**
     * In case the TextType found by the `where` argument doesn't exist, create a new TextType with this data.
     */
    create: XOR<TextTypeCreateInput, TextTypeUncheckedCreateInput>
    /**
     * In case the TextType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TextTypeUpdateInput, TextTypeUncheckedUpdateInput>
  }

  /**
   * TextType delete
   */
  export type TextTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
    /**
     * Filter which TextType to delete.
     */
    where: TextTypeWhereUniqueInput
  }

  /**
   * TextType deleteMany
   */
  export type TextTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TextTypes to delete
     */
    where?: TextTypeWhereInput
    /**
     * Limit how many TextTypes to delete.
     */
    limit?: number
  }

  /**
   * TextType without action
   */
  export type TextTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TextType
     */
    select?: TextTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TextType
     */
    omit?: TextTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TextTypeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DynastyScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type DynastyScalarFieldEnum = (typeof DynastyScalarFieldEnum)[keyof typeof DynastyScalarFieldEnum]


  export const AuthorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    introduction: 'introduction',
    dynastyId: 'dynastyId'
  };

  export type AuthorScalarFieldEnum = (typeof AuthorScalarFieldEnum)[keyof typeof AuthorScalarFieldEnum]


  export const TextScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    contentHash: 'contentHash',
    annotation: 'annotation',
    comments: 'comments',
    translation: 'translation',
    authorId: 'authorId',
    dynastyId: 'dynastyId'
  };

  export type TextScalarFieldEnum = (typeof TextScalarFieldEnum)[keyof typeof TextScalarFieldEnum]


  export const TypeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TypeScalarFieldEnum = (typeof TypeScalarFieldEnum)[keyof typeof TypeScalarFieldEnum]


  export const TextTypeScalarFieldEnum: {
    textId: 'textId',
    typeId: 'typeId'
  };

  export type TextTypeScalarFieldEnum = (typeof TextTypeScalarFieldEnum)[keyof typeof TextTypeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DynastyWhereInput = {
    AND?: DynastyWhereInput | DynastyWhereInput[]
    OR?: DynastyWhereInput[]
    NOT?: DynastyWhereInput | DynastyWhereInput[]
    id?: IntFilter<"Dynasty"> | number
    name?: StringFilter<"Dynasty"> | string
    authors?: AuthorListRelationFilter
    texts?: TextListRelationFilter
  }

  export type DynastyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    authors?: AuthorOrderByRelationAggregateInput
    texts?: TextOrderByRelationAggregateInput
  }

  export type DynastyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: DynastyWhereInput | DynastyWhereInput[]
    OR?: DynastyWhereInput[]
    NOT?: DynastyWhereInput | DynastyWhereInput[]
    authors?: AuthorListRelationFilter
    texts?: TextListRelationFilter
  }, "id" | "name">

  export type DynastyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: DynastyCountOrderByAggregateInput
    _avg?: DynastyAvgOrderByAggregateInput
    _max?: DynastyMaxOrderByAggregateInput
    _min?: DynastyMinOrderByAggregateInput
    _sum?: DynastySumOrderByAggregateInput
  }

  export type DynastyScalarWhereWithAggregatesInput = {
    AND?: DynastyScalarWhereWithAggregatesInput | DynastyScalarWhereWithAggregatesInput[]
    OR?: DynastyScalarWhereWithAggregatesInput[]
    NOT?: DynastyScalarWhereWithAggregatesInput | DynastyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Dynasty"> | number
    name?: StringWithAggregatesFilter<"Dynasty"> | string
  }

  export type AuthorWhereInput = {
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    id?: IntFilter<"Author"> | number
    name?: StringFilter<"Author"> | string
    introduction?: StringNullableFilter<"Author"> | string | null
    dynastyId?: IntNullableFilter<"Author"> | number | null
    dynasty?: XOR<DynastyNullableScalarRelationFilter, DynastyWhereInput> | null
    texts?: TextListRelationFilter
  }

  export type AuthorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    introduction?: SortOrderInput | SortOrder
    dynastyId?: SortOrderInput | SortOrder
    dynasty?: DynastyOrderByWithRelationInput
    texts?: TextOrderByRelationAggregateInput
  }

  export type AuthorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AuthorWhereInput | AuthorWhereInput[]
    OR?: AuthorWhereInput[]
    NOT?: AuthorWhereInput | AuthorWhereInput[]
    introduction?: StringNullableFilter<"Author"> | string | null
    dynastyId?: IntNullableFilter<"Author"> | number | null
    dynasty?: XOR<DynastyNullableScalarRelationFilter, DynastyWhereInput> | null
    texts?: TextListRelationFilter
  }, "id" | "name">

  export type AuthorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    introduction?: SortOrderInput | SortOrder
    dynastyId?: SortOrderInput | SortOrder
    _count?: AuthorCountOrderByAggregateInput
    _avg?: AuthorAvgOrderByAggregateInput
    _max?: AuthorMaxOrderByAggregateInput
    _min?: AuthorMinOrderByAggregateInput
    _sum?: AuthorSumOrderByAggregateInput
  }

  export type AuthorScalarWhereWithAggregatesInput = {
    AND?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    OR?: AuthorScalarWhereWithAggregatesInput[]
    NOT?: AuthorScalarWhereWithAggregatesInput | AuthorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Author"> | number
    name?: StringWithAggregatesFilter<"Author"> | string
    introduction?: StringNullableWithAggregatesFilter<"Author"> | string | null
    dynastyId?: IntNullableWithAggregatesFilter<"Author"> | number | null
  }

  export type TextWhereInput = {
    AND?: TextWhereInput | TextWhereInput[]
    OR?: TextWhereInput[]
    NOT?: TextWhereInput | TextWhereInput[]
    id?: IntFilter<"Text"> | number
    title?: StringFilter<"Text"> | string
    content?: StringFilter<"Text"> | string
    contentHash?: StringFilter<"Text"> | string
    annotation?: StringNullableFilter<"Text"> | string | null
    comments?: StringNullableFilter<"Text"> | string | null
    translation?: StringNullableFilter<"Text"> | string | null
    authorId?: IntFilter<"Text"> | number
    dynastyId?: IntFilter<"Text"> | number
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
    dynasty?: XOR<DynastyScalarRelationFilter, DynastyWhereInput>
    textTypes?: TextTypeListRelationFilter
  }

  export type TextOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    contentHash?: SortOrder
    annotation?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    translation?: SortOrderInput | SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
    author?: AuthorOrderByWithRelationInput
    dynasty?: DynastyOrderByWithRelationInput
    textTypes?: TextTypeOrderByRelationAggregateInput
  }

  export type TextWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    contentHash?: string
    AND?: TextWhereInput | TextWhereInput[]
    OR?: TextWhereInput[]
    NOT?: TextWhereInput | TextWhereInput[]
    title?: StringFilter<"Text"> | string
    content?: StringFilter<"Text"> | string
    annotation?: StringNullableFilter<"Text"> | string | null
    comments?: StringNullableFilter<"Text"> | string | null
    translation?: StringNullableFilter<"Text"> | string | null
    authorId?: IntFilter<"Text"> | number
    dynastyId?: IntFilter<"Text"> | number
    author?: XOR<AuthorScalarRelationFilter, AuthorWhereInput>
    dynasty?: XOR<DynastyScalarRelationFilter, DynastyWhereInput>
    textTypes?: TextTypeListRelationFilter
  }, "id" | "contentHash">

  export type TextOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    contentHash?: SortOrder
    annotation?: SortOrderInput | SortOrder
    comments?: SortOrderInput | SortOrder
    translation?: SortOrderInput | SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
    _count?: TextCountOrderByAggregateInput
    _avg?: TextAvgOrderByAggregateInput
    _max?: TextMaxOrderByAggregateInput
    _min?: TextMinOrderByAggregateInput
    _sum?: TextSumOrderByAggregateInput
  }

  export type TextScalarWhereWithAggregatesInput = {
    AND?: TextScalarWhereWithAggregatesInput | TextScalarWhereWithAggregatesInput[]
    OR?: TextScalarWhereWithAggregatesInput[]
    NOT?: TextScalarWhereWithAggregatesInput | TextScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Text"> | number
    title?: StringWithAggregatesFilter<"Text"> | string
    content?: StringWithAggregatesFilter<"Text"> | string
    contentHash?: StringWithAggregatesFilter<"Text"> | string
    annotation?: StringNullableWithAggregatesFilter<"Text"> | string | null
    comments?: StringNullableWithAggregatesFilter<"Text"> | string | null
    translation?: StringNullableWithAggregatesFilter<"Text"> | string | null
    authorId?: IntWithAggregatesFilter<"Text"> | number
    dynastyId?: IntWithAggregatesFilter<"Text"> | number
  }

  export type TypeWhereInput = {
    AND?: TypeWhereInput | TypeWhereInput[]
    OR?: TypeWhereInput[]
    NOT?: TypeWhereInput | TypeWhereInput[]
    id?: IntFilter<"Type"> | number
    name?: StringFilter<"Type"> | string
    textTypes?: TextTypeListRelationFilter
  }

  export type TypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    textTypes?: TextTypeOrderByRelationAggregateInput
  }

  export type TypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TypeWhereInput | TypeWhereInput[]
    OR?: TypeWhereInput[]
    NOT?: TypeWhereInput | TypeWhereInput[]
    textTypes?: TextTypeListRelationFilter
  }, "id" | "name">

  export type TypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TypeCountOrderByAggregateInput
    _avg?: TypeAvgOrderByAggregateInput
    _max?: TypeMaxOrderByAggregateInput
    _min?: TypeMinOrderByAggregateInput
    _sum?: TypeSumOrderByAggregateInput
  }

  export type TypeScalarWhereWithAggregatesInput = {
    AND?: TypeScalarWhereWithAggregatesInput | TypeScalarWhereWithAggregatesInput[]
    OR?: TypeScalarWhereWithAggregatesInput[]
    NOT?: TypeScalarWhereWithAggregatesInput | TypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Type"> | number
    name?: StringWithAggregatesFilter<"Type"> | string
  }

  export type TextTypeWhereInput = {
    AND?: TextTypeWhereInput | TextTypeWhereInput[]
    OR?: TextTypeWhereInput[]
    NOT?: TextTypeWhereInput | TextTypeWhereInput[]
    textId?: IntFilter<"TextType"> | number
    typeId?: IntFilter<"TextType"> | number
    text?: XOR<TextScalarRelationFilter, TextWhereInput>
    type?: XOR<TypeScalarRelationFilter, TypeWhereInput>
  }

  export type TextTypeOrderByWithRelationInput = {
    textId?: SortOrder
    typeId?: SortOrder
    text?: TextOrderByWithRelationInput
    type?: TypeOrderByWithRelationInput
  }

  export type TextTypeWhereUniqueInput = Prisma.AtLeast<{
    textId_typeId?: TextTypeTextIdTypeIdCompoundUniqueInput
    AND?: TextTypeWhereInput | TextTypeWhereInput[]
    OR?: TextTypeWhereInput[]
    NOT?: TextTypeWhereInput | TextTypeWhereInput[]
    textId?: IntFilter<"TextType"> | number
    typeId?: IntFilter<"TextType"> | number
    text?: XOR<TextScalarRelationFilter, TextWhereInput>
    type?: XOR<TypeScalarRelationFilter, TypeWhereInput>
  }, "textId_typeId">

  export type TextTypeOrderByWithAggregationInput = {
    textId?: SortOrder
    typeId?: SortOrder
    _count?: TextTypeCountOrderByAggregateInput
    _avg?: TextTypeAvgOrderByAggregateInput
    _max?: TextTypeMaxOrderByAggregateInput
    _min?: TextTypeMinOrderByAggregateInput
    _sum?: TextTypeSumOrderByAggregateInput
  }

  export type TextTypeScalarWhereWithAggregatesInput = {
    AND?: TextTypeScalarWhereWithAggregatesInput | TextTypeScalarWhereWithAggregatesInput[]
    OR?: TextTypeScalarWhereWithAggregatesInput[]
    NOT?: TextTypeScalarWhereWithAggregatesInput | TextTypeScalarWhereWithAggregatesInput[]
    textId?: IntWithAggregatesFilter<"TextType"> | number
    typeId?: IntWithAggregatesFilter<"TextType"> | number
  }

  export type DynastyCreateInput = {
    name: string
    authors?: AuthorCreateNestedManyWithoutDynastyInput
    texts?: TextCreateNestedManyWithoutDynastyInput
  }

  export type DynastyUncheckedCreateInput = {
    id?: number
    name: string
    authors?: AuthorUncheckedCreateNestedManyWithoutDynastyInput
    texts?: TextUncheckedCreateNestedManyWithoutDynastyInput
  }

  export type DynastyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    authors?: AuthorUpdateManyWithoutDynastyNestedInput
    texts?: TextUpdateManyWithoutDynastyNestedInput
  }

  export type DynastyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    authors?: AuthorUncheckedUpdateManyWithoutDynastyNestedInput
    texts?: TextUncheckedUpdateManyWithoutDynastyNestedInput
  }

  export type DynastyCreateManyInput = {
    id?: number
    name: string
  }

  export type DynastyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DynastyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AuthorCreateInput = {
    name: string
    introduction?: string | null
    dynasty?: DynastyCreateNestedOneWithoutAuthorsInput
    texts?: TextCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateInput = {
    id?: number
    name: string
    introduction?: string | null
    dynastyId?: number | null
    texts?: TextUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    dynasty?: DynastyUpdateOneWithoutAuthorsNestedInput
    texts?: TextUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    dynastyId?: NullableIntFieldUpdateOperationsInput | number | null
    texts?: TextUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorCreateManyInput = {
    id?: number
    name: string
    introduction?: string | null
    dynastyId?: number | null
  }

  export type AuthorUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    dynastyId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TextCreateInput = {
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    author: AuthorCreateNestedOneWithoutTextsInput
    dynasty: DynastyCreateNestedOneWithoutTextsInput
    textTypes?: TextTypeCreateNestedManyWithoutTextInput
  }

  export type TextUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    authorId: number
    dynastyId: number
    textTypes?: TextTypeUncheckedCreateNestedManyWithoutTextInput
  }

  export type TextUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    author?: AuthorUpdateOneRequiredWithoutTextsNestedInput
    dynasty?: DynastyUpdateOneRequiredWithoutTextsNestedInput
    textTypes?: TextTypeUpdateManyWithoutTextNestedInput
  }

  export type TextUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    dynastyId?: IntFieldUpdateOperationsInput | number
    textTypes?: TextTypeUncheckedUpdateManyWithoutTextNestedInput
  }

  export type TextCreateManyInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    authorId: number
    dynastyId: number
  }

  export type TextUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TextUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    dynastyId?: IntFieldUpdateOperationsInput | number
  }

  export type TypeCreateInput = {
    name: string
    textTypes?: TextTypeCreateNestedManyWithoutTypeInput
  }

  export type TypeUncheckedCreateInput = {
    id?: number
    name: string
    textTypes?: TextTypeUncheckedCreateNestedManyWithoutTypeInput
  }

  export type TypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    textTypes?: TextTypeUpdateManyWithoutTypeNestedInput
  }

  export type TypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    textTypes?: TextTypeUncheckedUpdateManyWithoutTypeNestedInput
  }

  export type TypeCreateManyInput = {
    id?: number
    name: string
  }

  export type TypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TextTypeCreateInput = {
    text: TextCreateNestedOneWithoutTextTypesInput
    type: TypeCreateNestedOneWithoutTextTypesInput
  }

  export type TextTypeUncheckedCreateInput = {
    textId: number
    typeId: number
  }

  export type TextTypeUpdateInput = {
    text?: TextUpdateOneRequiredWithoutTextTypesNestedInput
    type?: TypeUpdateOneRequiredWithoutTextTypesNestedInput
  }

  export type TextTypeUncheckedUpdateInput = {
    textId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type TextTypeCreateManyInput = {
    textId: number
    typeId: number
  }

  export type TextTypeUpdateManyMutationInput = {

  }

  export type TextTypeUncheckedUpdateManyInput = {
    textId?: IntFieldUpdateOperationsInput | number
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type AuthorListRelationFilter = {
    every?: AuthorWhereInput
    some?: AuthorWhereInput
    none?: AuthorWhereInput
  }

  export type TextListRelationFilter = {
    every?: TextWhereInput
    some?: TextWhereInput
    none?: TextWhereInput
  }

  export type AuthorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TextOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DynastyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DynastyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DynastyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DynastyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DynastySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DynastyNullableScalarRelationFilter = {
    is?: DynastyWhereInput | null
    isNot?: DynastyWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    introduction?: SortOrder
    dynastyId?: SortOrder
  }

  export type AuthorAvgOrderByAggregateInput = {
    id?: SortOrder
    dynastyId?: SortOrder
  }

  export type AuthorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    introduction?: SortOrder
    dynastyId?: SortOrder
  }

  export type AuthorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    introduction?: SortOrder
    dynastyId?: SortOrder
  }

  export type AuthorSumOrderByAggregateInput = {
    id?: SortOrder
    dynastyId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AuthorScalarRelationFilter = {
    is?: AuthorWhereInput
    isNot?: AuthorWhereInput
  }

  export type DynastyScalarRelationFilter = {
    is?: DynastyWhereInput
    isNot?: DynastyWhereInput
  }

  export type TextTypeListRelationFilter = {
    every?: TextTypeWhereInput
    some?: TextTypeWhereInput
    none?: TextTypeWhereInput
  }

  export type TextTypeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TextCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    contentHash?: SortOrder
    annotation?: SortOrder
    comments?: SortOrder
    translation?: SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
  }

  export type TextAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
  }

  export type TextMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    contentHash?: SortOrder
    annotation?: SortOrder
    comments?: SortOrder
    translation?: SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
  }

  export type TextMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    contentHash?: SortOrder
    annotation?: SortOrder
    comments?: SortOrder
    translation?: SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
  }

  export type TextSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    dynastyId?: SortOrder
  }

  export type TypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TextScalarRelationFilter = {
    is?: TextWhereInput
    isNot?: TextWhereInput
  }

  export type TypeScalarRelationFilter = {
    is?: TypeWhereInput
    isNot?: TypeWhereInput
  }

  export type TextTypeTextIdTypeIdCompoundUniqueInput = {
    textId: number
    typeId: number
  }

  export type TextTypeCountOrderByAggregateInput = {
    textId?: SortOrder
    typeId?: SortOrder
  }

  export type TextTypeAvgOrderByAggregateInput = {
    textId?: SortOrder
    typeId?: SortOrder
  }

  export type TextTypeMaxOrderByAggregateInput = {
    textId?: SortOrder
    typeId?: SortOrder
  }

  export type TextTypeMinOrderByAggregateInput = {
    textId?: SortOrder
    typeId?: SortOrder
  }

  export type TextTypeSumOrderByAggregateInput = {
    textId?: SortOrder
    typeId?: SortOrder
  }

  export type AuthorCreateNestedManyWithoutDynastyInput = {
    create?: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput> | AuthorCreateWithoutDynastyInput[] | AuthorUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: AuthorCreateOrConnectWithoutDynastyInput | AuthorCreateOrConnectWithoutDynastyInput[]
    createMany?: AuthorCreateManyDynastyInputEnvelope
    connect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
  }

  export type TextCreateNestedManyWithoutDynastyInput = {
    create?: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput> | TextCreateWithoutDynastyInput[] | TextUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: TextCreateOrConnectWithoutDynastyInput | TextCreateOrConnectWithoutDynastyInput[]
    createMany?: TextCreateManyDynastyInputEnvelope
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
  }

  export type AuthorUncheckedCreateNestedManyWithoutDynastyInput = {
    create?: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput> | AuthorCreateWithoutDynastyInput[] | AuthorUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: AuthorCreateOrConnectWithoutDynastyInput | AuthorCreateOrConnectWithoutDynastyInput[]
    createMany?: AuthorCreateManyDynastyInputEnvelope
    connect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
  }

  export type TextUncheckedCreateNestedManyWithoutDynastyInput = {
    create?: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput> | TextCreateWithoutDynastyInput[] | TextUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: TextCreateOrConnectWithoutDynastyInput | TextCreateOrConnectWithoutDynastyInput[]
    createMany?: TextCreateManyDynastyInputEnvelope
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type AuthorUpdateManyWithoutDynastyNestedInput = {
    create?: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput> | AuthorCreateWithoutDynastyInput[] | AuthorUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: AuthorCreateOrConnectWithoutDynastyInput | AuthorCreateOrConnectWithoutDynastyInput[]
    upsert?: AuthorUpsertWithWhereUniqueWithoutDynastyInput | AuthorUpsertWithWhereUniqueWithoutDynastyInput[]
    createMany?: AuthorCreateManyDynastyInputEnvelope
    set?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    disconnect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    delete?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    connect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    update?: AuthorUpdateWithWhereUniqueWithoutDynastyInput | AuthorUpdateWithWhereUniqueWithoutDynastyInput[]
    updateMany?: AuthorUpdateManyWithWhereWithoutDynastyInput | AuthorUpdateManyWithWhereWithoutDynastyInput[]
    deleteMany?: AuthorScalarWhereInput | AuthorScalarWhereInput[]
  }

  export type TextUpdateManyWithoutDynastyNestedInput = {
    create?: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput> | TextCreateWithoutDynastyInput[] | TextUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: TextCreateOrConnectWithoutDynastyInput | TextCreateOrConnectWithoutDynastyInput[]
    upsert?: TextUpsertWithWhereUniqueWithoutDynastyInput | TextUpsertWithWhereUniqueWithoutDynastyInput[]
    createMany?: TextCreateManyDynastyInputEnvelope
    set?: TextWhereUniqueInput | TextWhereUniqueInput[]
    disconnect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    delete?: TextWhereUniqueInput | TextWhereUniqueInput[]
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    update?: TextUpdateWithWhereUniqueWithoutDynastyInput | TextUpdateWithWhereUniqueWithoutDynastyInput[]
    updateMany?: TextUpdateManyWithWhereWithoutDynastyInput | TextUpdateManyWithWhereWithoutDynastyInput[]
    deleteMany?: TextScalarWhereInput | TextScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AuthorUncheckedUpdateManyWithoutDynastyNestedInput = {
    create?: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput> | AuthorCreateWithoutDynastyInput[] | AuthorUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: AuthorCreateOrConnectWithoutDynastyInput | AuthorCreateOrConnectWithoutDynastyInput[]
    upsert?: AuthorUpsertWithWhereUniqueWithoutDynastyInput | AuthorUpsertWithWhereUniqueWithoutDynastyInput[]
    createMany?: AuthorCreateManyDynastyInputEnvelope
    set?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    disconnect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    delete?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    connect?: AuthorWhereUniqueInput | AuthorWhereUniqueInput[]
    update?: AuthorUpdateWithWhereUniqueWithoutDynastyInput | AuthorUpdateWithWhereUniqueWithoutDynastyInput[]
    updateMany?: AuthorUpdateManyWithWhereWithoutDynastyInput | AuthorUpdateManyWithWhereWithoutDynastyInput[]
    deleteMany?: AuthorScalarWhereInput | AuthorScalarWhereInput[]
  }

  export type TextUncheckedUpdateManyWithoutDynastyNestedInput = {
    create?: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput> | TextCreateWithoutDynastyInput[] | TextUncheckedCreateWithoutDynastyInput[]
    connectOrCreate?: TextCreateOrConnectWithoutDynastyInput | TextCreateOrConnectWithoutDynastyInput[]
    upsert?: TextUpsertWithWhereUniqueWithoutDynastyInput | TextUpsertWithWhereUniqueWithoutDynastyInput[]
    createMany?: TextCreateManyDynastyInputEnvelope
    set?: TextWhereUniqueInput | TextWhereUniqueInput[]
    disconnect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    delete?: TextWhereUniqueInput | TextWhereUniqueInput[]
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    update?: TextUpdateWithWhereUniqueWithoutDynastyInput | TextUpdateWithWhereUniqueWithoutDynastyInput[]
    updateMany?: TextUpdateManyWithWhereWithoutDynastyInput | TextUpdateManyWithWhereWithoutDynastyInput[]
    deleteMany?: TextScalarWhereInput | TextScalarWhereInput[]
  }

  export type DynastyCreateNestedOneWithoutAuthorsInput = {
    create?: XOR<DynastyCreateWithoutAuthorsInput, DynastyUncheckedCreateWithoutAuthorsInput>
    connectOrCreate?: DynastyCreateOrConnectWithoutAuthorsInput
    connect?: DynastyWhereUniqueInput
  }

  export type TextCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput> | TextCreateWithoutAuthorInput[] | TextUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TextCreateOrConnectWithoutAuthorInput | TextCreateOrConnectWithoutAuthorInput[]
    createMany?: TextCreateManyAuthorInputEnvelope
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
  }

  export type TextUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput> | TextCreateWithoutAuthorInput[] | TextUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TextCreateOrConnectWithoutAuthorInput | TextCreateOrConnectWithoutAuthorInput[]
    createMany?: TextCreateManyAuthorInputEnvelope
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DynastyUpdateOneWithoutAuthorsNestedInput = {
    create?: XOR<DynastyCreateWithoutAuthorsInput, DynastyUncheckedCreateWithoutAuthorsInput>
    connectOrCreate?: DynastyCreateOrConnectWithoutAuthorsInput
    upsert?: DynastyUpsertWithoutAuthorsInput
    disconnect?: DynastyWhereInput | boolean
    delete?: DynastyWhereInput | boolean
    connect?: DynastyWhereUniqueInput
    update?: XOR<XOR<DynastyUpdateToOneWithWhereWithoutAuthorsInput, DynastyUpdateWithoutAuthorsInput>, DynastyUncheckedUpdateWithoutAuthorsInput>
  }

  export type TextUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput> | TextCreateWithoutAuthorInput[] | TextUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TextCreateOrConnectWithoutAuthorInput | TextCreateOrConnectWithoutAuthorInput[]
    upsert?: TextUpsertWithWhereUniqueWithoutAuthorInput | TextUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TextCreateManyAuthorInputEnvelope
    set?: TextWhereUniqueInput | TextWhereUniqueInput[]
    disconnect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    delete?: TextWhereUniqueInput | TextWhereUniqueInput[]
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    update?: TextUpdateWithWhereUniqueWithoutAuthorInput | TextUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TextUpdateManyWithWhereWithoutAuthorInput | TextUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TextScalarWhereInput | TextScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TextUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput> | TextCreateWithoutAuthorInput[] | TextUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TextCreateOrConnectWithoutAuthorInput | TextCreateOrConnectWithoutAuthorInput[]
    upsert?: TextUpsertWithWhereUniqueWithoutAuthorInput | TextUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TextCreateManyAuthorInputEnvelope
    set?: TextWhereUniqueInput | TextWhereUniqueInput[]
    disconnect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    delete?: TextWhereUniqueInput | TextWhereUniqueInput[]
    connect?: TextWhereUniqueInput | TextWhereUniqueInput[]
    update?: TextUpdateWithWhereUniqueWithoutAuthorInput | TextUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TextUpdateManyWithWhereWithoutAuthorInput | TextUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TextScalarWhereInput | TextScalarWhereInput[]
  }

  export type AuthorCreateNestedOneWithoutTextsInput = {
    create?: XOR<AuthorCreateWithoutTextsInput, AuthorUncheckedCreateWithoutTextsInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutTextsInput
    connect?: AuthorWhereUniqueInput
  }

  export type DynastyCreateNestedOneWithoutTextsInput = {
    create?: XOR<DynastyCreateWithoutTextsInput, DynastyUncheckedCreateWithoutTextsInput>
    connectOrCreate?: DynastyCreateOrConnectWithoutTextsInput
    connect?: DynastyWhereUniqueInput
  }

  export type TextTypeCreateNestedManyWithoutTextInput = {
    create?: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput> | TextTypeCreateWithoutTextInput[] | TextTypeUncheckedCreateWithoutTextInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTextInput | TextTypeCreateOrConnectWithoutTextInput[]
    createMany?: TextTypeCreateManyTextInputEnvelope
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
  }

  export type TextTypeUncheckedCreateNestedManyWithoutTextInput = {
    create?: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput> | TextTypeCreateWithoutTextInput[] | TextTypeUncheckedCreateWithoutTextInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTextInput | TextTypeCreateOrConnectWithoutTextInput[]
    createMany?: TextTypeCreateManyTextInputEnvelope
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
  }

  export type AuthorUpdateOneRequiredWithoutTextsNestedInput = {
    create?: XOR<AuthorCreateWithoutTextsInput, AuthorUncheckedCreateWithoutTextsInput>
    connectOrCreate?: AuthorCreateOrConnectWithoutTextsInput
    upsert?: AuthorUpsertWithoutTextsInput
    connect?: AuthorWhereUniqueInput
    update?: XOR<XOR<AuthorUpdateToOneWithWhereWithoutTextsInput, AuthorUpdateWithoutTextsInput>, AuthorUncheckedUpdateWithoutTextsInput>
  }

  export type DynastyUpdateOneRequiredWithoutTextsNestedInput = {
    create?: XOR<DynastyCreateWithoutTextsInput, DynastyUncheckedCreateWithoutTextsInput>
    connectOrCreate?: DynastyCreateOrConnectWithoutTextsInput
    upsert?: DynastyUpsertWithoutTextsInput
    connect?: DynastyWhereUniqueInput
    update?: XOR<XOR<DynastyUpdateToOneWithWhereWithoutTextsInput, DynastyUpdateWithoutTextsInput>, DynastyUncheckedUpdateWithoutTextsInput>
  }

  export type TextTypeUpdateManyWithoutTextNestedInput = {
    create?: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput> | TextTypeCreateWithoutTextInput[] | TextTypeUncheckedCreateWithoutTextInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTextInput | TextTypeCreateOrConnectWithoutTextInput[]
    upsert?: TextTypeUpsertWithWhereUniqueWithoutTextInput | TextTypeUpsertWithWhereUniqueWithoutTextInput[]
    createMany?: TextTypeCreateManyTextInputEnvelope
    set?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    disconnect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    delete?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    update?: TextTypeUpdateWithWhereUniqueWithoutTextInput | TextTypeUpdateWithWhereUniqueWithoutTextInput[]
    updateMany?: TextTypeUpdateManyWithWhereWithoutTextInput | TextTypeUpdateManyWithWhereWithoutTextInput[]
    deleteMany?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
  }

  export type TextTypeUncheckedUpdateManyWithoutTextNestedInput = {
    create?: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput> | TextTypeCreateWithoutTextInput[] | TextTypeUncheckedCreateWithoutTextInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTextInput | TextTypeCreateOrConnectWithoutTextInput[]
    upsert?: TextTypeUpsertWithWhereUniqueWithoutTextInput | TextTypeUpsertWithWhereUniqueWithoutTextInput[]
    createMany?: TextTypeCreateManyTextInputEnvelope
    set?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    disconnect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    delete?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    update?: TextTypeUpdateWithWhereUniqueWithoutTextInput | TextTypeUpdateWithWhereUniqueWithoutTextInput[]
    updateMany?: TextTypeUpdateManyWithWhereWithoutTextInput | TextTypeUpdateManyWithWhereWithoutTextInput[]
    deleteMany?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
  }

  export type TextTypeCreateNestedManyWithoutTypeInput = {
    create?: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput> | TextTypeCreateWithoutTypeInput[] | TextTypeUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTypeInput | TextTypeCreateOrConnectWithoutTypeInput[]
    createMany?: TextTypeCreateManyTypeInputEnvelope
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
  }

  export type TextTypeUncheckedCreateNestedManyWithoutTypeInput = {
    create?: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput> | TextTypeCreateWithoutTypeInput[] | TextTypeUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTypeInput | TextTypeCreateOrConnectWithoutTypeInput[]
    createMany?: TextTypeCreateManyTypeInputEnvelope
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
  }

  export type TextTypeUpdateManyWithoutTypeNestedInput = {
    create?: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput> | TextTypeCreateWithoutTypeInput[] | TextTypeUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTypeInput | TextTypeCreateOrConnectWithoutTypeInput[]
    upsert?: TextTypeUpsertWithWhereUniqueWithoutTypeInput | TextTypeUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: TextTypeCreateManyTypeInputEnvelope
    set?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    disconnect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    delete?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    update?: TextTypeUpdateWithWhereUniqueWithoutTypeInput | TextTypeUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: TextTypeUpdateManyWithWhereWithoutTypeInput | TextTypeUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
  }

  export type TextTypeUncheckedUpdateManyWithoutTypeNestedInput = {
    create?: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput> | TextTypeCreateWithoutTypeInput[] | TextTypeUncheckedCreateWithoutTypeInput[]
    connectOrCreate?: TextTypeCreateOrConnectWithoutTypeInput | TextTypeCreateOrConnectWithoutTypeInput[]
    upsert?: TextTypeUpsertWithWhereUniqueWithoutTypeInput | TextTypeUpsertWithWhereUniqueWithoutTypeInput[]
    createMany?: TextTypeCreateManyTypeInputEnvelope
    set?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    disconnect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    delete?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    connect?: TextTypeWhereUniqueInput | TextTypeWhereUniqueInput[]
    update?: TextTypeUpdateWithWhereUniqueWithoutTypeInput | TextTypeUpdateWithWhereUniqueWithoutTypeInput[]
    updateMany?: TextTypeUpdateManyWithWhereWithoutTypeInput | TextTypeUpdateManyWithWhereWithoutTypeInput[]
    deleteMany?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
  }

  export type TextCreateNestedOneWithoutTextTypesInput = {
    create?: XOR<TextCreateWithoutTextTypesInput, TextUncheckedCreateWithoutTextTypesInput>
    connectOrCreate?: TextCreateOrConnectWithoutTextTypesInput
    connect?: TextWhereUniqueInput
  }

  export type TypeCreateNestedOneWithoutTextTypesInput = {
    create?: XOR<TypeCreateWithoutTextTypesInput, TypeUncheckedCreateWithoutTextTypesInput>
    connectOrCreate?: TypeCreateOrConnectWithoutTextTypesInput
    connect?: TypeWhereUniqueInput
  }

  export type TextUpdateOneRequiredWithoutTextTypesNestedInput = {
    create?: XOR<TextCreateWithoutTextTypesInput, TextUncheckedCreateWithoutTextTypesInput>
    connectOrCreate?: TextCreateOrConnectWithoutTextTypesInput
    upsert?: TextUpsertWithoutTextTypesInput
    connect?: TextWhereUniqueInput
    update?: XOR<XOR<TextUpdateToOneWithWhereWithoutTextTypesInput, TextUpdateWithoutTextTypesInput>, TextUncheckedUpdateWithoutTextTypesInput>
  }

  export type TypeUpdateOneRequiredWithoutTextTypesNestedInput = {
    create?: XOR<TypeCreateWithoutTextTypesInput, TypeUncheckedCreateWithoutTextTypesInput>
    connectOrCreate?: TypeCreateOrConnectWithoutTextTypesInput
    upsert?: TypeUpsertWithoutTextTypesInput
    connect?: TypeWhereUniqueInput
    update?: XOR<XOR<TypeUpdateToOneWithWhereWithoutTextTypesInput, TypeUpdateWithoutTextTypesInput>, TypeUncheckedUpdateWithoutTextTypesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type AuthorCreateWithoutDynastyInput = {
    name: string
    introduction?: string | null
    texts?: TextCreateNestedManyWithoutAuthorInput
  }

  export type AuthorUncheckedCreateWithoutDynastyInput = {
    id?: number
    name: string
    introduction?: string | null
    texts?: TextUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type AuthorCreateOrConnectWithoutDynastyInput = {
    where: AuthorWhereUniqueInput
    create: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput>
  }

  export type AuthorCreateManyDynastyInputEnvelope = {
    data: AuthorCreateManyDynastyInput | AuthorCreateManyDynastyInput[]
    skipDuplicates?: boolean
  }

  export type TextCreateWithoutDynastyInput = {
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    author: AuthorCreateNestedOneWithoutTextsInput
    textTypes?: TextTypeCreateNestedManyWithoutTextInput
  }

  export type TextUncheckedCreateWithoutDynastyInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    authorId: number
    textTypes?: TextTypeUncheckedCreateNestedManyWithoutTextInput
  }

  export type TextCreateOrConnectWithoutDynastyInput = {
    where: TextWhereUniqueInput
    create: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput>
  }

  export type TextCreateManyDynastyInputEnvelope = {
    data: TextCreateManyDynastyInput | TextCreateManyDynastyInput[]
    skipDuplicates?: boolean
  }

  export type AuthorUpsertWithWhereUniqueWithoutDynastyInput = {
    where: AuthorWhereUniqueInput
    update: XOR<AuthorUpdateWithoutDynastyInput, AuthorUncheckedUpdateWithoutDynastyInput>
    create: XOR<AuthorCreateWithoutDynastyInput, AuthorUncheckedCreateWithoutDynastyInput>
  }

  export type AuthorUpdateWithWhereUniqueWithoutDynastyInput = {
    where: AuthorWhereUniqueInput
    data: XOR<AuthorUpdateWithoutDynastyInput, AuthorUncheckedUpdateWithoutDynastyInput>
  }

  export type AuthorUpdateManyWithWhereWithoutDynastyInput = {
    where: AuthorScalarWhereInput
    data: XOR<AuthorUpdateManyMutationInput, AuthorUncheckedUpdateManyWithoutDynastyInput>
  }

  export type AuthorScalarWhereInput = {
    AND?: AuthorScalarWhereInput | AuthorScalarWhereInput[]
    OR?: AuthorScalarWhereInput[]
    NOT?: AuthorScalarWhereInput | AuthorScalarWhereInput[]
    id?: IntFilter<"Author"> | number
    name?: StringFilter<"Author"> | string
    introduction?: StringNullableFilter<"Author"> | string | null
    dynastyId?: IntNullableFilter<"Author"> | number | null
  }

  export type TextUpsertWithWhereUniqueWithoutDynastyInput = {
    where: TextWhereUniqueInput
    update: XOR<TextUpdateWithoutDynastyInput, TextUncheckedUpdateWithoutDynastyInput>
    create: XOR<TextCreateWithoutDynastyInput, TextUncheckedCreateWithoutDynastyInput>
  }

  export type TextUpdateWithWhereUniqueWithoutDynastyInput = {
    where: TextWhereUniqueInput
    data: XOR<TextUpdateWithoutDynastyInput, TextUncheckedUpdateWithoutDynastyInput>
  }

  export type TextUpdateManyWithWhereWithoutDynastyInput = {
    where: TextScalarWhereInput
    data: XOR<TextUpdateManyMutationInput, TextUncheckedUpdateManyWithoutDynastyInput>
  }

  export type TextScalarWhereInput = {
    AND?: TextScalarWhereInput | TextScalarWhereInput[]
    OR?: TextScalarWhereInput[]
    NOT?: TextScalarWhereInput | TextScalarWhereInput[]
    id?: IntFilter<"Text"> | number
    title?: StringFilter<"Text"> | string
    content?: StringFilter<"Text"> | string
    contentHash?: StringFilter<"Text"> | string
    annotation?: StringNullableFilter<"Text"> | string | null
    comments?: StringNullableFilter<"Text"> | string | null
    translation?: StringNullableFilter<"Text"> | string | null
    authorId?: IntFilter<"Text"> | number
    dynastyId?: IntFilter<"Text"> | number
  }

  export type DynastyCreateWithoutAuthorsInput = {
    name: string
    texts?: TextCreateNestedManyWithoutDynastyInput
  }

  export type DynastyUncheckedCreateWithoutAuthorsInput = {
    id?: number
    name: string
    texts?: TextUncheckedCreateNestedManyWithoutDynastyInput
  }

  export type DynastyCreateOrConnectWithoutAuthorsInput = {
    where: DynastyWhereUniqueInput
    create: XOR<DynastyCreateWithoutAuthorsInput, DynastyUncheckedCreateWithoutAuthorsInput>
  }

  export type TextCreateWithoutAuthorInput = {
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    dynasty: DynastyCreateNestedOneWithoutTextsInput
    textTypes?: TextTypeCreateNestedManyWithoutTextInput
  }

  export type TextUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    dynastyId: number
    textTypes?: TextTypeUncheckedCreateNestedManyWithoutTextInput
  }

  export type TextCreateOrConnectWithoutAuthorInput = {
    where: TextWhereUniqueInput
    create: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput>
  }

  export type TextCreateManyAuthorInputEnvelope = {
    data: TextCreateManyAuthorInput | TextCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type DynastyUpsertWithoutAuthorsInput = {
    update: XOR<DynastyUpdateWithoutAuthorsInput, DynastyUncheckedUpdateWithoutAuthorsInput>
    create: XOR<DynastyCreateWithoutAuthorsInput, DynastyUncheckedCreateWithoutAuthorsInput>
    where?: DynastyWhereInput
  }

  export type DynastyUpdateToOneWithWhereWithoutAuthorsInput = {
    where?: DynastyWhereInput
    data: XOR<DynastyUpdateWithoutAuthorsInput, DynastyUncheckedUpdateWithoutAuthorsInput>
  }

  export type DynastyUpdateWithoutAuthorsInput = {
    name?: StringFieldUpdateOperationsInput | string
    texts?: TextUpdateManyWithoutDynastyNestedInput
  }

  export type DynastyUncheckedUpdateWithoutAuthorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    texts?: TextUncheckedUpdateManyWithoutDynastyNestedInput
  }

  export type TextUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TextWhereUniqueInput
    update: XOR<TextUpdateWithoutAuthorInput, TextUncheckedUpdateWithoutAuthorInput>
    create: XOR<TextCreateWithoutAuthorInput, TextUncheckedCreateWithoutAuthorInput>
  }

  export type TextUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TextWhereUniqueInput
    data: XOR<TextUpdateWithoutAuthorInput, TextUncheckedUpdateWithoutAuthorInput>
  }

  export type TextUpdateManyWithWhereWithoutAuthorInput = {
    where: TextScalarWhereInput
    data: XOR<TextUpdateManyMutationInput, TextUncheckedUpdateManyWithoutAuthorInput>
  }

  export type AuthorCreateWithoutTextsInput = {
    name: string
    introduction?: string | null
    dynasty?: DynastyCreateNestedOneWithoutAuthorsInput
  }

  export type AuthorUncheckedCreateWithoutTextsInput = {
    id?: number
    name: string
    introduction?: string | null
    dynastyId?: number | null
  }

  export type AuthorCreateOrConnectWithoutTextsInput = {
    where: AuthorWhereUniqueInput
    create: XOR<AuthorCreateWithoutTextsInput, AuthorUncheckedCreateWithoutTextsInput>
  }

  export type DynastyCreateWithoutTextsInput = {
    name: string
    authors?: AuthorCreateNestedManyWithoutDynastyInput
  }

  export type DynastyUncheckedCreateWithoutTextsInput = {
    id?: number
    name: string
    authors?: AuthorUncheckedCreateNestedManyWithoutDynastyInput
  }

  export type DynastyCreateOrConnectWithoutTextsInput = {
    where: DynastyWhereUniqueInput
    create: XOR<DynastyCreateWithoutTextsInput, DynastyUncheckedCreateWithoutTextsInput>
  }

  export type TextTypeCreateWithoutTextInput = {
    type: TypeCreateNestedOneWithoutTextTypesInput
  }

  export type TextTypeUncheckedCreateWithoutTextInput = {
    typeId: number
  }

  export type TextTypeCreateOrConnectWithoutTextInput = {
    where: TextTypeWhereUniqueInput
    create: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput>
  }

  export type TextTypeCreateManyTextInputEnvelope = {
    data: TextTypeCreateManyTextInput | TextTypeCreateManyTextInput[]
    skipDuplicates?: boolean
  }

  export type AuthorUpsertWithoutTextsInput = {
    update: XOR<AuthorUpdateWithoutTextsInput, AuthorUncheckedUpdateWithoutTextsInput>
    create: XOR<AuthorCreateWithoutTextsInput, AuthorUncheckedCreateWithoutTextsInput>
    where?: AuthorWhereInput
  }

  export type AuthorUpdateToOneWithWhereWithoutTextsInput = {
    where?: AuthorWhereInput
    data: XOR<AuthorUpdateWithoutTextsInput, AuthorUncheckedUpdateWithoutTextsInput>
  }

  export type AuthorUpdateWithoutTextsInput = {
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    dynasty?: DynastyUpdateOneWithoutAuthorsNestedInput
  }

  export type AuthorUncheckedUpdateWithoutTextsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    dynastyId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type DynastyUpsertWithoutTextsInput = {
    update: XOR<DynastyUpdateWithoutTextsInput, DynastyUncheckedUpdateWithoutTextsInput>
    create: XOR<DynastyCreateWithoutTextsInput, DynastyUncheckedCreateWithoutTextsInput>
    where?: DynastyWhereInput
  }

  export type DynastyUpdateToOneWithWhereWithoutTextsInput = {
    where?: DynastyWhereInput
    data: XOR<DynastyUpdateWithoutTextsInput, DynastyUncheckedUpdateWithoutTextsInput>
  }

  export type DynastyUpdateWithoutTextsInput = {
    name?: StringFieldUpdateOperationsInput | string
    authors?: AuthorUpdateManyWithoutDynastyNestedInput
  }

  export type DynastyUncheckedUpdateWithoutTextsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    authors?: AuthorUncheckedUpdateManyWithoutDynastyNestedInput
  }

  export type TextTypeUpsertWithWhereUniqueWithoutTextInput = {
    where: TextTypeWhereUniqueInput
    update: XOR<TextTypeUpdateWithoutTextInput, TextTypeUncheckedUpdateWithoutTextInput>
    create: XOR<TextTypeCreateWithoutTextInput, TextTypeUncheckedCreateWithoutTextInput>
  }

  export type TextTypeUpdateWithWhereUniqueWithoutTextInput = {
    where: TextTypeWhereUniqueInput
    data: XOR<TextTypeUpdateWithoutTextInput, TextTypeUncheckedUpdateWithoutTextInput>
  }

  export type TextTypeUpdateManyWithWhereWithoutTextInput = {
    where: TextTypeScalarWhereInput
    data: XOR<TextTypeUpdateManyMutationInput, TextTypeUncheckedUpdateManyWithoutTextInput>
  }

  export type TextTypeScalarWhereInput = {
    AND?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
    OR?: TextTypeScalarWhereInput[]
    NOT?: TextTypeScalarWhereInput | TextTypeScalarWhereInput[]
    textId?: IntFilter<"TextType"> | number
    typeId?: IntFilter<"TextType"> | number
  }

  export type TextTypeCreateWithoutTypeInput = {
    text: TextCreateNestedOneWithoutTextTypesInput
  }

  export type TextTypeUncheckedCreateWithoutTypeInput = {
    textId: number
  }

  export type TextTypeCreateOrConnectWithoutTypeInput = {
    where: TextTypeWhereUniqueInput
    create: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput>
  }

  export type TextTypeCreateManyTypeInputEnvelope = {
    data: TextTypeCreateManyTypeInput | TextTypeCreateManyTypeInput[]
    skipDuplicates?: boolean
  }

  export type TextTypeUpsertWithWhereUniqueWithoutTypeInput = {
    where: TextTypeWhereUniqueInput
    update: XOR<TextTypeUpdateWithoutTypeInput, TextTypeUncheckedUpdateWithoutTypeInput>
    create: XOR<TextTypeCreateWithoutTypeInput, TextTypeUncheckedCreateWithoutTypeInput>
  }

  export type TextTypeUpdateWithWhereUniqueWithoutTypeInput = {
    where: TextTypeWhereUniqueInput
    data: XOR<TextTypeUpdateWithoutTypeInput, TextTypeUncheckedUpdateWithoutTypeInput>
  }

  export type TextTypeUpdateManyWithWhereWithoutTypeInput = {
    where: TextTypeScalarWhereInput
    data: XOR<TextTypeUpdateManyMutationInput, TextTypeUncheckedUpdateManyWithoutTypeInput>
  }

  export type TextCreateWithoutTextTypesInput = {
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    author: AuthorCreateNestedOneWithoutTextsInput
    dynasty: DynastyCreateNestedOneWithoutTextsInput
  }

  export type TextUncheckedCreateWithoutTextTypesInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    authorId: number
    dynastyId: number
  }

  export type TextCreateOrConnectWithoutTextTypesInput = {
    where: TextWhereUniqueInput
    create: XOR<TextCreateWithoutTextTypesInput, TextUncheckedCreateWithoutTextTypesInput>
  }

  export type TypeCreateWithoutTextTypesInput = {
    name: string
  }

  export type TypeUncheckedCreateWithoutTextTypesInput = {
    id?: number
    name: string
  }

  export type TypeCreateOrConnectWithoutTextTypesInput = {
    where: TypeWhereUniqueInput
    create: XOR<TypeCreateWithoutTextTypesInput, TypeUncheckedCreateWithoutTextTypesInput>
  }

  export type TextUpsertWithoutTextTypesInput = {
    update: XOR<TextUpdateWithoutTextTypesInput, TextUncheckedUpdateWithoutTextTypesInput>
    create: XOR<TextCreateWithoutTextTypesInput, TextUncheckedCreateWithoutTextTypesInput>
    where?: TextWhereInput
  }

  export type TextUpdateToOneWithWhereWithoutTextTypesInput = {
    where?: TextWhereInput
    data: XOR<TextUpdateWithoutTextTypesInput, TextUncheckedUpdateWithoutTextTypesInput>
  }

  export type TextUpdateWithoutTextTypesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    author?: AuthorUpdateOneRequiredWithoutTextsNestedInput
    dynasty?: DynastyUpdateOneRequiredWithoutTextsNestedInput
  }

  export type TextUncheckedUpdateWithoutTextTypesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    dynastyId?: IntFieldUpdateOperationsInput | number
  }

  export type TypeUpsertWithoutTextTypesInput = {
    update: XOR<TypeUpdateWithoutTextTypesInput, TypeUncheckedUpdateWithoutTextTypesInput>
    create: XOR<TypeCreateWithoutTextTypesInput, TypeUncheckedCreateWithoutTextTypesInput>
    where?: TypeWhereInput
  }

  export type TypeUpdateToOneWithWhereWithoutTextTypesInput = {
    where?: TypeWhereInput
    data: XOR<TypeUpdateWithoutTextTypesInput, TypeUncheckedUpdateWithoutTextTypesInput>
  }

  export type TypeUpdateWithoutTextTypesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TypeUncheckedUpdateWithoutTextTypesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AuthorCreateManyDynastyInput = {
    id?: number
    name: string
    introduction?: string | null
  }

  export type TextCreateManyDynastyInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    authorId: number
  }

  export type AuthorUpdateWithoutDynastyInput = {
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    texts?: TextUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateWithoutDynastyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
    texts?: TextUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type AuthorUncheckedUpdateManyWithoutDynastyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    introduction?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TextUpdateWithoutDynastyInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    author?: AuthorUpdateOneRequiredWithoutTextsNestedInput
    textTypes?: TextTypeUpdateManyWithoutTextNestedInput
  }

  export type TextUncheckedUpdateWithoutDynastyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    textTypes?: TextTypeUncheckedUpdateManyWithoutTextNestedInput
  }

  export type TextUncheckedUpdateManyWithoutDynastyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type TextCreateManyAuthorInput = {
    id?: number
    title: string
    content: string
    contentHash: string
    annotation?: string | null
    comments?: string | null
    translation?: string | null
    dynastyId: number
  }

  export type TextUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    dynasty?: DynastyUpdateOneRequiredWithoutTextsNestedInput
    textTypes?: TextTypeUpdateManyWithoutTextNestedInput
  }

  export type TextUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    dynastyId?: IntFieldUpdateOperationsInput | number
    textTypes?: TextTypeUncheckedUpdateManyWithoutTextNestedInput
  }

  export type TextUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    contentHash?: StringFieldUpdateOperationsInput | string
    annotation?: NullableStringFieldUpdateOperationsInput | string | null
    comments?: NullableStringFieldUpdateOperationsInput | string | null
    translation?: NullableStringFieldUpdateOperationsInput | string | null
    dynastyId?: IntFieldUpdateOperationsInput | number
  }

  export type TextTypeCreateManyTextInput = {
    typeId: number
  }

  export type TextTypeUpdateWithoutTextInput = {
    type?: TypeUpdateOneRequiredWithoutTextTypesNestedInput
  }

  export type TextTypeUncheckedUpdateWithoutTextInput = {
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type TextTypeUncheckedUpdateManyWithoutTextInput = {
    typeId?: IntFieldUpdateOperationsInput | number
  }

  export type TextTypeCreateManyTypeInput = {
    textId: number
  }

  export type TextTypeUpdateWithoutTypeInput = {
    text?: TextUpdateOneRequiredWithoutTextTypesNestedInput
  }

  export type TextTypeUncheckedUpdateWithoutTypeInput = {
    textId?: IntFieldUpdateOperationsInput | number
  }

  export type TextTypeUncheckedUpdateManyWithoutTypeInput = {
    textId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}