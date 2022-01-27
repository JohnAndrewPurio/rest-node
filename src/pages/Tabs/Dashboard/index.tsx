import { IonContent, IonPage, IonRow } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import DateAndLocation from '../../../components/DateAndLocation';
import MainClock from '../../../components/MainClock';
import SettingsList from '../../../components/SettingsList';
import _styles from './styles';

const Dashboard: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [biggest, setBiggest] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setUpClock();
        }, 500);
    }, []);

    const setUpClock = async () => {
        if (ref.current?.offsetWidth) {
            setBiggest(ref.current.offsetWidth * 0.75);
            setLoading(false);
        }
    };

    return (
        <IonPage>
            {biggest !== 0 && !loading && <DateAndLocation />}
            <IonContent>
                <IonRow style={_styles.clockRow}>
                    <div ref={ref} style={_styles.clockContainer}>
                        {biggest !== 0 && !loading && (
                            <MainClock biggest={biggest} />
                        )}
                    </div>
                </IonRow>
                {biggest !== 0 && !loading && <SettingsList />}
            </IonContent>
        </IonPage>
    );
};

export default Dashboard;
