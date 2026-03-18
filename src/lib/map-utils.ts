// 高德地图集成工具
// 创建时间：2026-03-07 22:55
// 说明：地图API集成工具函数

declare global {
  interface Window {
    AMap: any;
    AMapUI: any;
  }
}

// 加载高德地图SDK
export function loadAMapSDK(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load AMap SDK'));
    document.head.appendChild(script);
  });
}

// 初始化地图
export function initMap(
  container: HTMLElement,
  options: {
    center?: [number, number];
    zoom?: number;
  } = {}
): any {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  const map = new window.AMap.Map(container, {
    zoom: options.zoom || 13,
    center: options.center || [114.3055, 30.5931], // 武汉中心
    viewMode: '2D',
  });

  return map;
}

// 添加标记点
export function addMarker(
  map: any,
  position: [number, number],
  title?: string
): any {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  const marker = new window.AMap.Marker({
    position,
    title,
  });

  map.add(marker);
  return marker;
}

// 绘制路线
export function drawPolyline(
  map: any,
  path: Array<[number, number]>,
  options: {
    strokeColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
  } = {}
): any {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  const polyline = new window.AMap.Polyline({
    path,
    strokeColor: options.strokeColor || '#667eea',
    strokeWeight: options.strokeWeight || 4,
    strokeOpacity: options.strokeOpacity || 0.9,
  });

  map.add(polyline);
  return polyline;
}

// 地理编码（地址转坐标）
export async function geocode(address: string): Promise<[number, number]> {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  return new Promise((resolve, reject) => {
    const geocoder = new window.AMap.Geocoder();
    geocoder.getLocation(address, (status: string, result: any) => {
      if (status === 'complete' && result.info === 'OK') {
        const location = result.geocodes[0].location;
        resolve([location.lng, location.lat]);
      } else {
        reject(new Error('Geocoding failed'));
      }
    });
  });
}

// 逆地理编码（坐标转地址）
export async function reverseGeocode(
  lnglat: [number, number]
): Promise<string> {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  return new Promise((resolve, reject) => {
    const geocoder = new window.AMap.Geocoder();
    geocoder.getAddress(lnglat, (status: string, result: any) => {
      if (status === 'complete' && result.info === 'OK') {
        resolve(result.regeocode.formattedAddress);
      } else {
        reject(new Error('Reverse geocoding failed'));
      }
    });
  });
}

// 计算两点距离
export function calculateDistance(
  point1: [number, number],
  point2: [number, number]
): number {
  if (!window.AMap) {
    throw new Error('AMap SDK not loaded');
  }

  const p1 = new window.AMap.LngLat(point1[0], point1[1]);
  const p2 = new window.AMap.LngLat(point2[0], point2[1]);
  return Math.round(p1.distance(p2));
}
