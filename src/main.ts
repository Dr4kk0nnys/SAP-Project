/* 
In which game the heaviest player scored the greatest amount of points

// Bruteforce
get all-players
check which player has the heaviest weight


get all-games
check 


*/


/*
page: 1
total_count_from_page: 100

100

*/
import { getPlayers } from './services/getPlayers';

import Player from './interfaces/IPlayer'
import Stats from './interfaces/IStats';

(async () => {
    const players: Player[] = await getPlayers.byAll();
    console.log({ length: players.length });

    let heaviestPlayer: Player = null;

    /* TODO: Slow, maybe use a graph ? */
    /* O(N), n being the total amount of players */
    players.map(player => {
        if (!heaviestPlayer || player.weight_pounds > heaviestPlayer.weight_pounds) {
            heaviestPlayer = player;
        }
    });

    console.log({ heaviestPlayer });

    let highestPointGameOfCareer: Stats = null;

    const stats: Stats[] = await getPlayers.byStats(heaviestPlayer.id);

    stats.map(stat => {
        if (!highestPointGameOfCareer || stat.pts > highestPointGameOfCareer.pts) {
            highestPointGameOfCareer = stat;
        }
    });

    console.log(`The highest point game of the heaviest player ${heaviestPlayer.first_name} was:`, { highestPointGameOfCareer });
})();
