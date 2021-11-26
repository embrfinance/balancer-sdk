import * as dotenv from "dotenv";
import { createBalancerSubgraphClient } from "../src/client";
import {
  OrderDirection,
  User_OrderBy,
} from "../generated/balancer-subgraph-types";

dotenv.config();

async function subgraphQueries() {
  const client = createBalancerSubgraphClient(process.env.BALANCER_SUBGRAPH);

  const { pools } = await client.BalancerPools({ first: 5 });
  const { pools: filteredPools } = await client.BalancerPools({
    where: { totalLiquidity_gt: "1" },
  });

  const { user } = await client.BalancerUser({ id: "user-address" });
  const { users } = await client.BalancerUsers({
    first: 5,
    orderBy: User_OrderBy.SharesOwned,
    orderDirection: OrderDirection.Desc,
  });
}