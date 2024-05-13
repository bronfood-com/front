import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './YandexMap.module.scss';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import navigationIcon from '../../vendor/images/icons/navigation.svg';
import placeIcon from '../../vendor/images/icons/navigation_grey.svg';
import placeIconActive from '../../vendor/images/icons/navigation_active.svg';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import { useRestaurants } from '../../utils/hooks/useRestaurants/useRestaurants';
import { useNavigate } from 'react-router-dom';

const YandexMap = ({ setCity }: { setCity: Dispatch<SetStateAction<string>> }) => {
    const [version, setVersion] = useState(0);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { restaurantsFiltered, inView } = useRestaurants();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [userLatitude, setUserLatitude] = useState(43.246345);
    const [userLongitude, setUserLongitude] = useState(76.921552);
    const { isLogin } = useCurrentUser();
    const [activePlaceId, setActivePlaceId] = useState<string | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLatitude(position.coords.latitude);
                setUserLongitude(position.coords.longitude);
                setVersion((version) => version + 1);
            });
        }
    }, []);

    useEffect(() => {
        if (inView) {
            setActivePlaceId(inView);
            const place = restaurantsFiltered.find((place) => place.id === inView);
            if (place) {
                setLatitude(place.coordinates.latitude);
                setLongitude(place.coordinates.longitude);
            }
        }
    }, [inView, restaurantsFiltered]);

    const handlePlacemarkClick = (placeId: string, latitude: number, longitude: number) => {
        setActivePlaceId(placeId);
        setLatitude(latitude);
        setLongitude(longitude);
        navigate(`/restaurants/${placeId}`);
    };

    const center = activePlaceId ? [latitude, longitude] : [userLatitude, userLongitude];

    return (
        <YMaps key={version} query={{ apikey: '15c31511-a1d5-4084-85c0-96cce06323bf' }}>
            <div className={styles.yamap}>
                <Map
                    state={{ center: center, zoom: 12 }}
                    width="100%"
                    height="100vh"
                    options={{
                        suppressMapOpenBlock: true,
                        yandexMapDisablePoiInteractivity: true, // turn off other balloons
                    }}
                    modules={['geocode']}
                    onLoad={(ymaps) => {
                        ymaps.geocode([userLatitude, userLongitude], { kind: 'locality' }).then((res) => {
                            const city = res.geoObjects.get(0).properties.get('name', { kind: 'locality', name: t('components.header.placeName') });
                            setCity(city.toString());
                        });
                    }}
                    instanceRef={(map) => {
                        if (map) {
                            if (isLogin) {
                                const currentGlobalPixelCenter = map.getGlobalPixelCenter();
                                const newGlobalPixelCenter = [currentGlobalPixelCenter[0], currentGlobalPixelCenter[1] + 170];
                                map.setGlobalPixelCenter(newGlobalPixelCenter);
                            }
                        }
                    }}
                >
                    {userLatitude && userLongitude && (
                        //* user
                        <Placemark
                            className={styles.grayscaleMap}
                            geometry={[userLatitude, userLongitude]}
                            options={{
                                preset: 'islands#redDotIcon',
                                iconLayout: 'default#image', // icon mark on map
                                iconImageHref: navigationIcon,
                                iconImageSize: [30, 40],
                                iconImageOffset: [-15, -35],
                            }}
                            properties={{
                                hintContent: 'Вы здесь',
                            }}
                            modules={['geoObject.addon.hint']}
                        />
                    )}
                    //* restaurants
                    {restaurantsFiltered.map((place) => {
                        const marked = activePlaceId === place.id;
                        return (
                            <Placemark
                                key={place.id}
                                geometry={[place.coordinates.latitude, place.coordinates.longitude]}
                                options={{
                                    preset: 'islands#redDotIcon',
                                    iconLayout: 'default#image',
                                    iconImageHref: marked ? placeIconActive : placeIcon,
                                    iconImageSize: [30, 40],
                                    iconImageOffset: [-15, -35],
                                }}
                                properties={{
                                    hintContent: place.name, //tooltip(hover)
                                }}
                                modules={['geoObject.addon.hint']}
                                onClick={() => handlePlacemarkClick(place.id, place.coordinates.latitude, place.coordinates.longitude)}
                            />
                        );
                    })}
                </Map>
            </div>
        </YMaps>
    );
};

export default YandexMap;
