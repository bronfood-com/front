import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './YandexMap.module.scss';
import { useEffect, useState } from 'react';
import navigationIcon from '../../vendor/images/icons/navigation.svg';
import placeIcon from '../../vendor/images/icons/navigation_grey.svg';
import placeIconActive from '../../vendor/images/icons/navigation_active.svg';
/**
 * Placemark: add coordinates places
 */
const YandexMap = () => {
    const [isPlaceActive, setIsPlaceActive] = useState(false);
    const handlePlacemarkClick = () => {
        setIsPlaceActive(!isPlaceActive);
    };

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
    }, []);

    return (
        <YMaps query={{ apikey: '15c31511-a1d5-4084-85c0-96cce06323bf' }}>
            <div className={styles.yamap}>
                <Map
                    defaultState={{ center: [latitude, longitude], zoom: 15 }}
                    width="100%"
                    height="100vh"
                    options={{
                        suppressMapOpenBlock: true,
                    }}
                >
                    {latitude && longitude && (
                        <Placemark
                            className={styles.grayscaleMap}
                            geometry={[latitude, longitude]}
                            options={{
                                preset: 'islands#redDotIcon',
                                iconLayout: 'default#image',
                                iconImageHref: navigationIcon,
                                iconImageSize: [40, 40],
                                iconImageOffset: [-16, -16],
                            }}
                        />
                    )}
                    <Placemark
                        geometry={[latitude + 0.0007, longitude + 0.0007]}
                        options={{
                            preset: 'islands#redDotIcon',
                            iconLayout: 'default#image',
                            iconImageHref: isPlaceActive ? placeIconActive : placeIcon,
                            iconImageSize: [52, 52],
                            iconImageOffset: [-16, -16],
                        }}
                        onClick={handlePlacemarkClick}
                    />
                </Map>
            </div>
        </YMaps>
    );
};

export default YandexMap;
