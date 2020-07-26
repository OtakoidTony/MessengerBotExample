
Utils.getBusRouteData = function (busID) {
    return JSON.parse(Utils.getWebText("https://s.search.naver.com/p/mlocation/map/api2/getBusDetailInfo.nhn?_callback=window.__jindo2_callback._bus_detail_info_0&output=json&caller=pc_search&includeCompanyInfo=true&doSeparateSection=true&includeNonStopBusStops=true&includeSchedule=true&busID=" + busID).split("window.__jindo2_callback._bus_detail_info_0(")[1].split(");")[0]).message.result;
}

Utils.getBusLocationData = function (busID) {
    return JSON.parse(Utils.getWebText("https://s.search.naver.com/n/api.pubtrans.map/2.0/live/getBusLocation.jsonp?_callback=window.__jindo2_callback._bus_location_list_0&caller=pc_search&routeId=" + busID).split("window.__jindo2_callback._bus_location_list_0(")[1].split(");")[0]).message.result;
}

/**
 * 객체 배열 중에 key에 해당하는 값이 value인 객체의 인덱스를 반환하는 함수
 * @param key 찾을 값에 대한 key
 * @param value key에 해당하는 값
 */
Array.prototype.findObjectIndex = function (key, value) {
    for (var i = 0; i < this.length; i++)
        if (this[i][key] == value) return i;
    return -1;
};

displayBusData = function(busID) {
    data = Utils.getBusRouteData(busID).station;
    result = ""
    for (var i = 0; i < data.length; i++) {
        result += "|↓| \n"
        result += "|↓| " + data[i].stationName + "\n";
    }
    result += "|↓| ";
    result = result.split("\n")
    busRes = Utils.getBusLocationData(busID).busLocationList

    for (var i = 0; i < busRes.length; i++) {
        result[data.findObjectIndex('stationID', busRes[i].stationId) * 2 + 2] = "|◆| " + busRes[i].plateNo;
    }
    
    result = result.join('\n')
    return result;
}
