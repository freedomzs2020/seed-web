function initMap() {
  var map = new BMap.Map("map"); // 创建地图
  var point = new BMap.Point(98.789293, 39.429108); // 创建点坐标
  map.centerAndZoom(point, 17); // 设置中心点坐标
  map.enableScrollWheelZoom(); // 启用鼠标滚轮缩放

  // 在函数内部创建标注
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);

  // 在函数内部创建信息窗口
  var infoWindow = new BMap.InfoWindow(
    `酒泉世农农业科技有限公司<br><br>地址：酒泉市肃州区总寨镇<br>电话：13389438853`
  );
  marker.openInfoWindow(infoWindow);
}
window.onload = initMap;
