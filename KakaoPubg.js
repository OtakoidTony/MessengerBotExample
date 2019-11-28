/*
>> Name   | Utils.getPubg
>> Type   | Function
>> Return | Object

items
items.offset
items.user
items.user.nickname
items.user.profile_url
items.ranked_stats
items.ranked_stats.grade
items.ranked_stats.tier
items.ranked_stats.tier.title
items.ranked_stats.tier.short_title
items.ranked_stats.tier.image_url
items.ranked_stats.stats
items.ranked_stats.stats.matches_cnt
items.ranked_stats.stats.win_matches_cnt
items.ranked_stats.stats.topten_matches_cnt
items.ranked_stats.stats.kills_sum
items.ranked_stats.stats.kills_max
items.ranked_stats.stats.assists_sum
items.ranked_stats.stats.headshot_kills_sum
items.ranked_stats.stats.deaths_sum
items.ranked_stats.stats.longest_kill_max
items.ranked_stats.stats.rank_avg
items.ranked_stats.stats.damage_dealt_avg
items.ranked_stats.stats.time_survived_avg
items.ranked_stats.stats.rank_points
items.ranked_stats.stats.best_rank_point
items.ranked_stats.stats.rank_point_title
items.ranked_stats.ranks
items.ranked_stats.ranks.rank_points
items.ranked_stats.max_ranks
items.ranked_stats.max_ranks.rank_points
items.ranked_stats.lone_survivor_flag
*/
Utils.getPubg = function() {
    try {
        var url = new java.net.URL("https://d2apy071ztcd66.cloudfront.net/api/leaderboard/ranked-users?platform=steam&queue_size=1&mode=tpp&limit=10");
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        var result = str + "";
        return JSON.parse(result).items;
    } catch (e) {
        Log.debug(e);
    }
}

/*
>> Name   | Utils.getPubgUserID
>> Type   | Function
>> Param  | user : String
>> Return | String : HEX
*/
Utils.getPubgUserID = function(user) {
    try {
        var url = new java.net.URL("https://d2apy071ztcd66.cloudfront.net/user/"+user);
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        var result = str + "";
        return result.split("data-u-user_id=\"")[1].split("\"")[0];
    } catch (e) {
        Log.debug(e);
    }
}

/*
>> Name   | Utils.getPubgUserData
>> Type   | Function
>> Param  | user : String
>> Return | Object

params
params.server
params.season
params.queue_size
params.mode
params.type
matches
matches.summary
matches.summary.matches_cnt
matches.summary.win_matches_cnt
matches.summary.topten_matches_cnt
matches.summary.ranks_avg
matches.summary.ranks_list.kills_avg
matches.summary.ranks_list.deaths_avg
matches.summary.ranks_list.kills_max
matches.summary.ranks_list.damage_avg
matches.summary.ranks_list.time_survived_avg
matches.summary.ranks_list.modes
matches.summary.ranks_list.modes.1
matches.summary.ranks_list.modes.1.matches_cnt
matches.summary.ranks_list.modes.1.win_matches_cnt
matches.summary.ranks_list.modes.1.topten_matches_cnt
matches.summary.ranks_list.modes.1.rating_delta_sum
matches.items
matches.items.match_id
matches.items.type
matches.items.season
matches.items.server
matches.items.mode
matches.items.started_at
matches.items.total_rank
matches.items.offset
matches.items.queue_size
matches.items.map_name
matches.items.participant
matches.items.participant._id
matches.items.participant.user
matches.items.participant.user.nickname
matches.items.participant.user.profile_url
matches.items.participant.stats
matches.items.participant.stats.rank
matches.items.participant.stats.ranting
matches.items.participant.stats.rating_delta
matches.items.participant.stats.rank_points
matches.items.participant.stats.combat
matches.items.participant.stats.combat.vehicle_destroys
matches.items.participant.stats.combat.win_place
matches.items.participant.stats.combat.kill_place
matches.items.participant.stats.combat.heals
matches.items.participant.stats.combat.weapon_acquired
matches.items.participant.stats.combat.boosts
matches.items.participant.stats.combat.death_type
matches.items.participant.stats.combat.most_damage
matches.items.participant.stats.combat.time_survived
matches.items.participant.stats.combat.kda
matches.items.participant.stats.combat.kda.kills
matches.items.participant.stats.combat.kda.assists
matches.items.participant.stats.combat.kda.kill_steaks
matches.items.participant.stats.combat.kda.road_kills
matches.items.participant.stats.combat.kda.team_kills
matches.items.participant.stats.combat.kda.headshot_kills
matches.items.participant.stats.combat.kda.longest_kill
matches.items.participant.stats.combat.distance_traveled
matches.items.participant.stats.combat.distance_traveled.walk_distance
matches.items.participant.stats.combat.distance_traveled.ride_distance
matches.items.participant.stats.combat.damage
matches.items.participant.stats.combat.damage.damage_dealt
matches.items.participant.stats.combat.dbno
matches.items.participant.stats.combat.dbno.knock_downs
matches.items.participant.stats.combat.dbno.revives
matches.items.participant.team
matches.items.participant.team._id
matches.items.participant.team.stats
matches.items.participant.team.stats.rank
matches.items.participant.team.participants
*/
Utils.getPubgUserData = function(user) {
    try {
        var url = new java.net.URL("https://d2apy071ztcd66.cloudfront.net/api/users/"+Utils.getPubgUserID(user)+"/matches/recent?server=sea&queue_size=&");
        var con = url.openConnection();
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        var result = str + "";
        return JSON.parse(result);
    } catch (e) {
        Log.debug(e);
    }
}





