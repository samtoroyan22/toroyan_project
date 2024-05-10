// import { createAsyncThunk } from '@reduxjs/toolkit';

// export const createPreorder = createAsyncThunk(
//   'preorders/createPreorder',
//   async (preorderData, { dispatch }) => {
//     try {
//       const response = await fetch('http://localhost:3001/preorders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(preorderData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create preorder');
//       }

//       dispatch(fetchPreorders());

//       return await response.json();
//     } catch (error) {
//       console.error('Error creating preorder:', error);
//       throw error;
//     }
//   }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ orderData, orderType }, { dispatch }) => {
    try {
      const response = await fetch(`http://localhost:3001/${orderType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create ${orderType}`);
      }

      dispatch(fetchOrders());

      return await response.json();
    } catch (error) {
      console.error(`Error creating ${orderType}:`, error);
      throw error;
    }
  }
);
