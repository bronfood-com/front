import { useContext } from 'react';
import { RestorePasswordContext } from '../../../contexts/RestorePasswordContext';

export const useRestorePassword = () => useContext(RestorePasswordContext);
