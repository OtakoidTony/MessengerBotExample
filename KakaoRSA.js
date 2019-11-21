modinv = function (a, m) {
    var v = 1;
    var d = a;
    var u = (a == 1);
    var t = 1 - u;
    if (t == 1) {
        var c = m % a;
        u = Math.floor(m / a);
        while (c != 1 && t == 1) {
            var q = Math.floor(d / c);
            d = d % c;
            v = v + q * u;
            t = (d != 1);
            if (t == 1) {
                q = Math.floor(c / d);
                c = c % d;
                u = u + q * v;
            }
        }
        u = v * (1 - t) + t * (m - u);
    }
    return u;
}

function isPrime(n, k) { 
    // Corner cases 
    if (n <= 1 || n == 4) return false; 
    if (n <= 3) return true; 
      
    // Try k times 
    var a = 0;
    while (k > 0) { 
        // Pick a random number in [2..n-2]      
        // Above corner cases make sure that n > 4 
        a = 2 + java.lang.Math.floor(Math.random() % (n - 4));  
      
        // Fermat's little theorem 
        if (java.lang.Math.pow(a, n - 1)%n != 1) {
            return false; 
        }
        k=k-1;
    }
    return true; 
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var i=1000000;
    while(i<=1000000000){
        if (isPrime(i,10)){
            replier.reply(i);
        }
    }
}
