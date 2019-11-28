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

Utils.getPubgUserData = function(user) {
    try {
        var url = new java.net.URL("https://pubg.op.gg/api/users/"+Utils.getPubgUserID(user)+"/matches/recent?server=sea&queue_size=&");
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





