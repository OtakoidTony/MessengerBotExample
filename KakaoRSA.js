modinv = function(a, m) { // https://github.com/alexvanmaele/RSA-Prime-Calculator
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

function gcd(x, y) { // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-8.php
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function isPrime(n, k) {
    // Corner cases 
    if (n <= 1 || n == 4) return false;
    if (n <= 3) return true;
    var a = 0;
    while (k > 0) {
        // Pick a randomly in the range [2, n − 2]
        a = 2 + Math.floor(Math.random() * (n - 4));
        // Fermat's little theorem 
        if (Math.pow(a, n - 1) % n != 1) {
            return Math.pow(a, n - 1) % n;
        }
        k = k - 1;
    }
    return true;
}

function totient(p, q) {
    return (p - 1) * (q - 1);
}

/*
RSA 알고리즘 개념 및 구현(python)
https://wkdtjsgur100.github.io/RSA-algorithm/
*/
function get_private_key(e, tot) {
    var k = 1;
    while (((e * k) % tot) != 1 || k == e) {
        k += 1;
    }
    return k;
}

/* 
RSA 알고리즘 개념 및 구현(python)
https://wkdtjsgur100.github.io/RSA-algorithm/
*/
function get_public_key(totient) {
    var e = 2;
    while (e < totient && gcd(e, totient) != 1) {
        e += 1;
    }
    return e;
}

function randomItem(a) {
    return a[Math.floor(Math.random() * a.length)];
}

const primes08=[101, 223, 17, 97, 199, 67, 73, 151, 41, 113];
const primes16=[65293, 40253, 41627, 54311, 54377, 653, 20521, 52103, 34381, 21757];
const primes32=[3387640021, 3492474943, 3565992361, 3574846283, 2755923421];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    if(msg=="Bot!GetKeypair"){
        var usingPrimes = primes08;
        var p = randomItem(usingPrimes);
        usingPrimes.splice(usingPrimes.indexOf(p), 1);
        var q = randomItem(usingPrimes);
        var tot = totient(p, q);
        var n = p * q;
        var publicKey = get_public_key(tot);
        var privateKey= get_private_key(publicKey, tot);
        replier.reply("[Public Key]\n"+"n="+n.toString()+" "+"Encrypt Key: "+publicKey.toString());
        replier.reply("[Private Key]\n"+"n="+n.toString()+" "+"Decrypt Key: "+privateKey.toString());
    }
}
