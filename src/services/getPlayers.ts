import axios from "axios";

import Player from '../interfaces/IPlayer';
import Stats from "../interfaces/IStats";

const getPlayers = {
    byAll: async () => {

        const players: Player[] = [];

        let hasNextPage: boolean = true;
        let i = 0;

        /* Note: If I followed "hasNextPage" logic, I was getting timed-out */
        while (i < 3) {
            console.log(i);

            try {
                const response = await axios({
                    method: 'get',
                    url: "https://www.balldontlie.io/api/v1/players",
                    params: {
                        page: i++
                    }
                });

                players.push(...response.data.data);

                /* Making sure "hasNextPage" remains as a number */
                if (response.data.meta.next_page) {
                    hasNextPage = true;
                } else {
                    hasNextPage = false;
                }
            } catch (e) {
                console.error(e);
            }
        }

        return players;
    },

    byStats: async (player_id: number) => {
        const stats: Stats[] = [];

        let hasNextPage: boolean = true;
        let i = 0;

        /* Note: If I followed "hasNextPage" logic, I was getting timed-out */
        while (i < 3) {
            console.log(i);

            try {
                const response = await axios({
                    method: 'get',
                    url: "https://www.balldontlie.io/api/v1/stats",
                    params: {
                        "player_ids[]": player_id,
                        page: i++
                    }
                });

                stats.push(...response.data.data);

                /* Making sure "hasNextPage" remains as a number */
                if (response.data.meta.next_page) {
                    hasNextPage = true;
                } else {
                    hasNextPage = false;
                }
            } catch (e) {
                console.error(e);
            }
        }

        return stats;
    }
}

export { getPlayers };