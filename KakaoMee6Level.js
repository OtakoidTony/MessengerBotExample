const Mee6LevelSystem = {
    'requireXP' : function (lvl) {
        return 5 * (lvl ** 2) + 50 * lvl + 100;
    },
    'level' : function (xp) {
        test = xp + 1
        level = -1
        while (true) {
            level += 1
            if (test <= 0) break;
            test -= requireXP(level)
        }
        return level - 1
    }
}
