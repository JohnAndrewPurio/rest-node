interface LightPayload {
  light: string;
  max_brightness: number;
  state: string;
}

interface DaysSelected {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

interface Light {
  onoffset: number;
  offoffset: number;
  onpayload: LightPayload;
  offpayload: LightPayload;
  days_selected: DaysSelected;
}

interface SoundPayload {
  audio_file?: any;
  volume: number;
  max_volume: number;
  state: string;
  sound: string;
}

interface Sound {
  onoffset: number;
  offoffset: number;
  onpayload: SoundPayload;
  offpayload: SoundPayload;
  days_selected: DaysSelected;
}

interface Time {
  type: string;
  time: string;
  light: Light;
  sound: Sound;
}

export interface RestNodeStateType {
  bedtime: Time;
  waketime: Time;
}
