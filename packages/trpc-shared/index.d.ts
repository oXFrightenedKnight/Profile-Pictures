export declare const db: import("drizzle-orm/neon-http").NeonHttpDatabase<Record<string, never>> & {
  $client: import("@neondatabase/serverless").NeonQueryFunction<false, false>;
};
export declare const appRouter: import("@trpc/server").TRPCBuiltRouter<
  {
    ctx: {
      clerkId: string | null;
    };
    meta: object;
    errorShape: import("@trpc/server").TRPCDefaultErrorShape;
    transformer: false;
  },
  import("@trpc/server").TRPCDecorateCreateRouterOptions<{
    readUserProfile: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        userId: string;
      };
      output: {
        user: {
          id: string;
          name: string;
          description: string | null;
        };
        avatarUrl: string;
      };
      meta: object;
    }>;
    updateUserProfile: import("@trpc/server").TRPCMutationProcedure<{
      input: {
        name: string;
        description: string;
      };
      output: {
        user: {
          id: string;
          clerkUserId: string;
          name: string;
          email: string;
          description: string | null;
          storageTaken: number;
        };
      };
      meta: object;
    }>;
    readProducts: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        collectionId: string;
        limit?: number | null | undefined;
        cursor?: unknown;
      };
      output: {
        products: {
          id: string;
          name: string;
          description: string | null;
          authorId: string;
          priceCents: number;
          discount: string | null;
          newRelease: boolean;
          copies: number;
          collectionId: string;
          mediaId: string;
          createdAt: Date;
          expiresAt: Date | null;
        }[];
        nextCursor: Date | undefined;
      };
      meta: object;
    }>;
    authCallback: import("@trpc/server").TRPCQueryProcedure<{
      input: void;
      output: {
        success: boolean;
      };
      meta: object;
    }>;
    getUserIdByClerk: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        clerkId: string;
      };
      output: {
        userId: {
          id: string;
        }[];
      };
      meta: object;
    }>;
    readUserProducts: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        userId: string;
        limit?: number | null | undefined;
        cursor?: unknown;
      };
      output: {
        products: {
          id: string;
          name: string;
          description: string | null;
          authorId: string;
          priceCents: number;
          discount: string | null;
          newRelease: boolean;
          copies: number;
          collectionId: string;
          mediaId: string;
          createdAt: Date;
          expiresAt: Date | null;
        }[];
        nextCursor: Date | undefined;
      };
      meta: object;
    }>;
    readMyProfile: import("@trpc/server").TRPCQueryProcedure<{
      input: void;
      output: {
        myUser: {
          id: string;
          clerkUserId: string;
          name: string;
          email: string;
          description: string | null;
          storageTaken: number;
        }[];
        avatarUrl: string;
      };
      meta: object;
    }>;
    getMedia: import("@trpc/server").TRPCMutationProcedure<{
      input: {
        key: string;
      };
      output: {
        id: string;
        type: "video" | "image";
        key: string;
        url: string;
        name: string;
        size: number;
        authorId: string;
        status: "READY" | "FAILED" | "PENDING" | null;
      };
      meta: object;
    }>;
    deleteMedia: import("@trpc/server").TRPCMutationProcedure<{
      input: {
        id?: string | null | undefined;
      };
      output: {
        success: boolean;
      };
      meta: object;
    }>;
    createProduct: import("@trpc/server").TRPCMutationProcedure<{
      input: {
        name: string;
        description: string;
        priceInCents: number;
        discount: number;
        copies: number;
        mediaId: string;
      };
      output: {
        id: string;
        name: string;
        description: string | null;
        authorId: string;
        priceCents: number;
        discount: string | null;
        newRelease: boolean;
        copies: number;
        collectionId: string;
        mediaId: string;
        createdAt: Date;
        expiresAt: Date | null;
      };
      meta: object;
    }>;
    getMediaById: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        id: string;
      };
      output: {
        url: string;
        type: "video" | "image";
        size: number;
      }[];
      meta: object;
    }>;
    getUsernameById: import("@trpc/server").TRPCQueryProcedure<{
      input: {
        id: string;
      };
      output: {
        name: string;
        clerkId: string;
      };
      meta: object;
    }>;
    getCollections: import("@trpc/server").TRPCQueryProcedure<{
      input: void;
      output: {
        id: string;
        name: string;
        description: string | null;
        authorId: string | null;
      }[];
      meta: object;
    }>;
    deleteProduct: import("@trpc/server").TRPCMutationProcedure<{
      input: {
        id: string;
      };
      output:
        | number
        | {
            success: boolean;
          }
        | undefined;
      meta: object;
    }>;
  }>
>;
export type AppRouter = typeof appRouter;
