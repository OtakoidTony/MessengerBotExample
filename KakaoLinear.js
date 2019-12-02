function method_of_least_squares(p){
    var sigma_x1 = 0;
    var sigma_x2 = 0;
    var sigma_y1 = 0;
    var sigma_xy = 0;
    var n = p.length;
    var i = 0;
    while ( i < n ){
        sigma_x1 = sigma_x1 + p[i][0];
        sigma_x2 = sigma_x2 + ( p[i][0] * p[i][0] );
        sigma_y1 = sigma_y1 + p[i][1];
        sigma_xy = sigma_xy + ( p[i][0] * p[i][1] );
        i = i + 1;
    }
    var b = ((sigma_y1*sigma_x1)-(n*sigma_xy))/((sigma_x1*sigma_x1)-(n*sigma_x2));
    var a = (sigma_y1-(b*sigma_x1))/n;
    return [a, b];
}
    
