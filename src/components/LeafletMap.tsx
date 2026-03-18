'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './LeafletMap.module.css';

// 修复Leaflet默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  className?: string;
}

export function LeafletMap({
  latitude,
  longitude,
  title,
  address,
  className = '',
}: LeafletMapProps) {
  // 武汉中心坐标
  const defaultCenter: [number, number] = [30.5931, 114.3055];
  const center: [number, number] = latitude && longitude 
    ? [latitude, longitude] 
    : defaultCenter;

  return (
    <div className={`${styles.container} ${className}`}>
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {latitude && longitude && (
          <Marker position={center}>
            {title && (
              <Popup>
                <div className={styles.popup}>
                  <strong>{title}</strong>
                  {address && <p>{address}</p>}
                </div>
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>
      {title && (
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          {address && <p className={styles.address}>{address}</p>}
        </div>
      )}
    </div>
  );
}
