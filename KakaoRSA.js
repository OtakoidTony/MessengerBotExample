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

function gcd(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
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
      
    // Try k times 
    var a = 0;
    while (k > 0) {       
        // Pick a randomly in the range [2, n − 2]
        a = 2 + Math.floor(Math.random() * (n - 4));        
        // Fermat's little theorem 
        if (Math.pow(a, n - 1)%n != 1) {
            return Math.pow(a, n - 1)%n; 
        }
        k=k-1;
    }
    return true; 
}

function get_private_key(e, tot){
    var k=1;
    while (((e*k)%tot) != 1 || k == e){
        k+=1;
    }
    return k;
}

function get_public_key(totient){
    var e=2
    while (e< totient && gcd(e, totient)!=1){
        e += 1;
    }
    return e;
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    var i=1000000;
    while(i<=1000000000){
        if (isPrime(i,10)){
            replier.reply(i);
        }
        i=i+1;
    }
}
