
import { SesionContext } from '../sesion/SesionContext.tsx';
import { useContext } from 'react';

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion() tiene que usarse dentro de <ProveedorSesion>');
  return contexto;
}