import {
  ALERTA_SATISFACTORIA,
  ALERTA_ERROR,
  ALERTA_ADVERTENCIA,
  ALERTA_INFO,
  ALERTA_LIMPIAR
} from './constantes';

// Los colores del alert: success, error, warning, info
export const _cmdsatisfactoriaAlerta = mensaje => {
  return { type: ALERTA_SATISFACTORIA, mensaje };
};
export const _cmderrorAlerta = mensaje => {
  return { type: ALERTA_ERROR, mensaje };
};
export const _cmdadvertenciaAlerta = mensaje => {
  return { type: ALERTA_ADVERTENCIA, mensaje };
};
export const _cmdinfoAlerta = mensaje => {
  return { type: ALERTA_INFO, mensaje };
};
export const _cmdlimpioAlerta = () => {
  return { type: ALERTA_LIMPIAR };
};
