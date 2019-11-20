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

fermat_primality_test = function(p, s=5):
    /*
    a^(p-1) ≡ 1 mod p
    Input : prime candidate p and security paramter s
    Output: either p is a composite (always trues), or
            p is a prime (with probability)
    */
    if (p == 2){
        return true;
    }
    if (not p & 1){
        return false;
    }

    for i in range(s):
        a = Math.floor(java.lang.Math.random() * p-2) + 2;
        x = pow(a, p-1) % p // a**(p-1) % p
        if (x != 1){
            return false;
        }
    return true;

def square_and_multiply(x, k, p=None):
    /*
    Square and Multiply Algorithm
    Parameters: positive integer x and integer exponent k,
                optional modulus p
    Returns: x**k or x**k mod p when p is given
    */
    b = bin(k).lstrip('0b')
    r = 1
    for i in b:
        r = r**2
        if i == '1':
            r = r * x
        if p:
            r %= p
    return r
