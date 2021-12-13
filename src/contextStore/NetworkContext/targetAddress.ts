import { createContext, Dispatch, SetStateAction } from 'react';

type TargetAddressContextType = [string, Dispatch<SetStateAction<string>>?];

const TargetAddressContext = createContext<TargetAddressContextType>(['']);

export default TargetAddressContext;
