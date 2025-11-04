// import { NotificationSlice } from "./notificationUISlice";
// import { mensajeDeErrorHttp } from "./statusErrors"; 

// export async function errorNotification(func: any, { rejectWithValue, dispatch }: any) {
//   try {
//     return await func();
//   } catch (e: any) {
//     let mensaje = "Error en la conexión con el servidor";
//     if (e.response) {
//       mensaje = mensajeDeErrorHttp(e);
//       dispatch(
//         NotificationSlice.actions.notificationUIopen({
//           Mensaje: mensaje,
//           type: "error"
//         })
//       );
//       if (e.response.status == 401) {
//         dispatch(authenticationSlice.actions.ForceLogOut());
//       }
//     } else {
//       dispatch(
//         NotificationSlice.actions.notificationUIopen({
//           Mensaje: mensaje,
//           type: "error"
//         })
//       );
//     }
//     return rejectWithValue(mensaje);
//   }
// }