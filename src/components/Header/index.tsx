import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
