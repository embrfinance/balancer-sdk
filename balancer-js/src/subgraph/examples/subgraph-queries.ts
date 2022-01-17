import * as dotenv from 'dotenv';
import { createSubgraphClient } from '../subgraph';

dotenv.config();

async function subgraphQueries() {
    const client = createSubgraphClient(process.env.BALANCER_SUBGRAPH_URL!);

    const { pools } = await client.Pools({ first: 5 });
    const { pools: filteredPools } = await client.Pools({
        where: { totalLiquidity_gt: '1' },
    });

    const { user } = await client.User({ id: 'user-address' });
    const { users } = await client.Users({
        first: 5,
        orderBy: 'sharesOwned',
        orderDirection: 'desc',
    });
}
