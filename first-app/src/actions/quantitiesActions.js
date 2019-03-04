// import { GET_QUANTITIES, CREATE_QUANTITY} from "./types";
//
// export const getQuantities = () => dispatch => {
//         fetch('https://jsonplaceholder.typicode.com/todos')
//             .then(response => response.json())
//             .then(qnts => dispatch({
//                 type: GET_QUANTITIES,
//                 payload: qnts
//          }))
// };
//
// export const createQuantity = (qnt) => dispatch => {
//     console.log('post')
//     fetch('https://jsonplaceholder.typicode.com/todos',{
//         method: 'POST',
//         headers: {
//             'content-type' : 'application/json'
//         },
//         body: JSON.stringify(qnt)
//     })
//         .then(response => response.json())
//         .then(qnt => dispatch({
//             type: CREATE_QUANTITY,
//             payload: qnt
//         }));
// };