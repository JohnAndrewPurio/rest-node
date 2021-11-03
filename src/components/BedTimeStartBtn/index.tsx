import { IonButton, IonRow } from '@ionic/react';

const BedTimeStartBtn: React.FC = () => {
  const _styles = {
    container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  };

  return (
    <IonRow style={_styles.container}>
      <div className="outer-circle">
        <IonButton
          fill="clear"
          shape="round"
          className="inner-circle"
          color="light"
        >
          <p className="circle-text">
            <p>Start</p>
            <p>Now</p>
          </p>
        </IonButton>
      </div>
    </IonRow>
  );
};

export default BedTimeStartBtn;
