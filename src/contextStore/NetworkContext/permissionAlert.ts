import { createContext, Dispatch, SetStateAction } from 'react';

type PermissionAlertContextType = [boolean, Dispatch<SetStateAction<boolean>>?];

const PermissionAlertContext = createContext<PermissionAlertContextType>([
  false,
]);

export default PermissionAlertContext;
