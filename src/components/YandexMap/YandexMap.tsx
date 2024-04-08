import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './YandexMap.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import navigationIcon from '../../vendor/images/icons/navigation.svg';
import placeIcon from '../../vendor/images/icons/navigation_grey.svg';
import placeIconActive from '../../vendor/images/icons/navigation_active.svg';

const YandexMap = ({ setCity }: { setCity: Dispatch<SetStateAction<string>> }) => {
    const [version, setVersion] = useState(0);
    const { t } = useTranslation();
    const [isPlaceActive, setIsPlaceActive] = useState(false);
    const handlePlacemarkClick = () => {
        setIsPlaceActive(!isPlaceActive);
    };
    const [latitude, setLatitude] = useState(43.246345);
    const [longitude, setLongitude] = useState(76.921552);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setVersion((version) => version + 1);
            });
        }
    }, []);

    return (
        <YMaps key={version} query={{ apikey: '15c31511-a1d5-4084-85c0-96cce06323bf' }}>
            <div className={styles.yamap}>
                <Map
                    state={{ center: [latitude, longitude], zoom: 15 }}
                    width="100%"
                    height="100vh"
                    options={{
                        suppressMapOpenBlock: true,
                    }}
                    modules={['geocode']}
                    onLoad={(ymaps) => {
                        ymaps.geocode([latitude, longitude], { kind: 'locality' }).then((res) => {
                            const city = res.geoObjects.get(0).properties.get('name', { kind: 'locality', name: t('components.header.placeName') });
                            setCity(city.toString());
                        });
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
                    {/* //*Placemark: add coordinates places */}
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
