class Randomizer {
    static nextInt(max) {
        return Math.floor(Math.random() * max);
    }

    static getRandom(items, weights) {
        if (!weights) {
            return items[Randomizer.nextInt(items.length)];
        }

        var totalWeight = weights ? weights.reduce((a, b) => a + b) : items.length;

        var num = Math.random() * totalWeight,
            s = 0
        
        for (var i = 0; i < items.length - 1; ++i) {
            s += weights ? weights[i] : 1;
            if (num < s) {
                return items[i];
            }
        }
    
        return items[weights.length - 1];
    };
}
